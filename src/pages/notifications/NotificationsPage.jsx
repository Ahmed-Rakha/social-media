import { useState } from "react";
import NotificationCard from "../../components/notification/notification-card/NotificationCard";
import { Button, Divider } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Services } from "../../services/services-repository";
import AppSpinner from "../../components/shared-components/spinners/AppSpinner";
import { $Utilities } from "../../utilities/utilities-repository";

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const [isActiveTab, setIsActiveTab] = useState("all");

  const { data: notifications, isPending: isNotificationsLoading } = useQuery({
    queryKey: $QUERY_KEYS.notifications.all,
    queryFn: () =>
      $Services.NOTIFICATIONS_REPOSITORY.getNotifications({ limit: 40 }),
  });

  const { data: unreadData } = useQuery({
    queryKey: $QUERY_KEYS.notifications.unreadCount,
    queryFn: () => $Services.NOTIFICATIONS_REPOSITORY.getUnreadCount(),
  });

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
    setIsActiveTab(tab);
    // Implement tab switching logic here
  }
  console.log("Notificaionssssss", unreadData);

  if (isNotificationsLoading) {
    return <AppSpinner />;
  }

  return (
    <>
      <div className="container bg-white rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-1">
          <div>
            <h2 className="text-2xl font-bold">Notifications</h2>
            <h6 className="text-neutral-500 text-sm">
              Realtime updates for likes, comments, shares, and follows.
            </h6>
          </div>
          <Button
            onPress={markAllAsRead}
            isDisabled={isMarkAllAsReadPending}
            className={`bg-neutral-100 text-neutral-600  text-md rounded-md px-3 py-2 flex items-center justify-center md:justify-start gap-1 hover:bg-neutral-200 ${isMarkAllAsReadPending ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <i className="fa-solid fa-check-double"></i>
            <span className="font-bold">Mark all as read</span>
          </Button>
        </div>

        <div className="flex items-center justify-between md:justify-start gap-4 mt-4 ">
          <button
            onClick={() => toggleTab("all")}
            className={`${isActiveTab === "all" ? "bg-indigo-500 text-neutral-100" : "bg-neutral-100 text-neutral-600"}  text-sm font-bold rounded-xl px-4 py-2 cursor-pointer w-full md:w-auto`}
          >
            All
          </button>
          <button
            onClick={() => toggleTab("unread")}
            className={`${isActiveTab === "unread" ? "bg-indigo-500 text-white " : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 "}  text-sm font-bold rounded-xl px-3 py-2 flex items-center gap-4 cursor-pointer`}
          >
            <span className="font-bold text-sm">Unread</span>
            <span
              className={`${isActiveTab === "unread" ? "bg-indigo-400 text-white" : "bg-indigo-500 text-white"} font-bold text-sm rounded-xl  text-neutral-100 px-2 py-1`}
            >
              {unreadData?.unreadCount}
            </span>
          </button>
        </div>
      </div>
      <Divider className="max-w-11/12 mx-auto" />
      <div className="container bg-white rounded-lg p-6 flex flex-col gap-4">
        {notifications.notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notificationData={notification}
          />
        ))}
      </div>
    </>
  );
}
