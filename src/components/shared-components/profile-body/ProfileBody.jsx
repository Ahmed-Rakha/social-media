import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { $Services } from "../../../services/services-repository";
import PostCard from "../../feed/posts/comments/PostCard";
import PostSkeleton from "../skeletons/PostSkeleton";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";

export default function ProfileBody() {
  const [activeTab, setActiveTab] = useState("myPosts");
  const observerRef = useRef();

  // Get user posts
  const myPostsQuery = useInfiniteQuery({
    queryKey: $QUERY_KEYS.posts.myPosts,
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.POSTS_REPOSITORY.getHomeFeed({ only: "me", page }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.meta?.pagination?.nextPage ?? undefined;
    },
  });

  // Get saved posts
  const myBookmarksQuery = useInfiniteQuery({
    queryKey: $QUERY_KEYS.posts.bookmarks,
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.USER_REPOSITORY.getBookmarks({ page }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.meta?.pagination?.nextPage ?? undefined;
    },
    enabled: activeTab === "saved",
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        activeTab === "myPosts" ? myPostsQuery.fetchNextPage() : myBookmarksQuery.fetchNextPage();
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [myPostsQuery.hasNextPage, myPostsQuery.fetchNextPage()]);
  
  const postsLength = myPostsQuery?.data?.pages[0]?.data?.posts?.length;
  const bookmarksLength =
    myBookmarksQuery?.data?.pages[0]?.data?.bookmarks?.length;

  if (myPostsQuery.isLoading || myBookmarksQuery.isLoading) {
    return Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />);
  }
  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 bg-gray-200 p-2 rounded-xl w-fit">
            <h6
              onClick={() => setActiveTab("myPosts")}
              className={`${activeTab === "myPosts" && "bg-white text-blue-500 shadow-md"} font-semibold p-2 rounded-md cursor-pointer flex items-center gap-2 text-sm`}
            >
              <span>
                <i className="fa-regular fa-file-lines"></i>
              </span>
              <span>My Posts</span>
            </h6>
            <h6
              onClick={() => setActiveTab("saved")}
              className={`${activeTab === "saved" && "bg-white text-blue-500 shadow-md"} font-semibold p-2 rounded-md cursor-pointer flex items-center gap-2 text-sm`}
            >
              <span>
                <i className="fa-regular fa-bookmark"></i>
              </span>
              <span>Saved</span>
            </h6>
          </div>
          <div className="font-semibold text-blue-500 bg-blue-200 size-7 flex items-center justify-center rounded-full">
            {activeTab === "myPosts" ? postsLength : bookmarksLength}
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        {activeTab === "myPosts" &&
          myPostsQuery?.data?.pages?.map((page) =>
            page?.data?.posts?.map((post) => (
              <PostCard key={post._id} userPosts={post} />
            )),
          )}
        {activeTab === "saved" &&
          myBookmarksQuery?.data?.pages?.map((page) =>
            page?.data?.bookmarks?.map((bookmark) => (
              <PostCard key={bookmark._id} userPosts={bookmark} />
            )),
          )}
        {activeTab === "myPosts" && postsLength === 0 && (
          <div className="text-center bg-white p-5 rounded-2xl shadow-md text-gray-500 font-bold text-sm">
            No Posts Yet
          </div>
        )}
        {activeTab === "saved" && bookmarksLength === 0 && (
          <div className="text-center bg-white p-5 rounded-2xl shadow-md text-gray-500 font-bold text-sm">
            No Saved Posts Yet
          </div>
        )}
      </div>
      <div ref={observerRef}></div>
      <div className="text-center mt-5 bg-white p-5 rounded-2xl shadow-md text-gray-500 w-fit mx-auto">
        {myPostsQuery.hasNextPage ? (
          <p className="flex items-center font-semibold">
            <span>
              <i className="fa-solid fa-spinner animate-spin"></i>
            </span>
            <span className="ml-2">Loading...</span>
          </p>
        ) : (
          <p className="font-semibold">No More Posts</p>
        )}
      </div>
    </>
  );
}
