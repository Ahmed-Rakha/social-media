import { Link } from "react-router";
import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { $Utilities } from "../../../utilities/utilities-repository";
import CustomAvatar from "../../shared-components/avatars/CustomAvatar";
import EditPost from "./EditPost";
import SelectPrivacyButton from "./SelectPrivacyButton";
export default function PostHeader({ postCreator }) {
  const formatDate = $Utilities.Dates.displayRelativeTime;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <Link to={`/profile/${postCreator?._id}`}>
          <CustomAvatar
            avatarData={{
              name: postCreator?.name,
              image: postCreator?.photo,
              username: postCreator?.username,
            }}
          />
        </Link>

        <div className="flex-1">
          <h2 className="font-bold text-sm">{postCreator?.name}</h2>
          <div className="flex items-center gap-3">
            <Link to={`/profile/${postCreator?._id}`}>
              <span className="text-neutral-400 text-sm hover:text-blue-500 cursor-pointer">
                @{postCreator?.username}
              </span>
            </Link>
            <span className=" block size-1 rounded-full bg-neutral-400"></span>
            <span className="text-neutral-400 text-sm">
              {formatDate(postCreator?.createdAt)}
            </span>
            <span className=" block size-1 rounded-full bg-neutral-400"></span>
            {/* Select Privacy */}
            <SelectPrivacyButton privacy={postCreator?.privacy} />
          </div>
        </div>
      </div>
      <div>
        {/* EditPost */}
        <EditPost />
      </div>
    </div>
  );
}
