import React, { useRef, useState } from "react";
import avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { Divider } from "@heroui/react";
import { $Utilities } from "../../../utilities/utilities-repository";
import EmojiPicker from "emoji-picker-react";
export default function CreatePost() {
  const [text, setText] = useState("");
  const [showImage, setShowImage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleShowImage = (e) => {
    const blob = $Utilities.generalHelpers.getImageBlob(e.target.files[0]);
    setShowImage(blob);
  };

  function deleteImage() {
    setShowImage(null);
  }

  return (
    <div className="container bg-white py-5 rounded-3xl">
      <form action="">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-1 border-blue-300 flex items-center justify-center">
            <img src={avatar} alt="" />
          </div>
          <div>
            <h2 className="font-bold">Ahmed Rakha</h2>
            <select name="only" id="only">
              <option value="public">Public</option>
              <option value="following">Following</option>
              <option value="only_me">Me</option>
            </select>
          </div>
        </div>
        <textarea
          className="bg-neutral-200 w-full rounded-3xl p-4 mt-4"
          name="body"
          id="body"
          rows="8"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {
          /* Image */
          showImage && (
            <div className="flex items-center gap-3 w-full h-70 rounded-2xl overflow-hidden relative">
              <img src={showImage} alt="avatar" />
              <span
                onClick={deleteImage}
                className="text-white/60 cursor-pointer text-xl absolute top-2 right-2 bg-black/60   size-8 flex items-center justify-center rounded-full"
              >
                <i className="fa-solid fa-xmark "></i>
              </span>
            </div>
          )
        }
        <Divider className="my-5" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-5 md:gap-10">
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="file"
                  name="image"
                  id="image-video"
                  hidden
                  onChange={(e) => handleShowImage(e)}
                />
                <label
                  htmlFor="image-video"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-image text-green-500 text-xl"></i>
                  <span className="text-neutral-600 hidden md:block">
                    Photo/Video
                  </span>
                </label>
              </div>
              <div className="flex items-center gap-2 cursor-pointer relative">
                {showPicker && (
                  <div className="absolute top-10 z-50">
                    <EmojiPicker
                      onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                    />
                  </div>
                )}
                <label
                  htmlFor="video"
                  className="flex items-center gap-2"
                  onClick={() => setShowPicker(!showPicker)}
                >
                  <i className="fa-regular fa-face-smile text-orange-500 cursor-pointer text-xl "></i>
                  <span className="text-neutral-600 cursor-pointer hidden md:block">
                    Feeling/activity
                  </span>
                </label>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-neutral-600 hidden md:block">500/500</p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer"
            >
              <span className="font-semibold text-md">Post</span>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
