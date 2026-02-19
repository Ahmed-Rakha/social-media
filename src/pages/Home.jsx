//@ts-check
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/user-auth/user/get_user_posts";
import { $Utilities } from "../utilities/utilities-repository";
import { format } from "date-fns";
import { $Services } from "../services/services-repository";
import { useState } from "react";

export default function Home() {
  const [image, setimage] = useState(undefined);
  const { data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      $Services.COMMENTS_REPOSITORY.updateComment(
        "699741ae056bdb7627ebd99b",
        "69975656056bdb7627ed1772",
        {
          content: "Test update 3 comment From Sayed",
          imageFile: image,
        },
      ),
  });

  const { mutate } = useMutation({
    mutationKey: ["like-unlike-comment"],
    mutationFn: () =>
      $Services.COMMENTS_REPOSITORY.updateComment(
        "699741ae056bdb7627ebd99b",
        "69975656056bdb7627ed1772",
        {
          content: "Test update 4 comment From Sayed",
          imageFile: image,
        },
      ),
  });
  console.log(data);
  console.log("error message", error);

  $Utilities.Dates.displayRelativeTime("2026-02-12T12:00:00.000Z");
  //  jsObjectDate , tokens dateString

  function handleImage(e) {
    const file = e.target.files[0];
    console.log(file);
    setimage(file);
    mutate();
  }

  return (
    <div>
      Hello From home!
      <input type="file" onChange={handleImage} />
    </div>
  );
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

// username: "sayed2@sayed.com",
// password: "Sayed@sayed1234",
