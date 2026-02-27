import { Link } from "react-router";
import ThumbsUp from "../../shared-components/buttons/ThumbsUp";

export default function PostStats({ postStats }) {
  return (
    <div className=" my-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <ThumbsUp />
          <span className="text-neutral-500">{postStats?.likesCount}</span>
          <span className="text-neutral-500">
            {postStats?.likesCount > 1 ? "Likes" : "Like"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-2 text-neutral-500">
            <i className="fa-solid fa-retweet"></i>
            <span>{postStats?.sharesCount}</span>
            <span>{postStats?.sharesCount > 1 ? "shares" : "share"}</span>
          </p>
          <p className="flex items-center gap-2 text-neutral-500">
            <span>{postStats?.commentsCount}</span>
            <span>{postStats?.commentsCount > 1 ? "comments" : "comment"}</span>
          </p>
          <p className="flex items-center gap-2">
            <Link
              to="/posts/postId"
              className="text-blue-500 font-bold text-sm"
            >
              View details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
