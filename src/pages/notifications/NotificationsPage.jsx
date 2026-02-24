import { useState } from "react";
import NotificationCard from "../../components/notification/notification-card/NotificationCard";
import { Divider, Tooltip } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";
import NotificationSkeleton from "../../components/shared-components/skeletons/NotificationSkeleton";
import SmallSpinner from "../../components/shared-components/spinners/SmallSpinner";

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  // Fetch all notifications / unread notifications
  /* Update : They removed the queryParam unread from Backend but 
  I will keep the logic as it in case they back it again in the future and will filter on the frontend
  */
  const { data: notifications, isPending: isNotificationsLoading } = useQuery({
    queryKey: $QUERY_KEYS.notifications[filter],
    queryFn: () => $Services.NOTIFICATIONS_REPOSITORY.getNotifications(),
  });

  // Fetch unread count
  const { data: unreadData } = useQuery({
    queryKey: $QUERY_KEYS.notifications.unreadCount,
    queryFn: () => $Services.NOTIFICATIONS_REPOSITORY.getUnreadCount(),
  });

  // Mark all notifications as read
  const { mutate: markAllAsRead, isPending: isMarkAllAsReadPending } =
    useMutation({
      mutationFn: () => $Services.NOTIFICATIONS_REPOSITORY.markAllAsRead(),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: $QUERY_KEYS.notifications.all,
        });
        queryClient.invalidateQueries({
          queryKey: $QUERY_KEYS.notifications.unreadCount,
        });
        $Utilities.Alerts.displaySuccess("All notifications marked as read");
      },
    });

  function toggleTab(tab) {
    if (tab === filter) return;
    setFilter(tab);
  }

  return (
    <>
      <div className="container bg-white rounded-t-3xl p-6 ">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-1">
          <div>
            <h2 className="text-2xl font-bold">Notifications</h2>
            <h6 className="text-neutral-500 text-sm">
              Realtime updates for likes, comments, shares, and follows.
            </h6>
          </div>
          <Tooltip
            content={
              unreadData?.unreadCount == 0
                ? "No unread notifications"
                : "Mark all as read"
            }
          >
            <button
              onClick={markAllAsRead}
              disabled={
                isMarkAllAsReadPending ||
                isNotificationsLoading ||
                unreadData?.unreadCount == 0
              }
              className={`bg-neutral-100 text-neutral-600  text-md rounded-md px-3 py-2 flex items-center justify-center md:justify-start gap-1 hover:bg-neutral-200 ${isNotificationsLoading || isMarkAllAsReadPending || unreadData?.unreadCount == 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <i className="fa-solid fa-check-double"></i>
              <span className="font-bold">Mark all as read</span>
            </button>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between md:justify-start gap-4 mt-4 ">
          <button
            disabled={isNotificationsLoading}
            onClick={() => toggleTab("all")}
            className={`${filter === "all" ? "bg-indigo-500 text-neutral-100" : "bg-neutral-100 text-neutral-600"}  text-sm font-bold rounded-xl px-4 py-2 ${isNotificationsLoading ? "cursor-not-allowed" : "cursor-pointer"} w-full md:w-auto`}
          >
            All
          </button>
          <button
            disabled={isNotificationsLoading}
            onClick={() => toggleTab("unread")}
            className={`${filter === "unread" ? "bg-indigo-500 text-white " : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 "}  text-sm font-bold rounded-xl px-3 py-1.5 flex items-center gap-4 ${isNotificationsLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span className="font-bold text-sm">Unread</span>
            {isNotificationsLoading ? (
              <SmallSpinner filter={filter} />
            ) : (
              <span
                className={`${filter === "unread" ? "bg-indigo-400 text-white" : "bg-indigo-500 text-white"}  font-bold text-sm rounded-full size-8  flex items-center justify-center  text-neutral-100 `}
              >
                {unreadData?.unreadCount > 99 ? "99+" : unreadData?.unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <Divider className="max-w-11/12 mx-auto" />
      <div className="container bg-white rounded-b-3xl p-6 flex flex-col gap-4 ">
        {isNotificationsLoading ? (
          [...Array(10)].map((_, index) => <NotificationSkeleton key={index} />)
        ) : notifications?.notifications?.length === 0 ? (
          <p className="text-center text-neutral-500">
            No notifications found.
          </p>
        ) : filter === "all" ? (
          notifications?.notifications?.map((notification) => (
            <NotificationCard
              key={notification._id}
              notificationData={notification}
            />
          ))
        ) : notifications?.notifications?.filter(
            (notification) => notification.isRead === false,
          ).length === 0 ? (
          <p className="text-center text-neutral-500">
            No unread notifications found.
          </p>
        ) : (
          notifications?.notifications
            .filter((notification) => notification.isRead === false)
            ?.map((notification) => (
              <NotificationCard
                key={notification._id}
                notificationData={notification}
              />
            ))
        )}
      </div>
    </>
  );
}
