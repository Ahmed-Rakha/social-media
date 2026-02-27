import React from "react";
import PostComment from "./PostComment";

export default function TopComment({ topComment }) {
  return (
    <div className="container border border-neutral-200 rounded-b-3xl  bg-white py-7">
      <div className=" rounded-xl bg-neutral-100 p-7 rounded-b-3xl">
        <h5 className="font-bold text-neutral-500 text-sm mb-2 uppercase">
          top comments
        </h5>
        {/* Render Top comment here */}
        <PostComment comment={topComment} />
        <button className="text-blue-500 font-semibold text-sm cursor-pointer">
          View more comments
        </button>
      </div>
    </div>
  );
}
