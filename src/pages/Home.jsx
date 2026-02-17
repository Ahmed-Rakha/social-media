import { useQuery } from "@tanstack/react-query";
import { healthCheck } from "../services/health-check/health_check";
import { COMMENTS_REPOSITORY } from "../services/comments-replies/comments/comments_repository";
import { REPLIES_REPOSITORY } from "../services/comments-replies/replies/replies_repository";
import { signup } from "../services/user-auth/auth/signup";
import { signin } from "../services/user-auth/auth/signin";
import { changePassword } from "../services/user-auth/auth/change_password";
import { uploadProfilePhoto } from "../services/user-auth/user/upload_profile_photo";
import { getMyProfile } from "../services/user-auth/user/get_my_profile";
import { getBookmarks } from "../services/user-auth/user/get_bookmarks";
import { getFollowSuggestions } from "../services/user-auth/user/get_follow_suggestions";
import { getUserProfile } from "../services/user-auth/user/get_user_profile";
import { followUnfollowUser } from "../services/user-auth/user/follow_unfollow_user";
import { getUserPosts } from "../services/user-auth/user/get_user_posts";
export default function Home() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getUserPosts("698dad303bf973711764b39f"),
  });
  console.log(data);
  return <div>Hello From home!</div>;
}

//  "6994ccea056bdb7627d3f7aa",
// COMMENTS_REPLIES_REPOSITORY.likeAndUnlikeComment(
//         "6994ccea056bdb7627d3f7aa",
//         "6994dc7e056bdb7627d51f20",
//       )
//  name: "Sayed Route",
//         username: "sayedRoute",
//         email: "sayed_1@gmail.com",
//         dateOfBirth: "2000-01-01",
//         gender: "male",
//         password: "Aa@123456",
//         rePassword: "Aa@123456",
