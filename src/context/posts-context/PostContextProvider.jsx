import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { $Services } from "../../services/services-repository";

export const PostContext = createContext(null);
export default function PostContextProvider({ children }) {
  const [activeTab, setActiveTab] = useState("feed");

  // feed query
  const feedQuery = useQuery({
    queryKey: ["feed"],
    queryFn: () =>
      $Services.POSTS_REPOSITORY.getHomeFeed({ only: "following" }),
    enabled: activeTab === "feed",
  });
  //   my posts query
  const myPostsQuery = useQuery({
    queryKey: ["myPosts"],
    queryFn: () => $Services.POSTS_REPOSITORY.getHomeFeed({ only: "me" }),
    enabled: activeTab === "myPosts",
  });

  //   community query
  const communityQuery = useQuery({
    queryKey: ["community"],
    queryFn: () => $Services.POSTS_REPOSITORY.getHomeFeed({ only: "all" }),
    enabled: activeTab === "community",
  });

  //   bookmarks query
  const bookmarksQuery = useQuery({
    queryKey: ["savedPosts"],
    queryFn: () => $Services.USER_REPOSITORY.getBookmarks(),
    enabled: activeTab === "bookmarks",
  });
  return (
    <PostContext.Provider
      value={{
        feedQuery,
        myPostsQuery,
        communityQuery,
        bookmarksQuery,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
