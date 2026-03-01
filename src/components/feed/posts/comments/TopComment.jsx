import React from "react";
import PostComment from "./PostComment";

export default function TopComment({ topComment }) {
  return (
    <div className=" bg-neutral-100 p-4 ">
      <h5 className="font-bold text-neutral-500 text-sm mb-2 uppercase">
        top comments
      </h5>
      {/* Render Top comment here */}
      <PostComment comment={topComment} />
      <button className="text-blue-500 font-semibold text-sm cursor-pointer">
        View more comments
      </button>
    </div>
  );
}
