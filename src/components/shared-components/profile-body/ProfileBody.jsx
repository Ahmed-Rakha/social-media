import { useEffect, useRef } from "react";
import PostCard from "../../feed/posts/comments/PostCard";
import PostSkeleton from "../skeletons/PostSkeleton";

export default function ProfileBody({
  myPostsQuery,
  myBookmarksQuery,
  activeTab,
  setActiveTab,
}) {
  const observerRef = useRef();

  //Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      if (activeTab === "myPosts" && myPostsQuery.hasNextPage) {
        myPostsQuery.fetchNextPage();
      } else if (activeTab === "saved" && myBookmarksQuery.hasNextPage) {
        myBookmarksQuery.fetchNextPage();
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [activeTab, myPostsQuery.hasNextPage, myBookmarksQuery.hasNextPage]);

  // Calculate total posts & bookmarks
  const postsLength =
    myPostsQuery?.data?.pages?.flatMap((page) => page?.data?.posts ?? [])
      .length ?? 0;

  const bookmarksLength =
    myBookmarksQuery?.data?.pages?.flatMap(
      (page) => page?.data?.bookmarks ?? [],
    ).length ?? 0;

  if (
    myPostsQuery.isLoading ||
    (activeTab === "saved" && myBookmarksQuery.isLoading)
  ) {
    return Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />);
  }

  return (
    <>
      {/* Tabs */}
      <div className="bg-white p-4 rounded-2xl shadow-2xl flex justify-between items-center">
        <div className="flex items-center gap-3 bg-gray-200 p-2 rounded-xl w-fit">
          <h6
            onClick={() => setActiveTab("myPosts")}
            className={`${
              activeTab === "myPosts" && "bg-white text-blue-500 shadow-md"
            } font-semibold p-2 rounded-md cursor-pointer flex items-center gap-2 text-sm`}
          >
            <i className="fa-regular fa-file-lines"></i>
            My Posts
          </h6>
          <h6
            onClick={() => setActiveTab("saved")}
            className={`${
              activeTab === "saved" && "bg-white text-blue-500 shadow-md"
            } font-semibold p-2 rounded-md cursor-pointer flex items-center gap-2 text-sm`}
          >
            <i className="fa-regular fa-bookmark"></i>
            Saved
          </h6>
        </div>
        <div className="font-semibold text-blue-500 bg-blue-200 size-7 flex items-center justify-center rounded-full">
          {activeTab === "myPosts" ? postsLength : bookmarksLength}
        </div>
      </div>

      {/* Posts */}
      <div className="mt-5 space-y-5">
        {activeTab === "myPosts" &&
          myPostsQuery?.data?.pages?.map((page) =>
            page?.data?.posts?.map((post) => (
              <PostCard key={post._id} userPosts={post} isMyPost />
            )),
          )}

        {activeTab === "saved" &&
          myBookmarksQuery?.data?.pages?.map((page) =>
            page?.data?.bookmarks?.map((bookmark) => (
              <PostCard
                key={bookmark._id}
                userPosts={bookmark}
                isMyPost={false}
              />
            )),
          )}

        {/* Empty messages */}
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

      {/* Observer div */}
      <div ref={observerRef}></div>

      {/* Infinite Scroll Spinner */}
      {(myPostsQuery.isFetchingNextPage ||
        myBookmarksQuery.isFetchingNextPage) && (
        <div className="flex items-center justify-center gap-2 bg-white p-5 rounded-2xl shadow-md w-fit mt-5 mx-auto text-sm text-gray-500">
          <span>Loadding more posts</span>
          <span>
            <i className="fa-solid fa-spinner animate-spin"></i>
          </span>
        </div>
      )}

      {/* End of posts */}
      {!myPostsQuery.hasNextPage &&
        activeTab === "myPosts" &&
        postsLength > 0 && (
          <p className="text-center mt-5 bg-white p-5 rounded-2xl shadow-md text-gray-500 w-fit mx-auto font-semibold">
            No More Posts
          </p>
        )}
      {!myBookmarksQuery.hasNextPage &&
        activeTab === "saved" &&
        bookmarksLength > 0 && (
          <p className="text-center mt-5 bg-white p-5 rounded-2xl shadow-md text-gray-500 w-fit mx-auto font-semibold">
            No More Saved Posts
          </p>
        )}
    </>
  );
}
