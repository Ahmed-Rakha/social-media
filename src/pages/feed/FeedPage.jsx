import FeedLeftSideBar from "../../components/feed/feed-left-sidebar/FeedLeftSideBar";
import FeedCenterTopSide from "../../components/feed/feed-center-top-side/FeedCenterTopSide";
import FeedCenterBottomSide from "../../components/feed/feed-center-bottom-side/FeedCenterBottomSide";
import FeedRightSideBar from "../../components/feed/feed-right-sidebar/FeedRightSideBar";

export default function FeedPage() {
  return (
    <div className="container  feed-page grid grid-cols-12  gap-4 bg-amber-600">
      <div className="left-side col-span-12  lg:col-span-3">
        <FeedLeftSideBar />
      </div>
      <div className="center-side col-span-12 lg:col-span-6">
        <div className="center-top-side ">
          <FeedCenterTopSide />
        </div>
        <div className="center-bottom-side">
          <FeedCenterBottomSide />
        </div>
      </div>

      <div className="right-side col-span-3">
        <FeedRightSideBar />
      </div>
    </div>
  );
}
