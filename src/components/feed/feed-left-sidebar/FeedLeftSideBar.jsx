import usePosts from "../../../hooks/usePosts";

export default function FeedLeftSideBar() {
  const { activeTab, setActiveTab } = usePosts();
  const handleTabClick = (tab) => {
    console.log(tab);
    setActiveTab(tab);
  };
  return (
    <div className="container py-5 bg-white rounded-3xl">
      <ul className="list-none grid grid-cols-2 md:grid-cols-1 gap-3">
        <li
          onClick={() => handleTabClick("feed")}
          className={` ${activeTab === "feed" ? "bg-blue-200 text-blue-500" : "bg-neutral-100"} px-4 py-3 rounded-lg flex items-center gap-2 font-semibold cursor-pointer`}
        >
          <i className="fa-regular fa-newspaper"></i>
          <span>Feed</span>
        </li>
        <li
          onClick={() => handleTabClick("myPosts")}
          className={` ${activeTab === "myPosts" ? "bg-blue-200 text-blue-500" : "bg-neutral-100"}  px-4 py-3  rounded-lg flex items-center gap-2 font-semibold cursor-pointer`}
        >
          <i className="fa-solid fa-signs-post"></i>
          <span>My Posts</span>
        </li>
        <li
          onClick={() => handleTabClick("community")}
          className={` ${activeTab === "community" ? "bg-blue-200 text-blue-500" : "bg-neutral-100"} px-4 py-3  rounded-lg flex items-center gap-2 font-semibold cursor-pointer`}
        >
          <i className="fa-brands fa-dribbble"></i>
          <span>Community</span>
        </li>
        <li
          onClick={() => handleTabClick("bookmarks")}
          className={`${activeTab === "bookmarks" ? "bg-blue-200 text-blue-500" : "bg-neutral-100"} px-4 py-3 rounded-lg flex items-center gap-2 font-semibold cursor-pointer`}
        >
          <i className="fa-regular fa-bookmark"></i>
          <span>Saved</span>
        </li>
      </ul>
    </div>
  );
}
