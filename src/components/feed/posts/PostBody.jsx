import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
export default function PostBody({ postBody }) {
  return (
    <div className="mt-5">
      {postBody?.content && <p className="text-sm mb-3">{postBody?.content}</p>}
      {postBody?.image && !postBody?.image.includes("undefined") && (
        <div className="w-full overflow-hidden rounded-sm cursor-pointer border-1 border-neutral-100 flex items-center justify-center">
          <img src={postBody?.image || Avatar} alt="PostImage" />
        </div>
      )}
    </div>
  );
}
