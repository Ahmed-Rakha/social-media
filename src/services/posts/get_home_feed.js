import { $API } from "../../api/axios";

/**
 * @param {{only?: "following", limit?: number}} [queryParams] - The queryParams is optional
 */
export const getHomeFeed = async (queryParams) => {
  const ROUTE = `posts/feed`;
  const finalParams = {
    only: "following",
    limit: 10,
    ...queryParams,
  };

  const response = await $API.privateApi.get(`${ROUTE}`, {
    params: {
      ...finalParams,
    },
  });

  return response;
};
