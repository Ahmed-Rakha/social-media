// @ts-check
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/user-auth/user/get_user_posts";
import { $Utilities } from "../utilities/utilities-repository";
import { format } from "date-fns";
import { $Services } from "../services/services-repository";

export default function Home() {
  const { data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      $Services.AUTH_REPOSITORY.signup({
        name: "Test Signup",
        username: "testSignup",
        email: "testSignup@gmail.com",
        dateOfBirth: "2000-01-01",
        gender: "male",
        password: "Aa@123456",
        rePassword: "Aa@123456",
      }),
  });

  console.log(data);
  console.log("error message", error);

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
