import { $API } from "../../api/axios";

/**
 * @param {string} postId - The postId is required
 */
export const bookmarkAndUnbookmarkPost = async (postId) => {
  const ROUTE = `posts/${postId}/bookmark`;

  try {
    const response = await $API.privateApi.put(`${ROUTE}`, {});

    return response;
  } catch (error) {
    if (error.response) {
      console.log("Server Error", error?.response);
      throw error;
    }
    if (error.request) {
      console.log("Network Error", error?.request);
      throw "Network Error: " + error?.request;
    }
    console.log("Unknown Error", error?.message);
    throw error?.message;
  }
};
