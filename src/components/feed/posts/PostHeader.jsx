import EditPost from "./EditPost";
import CustomAvatar from "../../shared-components/avatars/CustomAvatar";
import { $Utilities } from "../../../utilities/utilities-repository";
import { Link } from "react-router";
import PostPrivacy from "./PostPrivacy";
import { Tooltip } from "@heroui/react";
export default function PostHeader({ postCreator }) {
  const formatDate = $Utilities.Dates.displayRelativeTime;
  console.log(postCreator);
  return (
    <div className="flex items-center justify-between relative">
      {/* UserMetaInfo */}
      <div className="flex  gap-3">
        <CustomAvatar avatarData={postCreator} />
        <div className="flex flex-col gap-1">
          <Link
            to={`/profile/${postCreator?._id}`}
            className="font-bold text-sm"
          >
            {postCreator?.name}
          </Link>
          <div className="flex items-cente gap-2">
            <span className="text-neutral-400 text-sm">
              {formatDate(postCreator?.createdAt)}
            </span>
            <PostPrivacy privacy={postCreator?.privacy} />
          </div>
        </div>
      </div>

      {/* EditPost */}
      <div>
        <EditPost
          postId={postCreator?.postId}
          userId={postCreator?._id}
          isBookmarked={postCreator.isBookmarked}
        />
      </div>
      {postCreator.isBookmarked && (
        <Tooltip content="Saved">
          <div className="text-blue-500 absolute -top-5 -right-1">
            <i className="fa-solid fa-bookmark fa-xl"></i>
          </div>
        </Tooltip>
      )}
    </div>
  );
}
