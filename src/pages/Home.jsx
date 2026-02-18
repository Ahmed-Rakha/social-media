import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/user-auth/user/get_user_posts";
import { $Utilities } from "../utilities/utilities-repository";
import { format } from "date-fns";
export default function Home() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getUserPosts("698dad303bf973711764b39f"),
  });

  const date = $Utilities.Dates.displayPostAndCommentDate(
    "2026-02-13T21:18:41.484Z",
  );
  console.log(date);

  //  jsObjectDate , tokens dateString

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
