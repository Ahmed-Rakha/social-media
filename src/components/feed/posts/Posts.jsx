import { Link } from "react-router";
import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import PostSelectButton from "./PostSelectButton";
import EditPost from "./EditPost";
import Comment from "./Comment";

const DummyComments = [
  {
    _id: "699e11f0056bdb76272a5a60",
    content: "Good boy",
    commentCreator: {
      _id: "69965fc4056bdb7627e37cbd",
      name: "Sayed Mokdam",
      username: "sayedmokdam",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771507974649-2b0fd283-45fa-4194-937c-447091dbeb9b-Screenshot-2025-05-05-142811.webp",
    },
    post: "699def47056bdb762727dd8a",
    parentComment: null,
    likes: ["69965fc4056bdb7627e37cbd"],
    createdAt: "2026-02-24T21:02:40.008Z",
    repliesCount: 0,
  },
  {
    _id: "699e11e8056bdb76272a5970",
    content: "Nice",
    commentCreator: {
      _id: "69965fc4056bdb7627e37cbd",
      name: "Sayed Mokdam",
      username: "sayedmokdam",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771507974649-2b0fd283-45fa-4194-937c-447091dbeb9b-Screenshot-2025-05-05-142811.webp",
    },
    post: "699def47056bdb762727dd8a",
    parentComment: null,
    likes: ["69965fc4056bdb7627e37cbd"],
    createdAt: "2026-02-24T21:02:32.917Z",
    repliesCount: 0,
  },
  {
    _id: "699e11e1056bdb76272a581b",
    content: "Nice",
    commentCreator: {
      _id: "69965fc4056bdb7627e37cbd",
      name: "Sayed Mokdam",
      username: "sayedmokdam",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771507974649-2b0fd283-45fa-4194-937c-447091dbeb9b-Screenshot-2025-05-05-142811.webp",
    },
    post: "699def47056bdb762727dd8a",
    parentComment: null,
    likes: ["69965fc4056bdb7627e37cbd"],
    createdAt: "2026-02-24T21:02:25.372Z",
    repliesCount: 0,
  },
];

export default function Posts() {
  return (
    <div className="container bg-white py-5 rounded-3xl mt-5">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-1 border-blue-300 flex items-center justify-center">
            <img src={Avatar} alt="" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold">Ahmed Rakha</h2>
            <div className="flex items-center gap-3">
              <span>@ahmedrakha</span>
              <span className=" block size-1 rounded-full bg-neutral-400"></span>
              <span>2h</span>
              <span className=" block size-1 rounded-full bg-neutral-400"></span>
              <PostSelectButton />
            </div>
          </div>
        </div>
        <div>
          {/* EditPost */}
          <EditPost />
        </div>
      </div>

      {/* content */}
      <div className="mt-5">
        <p className="text-sm mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, natus
          tempore. Quos, quia. Quae, natus tempore. Quos, quia. Quae, natus
          tempore. Quos, quia. Quae, natus tempore. Quos, quia. Quae, natus
          tempore. Quos, quia. Quae, natus tempore. Quos, quia. Quae, natus
          tempore. Quos, quia. Quae, natus tempore. Quos, quia. Quae, natus
        </p>
        <div className="w-full overflow-hidden rounded-sm cursor-pointer border-1 border-neutral-100 flex items-center justify-center">
          <img src={Avatar} alt="" />
        </div>
      </div>

      {/* post details */}
      <div className="my-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="bg-blue-500 text-white p-1 rounded-full flex items-center">
              <i className="fa-regular fa-thumbs-up"></i>
            </span>
            <span className="text-neutral-500">10</span>
            <span className="text-neutral-500">Likes</span>
          </div>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-2 text-neutral-500">
              <i className="fa-solid fa-retweet"></i>
              <span>12</span>
              <span>shares</span>
            </p>
            <p className="flex items-center gap-2 text-neutral-500">
              <span>12</span>
              <span>comments</span>
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
      {/* post actions */}
      <div className="grid grid-cols-3 gap-3">
        <div className="hover:bg-neutral-100 p-2 rounded-md text-center cursor-pointer">
          <span className="text-neutral-500  p-2 rounded-full">
            <i className="fa-regular fa-thumbs-up"></i>
          </span>
          <span className="text-neutral-500">Like</span>
        </div>
        <div className="hover:bg-neutral-100 p-2 rounded-md text-center cursor-pointer">
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
      {/* comments */}
      <div className="container rounded-xl bg-neutral-100 p-3 shadow-md">
        <h5 className="font-bold text-neutral-500 text-sm mb-2  uppercase">
          top comments
        </h5>
        {/* Render comments here */}
        {DummyComments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}

        <button className="text-blue-500 font-semibold text-sm cursor-pointer">
          View more comments
        </button>
      </div>
    </div>
  );
}
