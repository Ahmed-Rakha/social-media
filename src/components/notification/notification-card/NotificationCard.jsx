import avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { Link, useNavigate } from "react-router";
import { $Utilities } from "../../../utilities/utilities-repository";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
import { Tooltip } from "@heroui/react";

export default function NotificationCard({ notificationData }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (notificationId) =>
      $Services.NOTIFICATIONS_REPOSITORY.markNotificationAsRead(notificationId),
    mutationKey: ["mark-notification-as-read", notificationData._id],

    /*
    optimistic updates: 
    1. cancel refetches notifications
    2. save the last notification to the cache
    3. update the last notification
    4. in case error ==> return error
    */

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({
        queryKey: $QUERY_KEYS.notifications.all,
      });
      const previousNotifications = queryClient.getQueryData({
        queryKey: $QUERY_KEYS.notifications.all,
      });
      queryClient.setQueryData($QUERY_KEYS.notifications.all, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          notifications: oldData.notifications.map((notification) => {
            if (notification._id === notificationId) {
              return { ...notification, isRead: true };
            }
            return notification;
          }),
        };
      });
      return { previousNotifications };
    },

    onSettled: () => {
      console.log("From onSettled");
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.notifications.unreadCount,
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.notifications.all,
      });
    },

    onError: (error, variables, context) => {
      console.log("From error", error, variables, context);
      queryClient.setQueryData(
        $QUERY_KEYS.notifications.all,
        context.previousNotifications,
      );
      $Utilities.Alerts.displayError(error);
    },
  });

  const isMarkingNotificationAsRead = useIsMutating({
    mutationKey: ["mark-notification-as-read", notificationData._id],
  });

  // Mark notification as read
  function markNotificationAsRead(event, notificationId) {
    event.stopPropagation();
    mutate(notificationId);
  }
  // Navigate to post
  function navigateToPostDetails(postId) {
    navigate(`/posts/${postId}`);
  }
  // Navigate to profile
  function navigateToProfile(event, userId) {
    event.stopPropagation();
    navigate(`/profile/${userId}`);
  }
  return (
    <Tooltip content={"Notification ID: " + notificationData?._id || ""}>
      <div
        onClick={() => {
          navigateToPostDetails(
            notificationData?.entityId || notificationData?.entity?._id,
          );
        }}
        className="bg-blue-100 p-4  rounded-xl "
      >
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div
              onClick={(event) =>
                navigateToProfile(event, notificationData?.actor?._id)
              }
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            >
              <img
                src={notificationData?.actor?.photo || avatar}
                alt={notificationData?.actor?.name || "User"}
              />
            </div>
            <div>
              <p className="flex items-center gap-2">
                <span
                  onClick={(event) =>
                    navigateToProfile(event, notificationData?.actor?._id)
                  }
                  className="font-bold capitalize cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-500"
                >
                  {notificationData?.actor?.name}
                </span>

                <span>
                  {notificationData?.type.includes("comment")
                    ? "commented on your post"
                    : notificationData?.type.includes("share")
                      ? "shared your post"
                      : "liked your post"}
                </span>
              </p>
              <p className="my-2">
                {notificationData?.entity?.body || "See post"}
              </p>
              <div className="flex items-center gap-4 ">
                <button
                  disabled={isMarkingNotificationAsRead}
                  onClick={(event) =>
                    markNotificationAsRead(event, notificationData?._id)
                  }
                  className={`${notificationData?.isRead ? "text-green-600 bg-transparent font-bold" : "text-blue-500 bg-white cursor-pointer"}  text-sm rounded-xl py-2 px-4 flex items-center gap-2 ${
                    isMarkingNotificationAsRead ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span>
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span>
                    {notificationData?.isRead ? "Read" : "Mark as read"}
                  </span>
                </button>
                <button className="text-red-500 rounded-full size-4 p-4 flex items-center justify-center bg-white cursor-pointer">
                  {notificationData?.type.includes("comment") ? (
                    <i className="fa-regular fa-comment text-indigo-500"></i>
                  ) : notificationData?.type.includes("share") ? (
                    <i className="fa-solid fa-share text-black"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-neutral-500 text-sm">
              {$Utilities.Dates.displayRelativeTime(
                notificationData?.createdAt,
              )}
            </p>
            <p className="rounded-full w-2 h-2 bg-blue-500"></p>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
