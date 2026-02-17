import { getUserPosts } from "./get_user_posts";
import { getMyProfile } from "./get_my_profile";
import { uploadProfilePhoto } from "./upload_profile_photo";
import { getUserProfile } from "./get_user_profile";
import { followUnfollowUser } from "./follow_unfollow_user";
import { getFollowSuggestions } from "./get_follow_suggestions";
import { getBookmarks } from "./get_bookmarks";

export const USER_REPOSITORY = {
  getUserPosts,
  getMyProfile,
  uploadProfilePhoto,
  getUserProfile,
  followUnfollowUser,
  getFollowSuggestions,
  getBookmarks,
};
