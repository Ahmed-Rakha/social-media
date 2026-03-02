import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@heroui/react";
import { Link } from "react-router";
import { $Utilities } from "../../../../utilities/utilities-repository";
import ImageInFullScreen from "../../../shared-components/images/ImageInFullScreen";
import { $HOOKS_REPOSITORY } from "../../../../hooks/hooks_repository";

export default function PostCard({ userPosts }) {
  const { openViewerImage, setOpenViewerImage } = $HOOKS_REPOSITORY.useImageInFullScreen();
  return (
    <>
      {openViewerImage && (
        <ImageInFullScreen
          openViewerImage={openViewerImage}
          setOpenViewerImage={setOpenViewerImage}
        />
      )}
      <Card className="w-full p-4">
        <CardHeader className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={userPosts?.user?.photo}
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">{userPosts?.user?.name}</p>
            <p className="text-small text-default-500">
              @{userPosts?.user?.username}
            </p>
          </div>
        </CardHeader>
        <CardBody className="max-h-150 overflow-y-hidden">
          <p className="text-md mb-3">{userPosts?.body}</p>
          {userPosts?.image && (
            <Image
              height="100%"
              width="100%"
              src={userPosts?.image}
              className="rounded-2xl cursor-pointer"
              alt="post image"
              onClick={() => setOpenViewerImage(userPosts?.image)}
            />
          )}
        </CardBody>
        <div className="flex flex-col gap-4 md:flex-row justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <i className="fa-regular fa-thumbs-up"></i>
              </span>
              <span>
                {userPosts?.likesCount}{" "}
                {userPosts?.likesCount > 1 ? "likes" : "like"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <i className="fa-solid fa-retweet"></i>
              </span>
              <span>
                {userPosts?.sharesCount}{" "}
                {userPosts?.sharesCount > 1 ? "shares" : "share"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <i className="fa-regular fa-comment"></i>
              </span>
              <span>
                {userPosts?.commentsCount}{" "}
                {userPosts?.commentsCount > 1 ? "comments" : "comment"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <i className="fa-regular fa-clock"></i>
            </span>
            <span>
              {$Utilities.Dates.displayPostAndCommentDate(userPosts?.createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}
