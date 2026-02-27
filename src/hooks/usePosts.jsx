import { useContext } from "react";
import { PostContext } from "../context/posts-context/PostContextProvider";

/**
 * @returns {{ activeTab: string, setActiveTab: () => void, feedQuery: any, myPostsQuery: any, communityQuery: any, bookmarksQuery: any }} An object containing the active tab and a function to update it.
 */
export default function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within an PostContextProvider");
  }
  return context;
}
