export const $QUERY_KEYS = {
  notifications: {
    all: ["notifications"],
    unread: ["notifications", "unread"],
    unreadCount: ["notifications", "unreadCount"],
  },
  posts: {
    all: ["posts"],
    myPosts: ["posts", "myPosts"],
    bookmarks: ["posts", "bookmarks"],
    community: ["posts", "community"],
    userPosts: (userId) => ["posts", "userPosts", userId],
  },
  profile: {
    myProfile : ["profile", "myProfile"],
    userProfile: (userId) => ["profile", "userProfile", userId],
  },
};
