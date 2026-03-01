import FeedLeftSideBar from "../../components/feed/feed-left-sidebar/FeedLeftSideBar";
import CreatePost from "../../components/feed/create-post/CreatePost";
import Posts from "../../components/feed/posts/Posts";
import FeedRightSideBar from "../../components/feed/feed-right-sidebar/FeedRightSideBar";
import { useState } from "react";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("feed");
  return (
    <div className="feed-page grid grid-cols-12 py-8 rounded-3xl gap-4">
      <div className="left-side col-span-12  lg:col-span-3">
        <FeedLeftSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="center-side col-span-12 lg:col-span-6">
        <div className="center-top-side ">
          <CreatePost activeTab={activeTab} />
        </div>
        <div className="center-bottom-side">
          <Posts activeTab={activeTab} />
          {/* <div></div> */}
        </div>
      </div>

      <div className="right-side col-span-3">
        <FeedRightSideBar />
      </div>
    </div>
  );
}
