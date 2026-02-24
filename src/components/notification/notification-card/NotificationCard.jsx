import avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { useNavigate } from "react-router";
import { $Utilities } from "../../../utilities/utilities-repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";

export default function NotificationCard({ notificationData, }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log(notificationData);
  function navigateToPostDetails(postId) {
    navigate(`/posts/${postId}`);
  }

  const { mutate, isPending: isMarkNotificationAsReadPending } = useMutation({
    mutationFn: (notificationId) =>
      $Services.NOTIFICATIONS_REPOSITORY.markNotificationAsRead(notificationId),

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

  function markNotificationAsRead(event, notificationId) {
    event.stopPropagation();
    mutate(notificationId);
  }

  console.log(
    " isMarkNotificationAsReadPending",
    isMarkNotificationAsReadPending,
  );
  return (
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
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={notificationData?.actor?.photo || avatar}
              alt={notificationData?.actor?.name || "User"}
            />
          </div>
          <div>
            <p className="flex items-center gap-2">
              <span className="font-bold capitalize">
                {notificationData?.actor?.name}
              </span>
              <span>
                {notificationData?.type.includes("comment")
                  ? "commented on your post"
                  : notificationData?.type.includes("share") ? "shared your post" : "liked your post"}
              </span>
            </p>
            <p className="my-2">
              {notificationData?.entity?.body || "See post"}
            </p>
            <div className="flex items-center gap-4 ">
              <button
                onClick={(event) =>
                  markNotificationAsRead(event, notificationData?._id)
                }
                className={`${notificationData?.isRead ? "text-green-600 bg-transparent font-bold" : "text-blue-500 bg-white"}  text-sm rounded-xl py-2 px-4 flex items-center gap-2 ${
                  isMarkNotificationAsReadPending
                    ? "pointer-events-none cursor-not-allowed"
                    : "cursor-pointer"
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
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-neutral-500 text-sm">
            {$Utilities.Dates.displayRelativeTime(notificationData?.createdAt)}
          </p>
          <p className="rounded-full w-2 h-2 bg-blue-500"></p>
        </div>
      </div>
    </div>
  );
}
