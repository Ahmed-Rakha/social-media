export default function PostActions({ postActions }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      <div className="hover:bg-neutral-100 p-2 rounded-md text-center cursor-pointer">
        <span className="text-neutral-500  p-2 rounded-full">
          <i className="fa-regular fa-thumbs-up"></i>
        </span>
        <span className="text-neutral-500">Like</span>
      </div>
      <div
        onClick={() => postActions.toggleShowComments(postActions.postId)}
        className="hover:bg-neutral-100 p-2 rounded-md text-center cursor-pointer"
      >
        <span className="text-neutral-500  p-2 rounded-full">
          <i className="fa-regular fa-comment-dots"></i>
        </span>
        <span className="text-neutral-500">Comment</span>
      </div>
      <div className="hover:bg-neutral-100 p-2 rounded-md text-center cursor-pointer">
        <span className="text-neutral-500  p-2 rounded-full">
          <i className="fa-solid fa-share-nodes"></i>
        </span>
        <span className="text-neutral-500">Share</span>
      </div>
    </div>
  );
}
