import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import PostComment from "./comments/PostComment";
import { useState } from "react";
import { Divider } from "@heroui/react";
import usePosts from "../../../hooks/usePosts";
import PostSkeleton from "../../shared-components/skeletons/PostSkeleton";
import TopComment from "./comments/TopComment";
import { useQuery } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import PostCommentSkeleton from "../../shared-components/skeletons/PostCommentSkeleton";
import NoComments from "./comments/NoComments";
import CreateComment from "./comments/CreateComment";

export default function Posts() {
  const [openCommentsPostId, setOpenCommentsPostId] = useState(false);
  const { feedQuery, myPostsQuery, communityQuery, bookmarksQuery, activeTab } =
    usePosts();
  let activeQuery;

  // Fetch comments for each post
  const commentQuery = useQuery({
    queryKey: ["comments", openCommentsPostId],
    queryFn: () =>
      $Services.COMMENTS_REPOSITORY.getPostComments(openCommentsPostId),
    enabled: !!openCommentsPostId,
  });

  switch (activeTab) {
    case "feed":
      activeQuery = feedQuery;
      break;
    case "myPosts":
      activeQuery = myPostsQuery;
      break;
    case "community":
      activeQuery = communityQuery;
      break;
    case "bookmarks":
      activeQuery = bookmarksQuery;
      break;
    default:
      activeQuery = feedQuery;
  }
  function toggleShowComments(postId) {
    setOpenCommentsPostId((prev) => (prev === postId ? null : postId));
  }

  console.log("From active query", activeQuery?.data);
  return (
    <>
      {activeQuery.isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        : activeQuery?.data?.data?.posts?.map((post) => (
            <div key={post._id}>
              <div className=" bg-white pt-5 container rounded-t-3xl border-t-1 border-l-1 border-r-1 overflow-hidden border-neutral-200 mt-5">
                {/* header post creator data*/}
                <PostHeader
                  postCreator={{
                    ...post?.user,
                    createdAt: post?.createdAt,
                    privacy: post?.privacy,
                  }}
                />
                {/* content */}
                <PostBody
                  postBody={{ content: post?.body, image: post?.image }}
                />

                {/* post stats */}
                <PostStats
                  postStats={{
                    likesCount: post?.likesCount,
                    commentsCount: post?.commentsCount,
                    sharesCount: post?.sharesCount,
                  }}
                />
                <Divider className="mb-4" />
                {/* post actions */}
                <PostActions
                  postActions={{
                    toggleShowComments: toggleShowComments,
                    postId: post._id,
                  }}
                />
              </div>

              {/* comments */}

              {post.topComment && !openCommentsPostId && (
                <TopComment topComment={post.topComment} />
              )}
              {/* {!post.topComment && !openCommentsPostId && <NoComments />}  1*/}
              {openCommentsPostId === post._id && (
                <div className="container border border-neutral-200 rounded-b-3xl bg-neutral-100 py-7">
                  <div className="mb-5 bg-white shadow-sm rounded-xl flex items-center justify-between p-5">
                    <div className="flex items-center gap-3">
                      <h5 className=" text-neutral-500 text-sm font-bold">
                        Comments
                      </h5>
                      <p className="text-sm font-semibold text-blue-500 bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center">
                        {post?.commentsCount}
                      </p>
                    </div>

                    <select
                      name="order-comments"
                      id="order-comments"
                      className="text-sm text-neutral-500 outline-none"
                    >
                      <option value="most_relevant">Most Relevant</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  {/* Render comments here */}
                  <div className="">
                    {commentQuery.isLoading ? (
                      <PostCommentSkeleton />
                    ) : commentQuery?.data?.data?.comments?.length === 0 ? (
                      <>
                        <NoComments />
                        <CreateComment
                          postId={post._id}
                          activeTab={activeTab}
                        />
                      </>
                    ) : (
                      <>
                        {commentQuery?.data?.data?.comments?.map((comment) => (
                          <PostComment key={comment._id} comment={comment} />
                        ))}
                        <CreateComment
                          postId={post._id}
                          activeTab={activeTab}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
    </>
  );
}
