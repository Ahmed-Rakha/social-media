import { $API } from "../../../api/axios";

export const getBookmarks = async () => {
  const ROUTE = "/users/bookmarks";

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
