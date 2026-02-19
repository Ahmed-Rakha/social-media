import { $API } from "../../api/axios";

export const markNotificationAsRead = async (notificationId) => {
  const ROUTE = `notifications/${notificationId}/read`;

  const response = await $API.privateApi.patch(`${ROUTE}`, {});
  return response;
};
