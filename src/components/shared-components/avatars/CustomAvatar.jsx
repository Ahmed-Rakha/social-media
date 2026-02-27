import { Tooltip } from "@heroui/react";
import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
export default function CustomAvatar({ avatarData, size = "w-13 h-13" }) {
  return (
    <Tooltip
      content={`@${avatarData?.username || avatarData?.username || "User"}`}
    >
      <div
        className={`${size} rounded-full self-start shrink-0 overflow-hidden cursor-pointer border-1 border-blue-300 flex items-center justify-center`}
      >
        <img
          src={avatarData?.image || Avatar}
          alt={avatarData?.name || "User"}
        />
      </div>
    </Tooltip>
  );
}
