import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = localStorage.getItem("token");

export const updateComment = async (postId, commentId, content, image) => {
  const ROUTE = `posts/${postId}/comments/${commentId}`;
  const formData = new FormData();
  formData.append("content", content);
  image && formData.append("image", image);

  try {
    const response = await axios.put(`${BASE_URL}/${ROUTE}`, formData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

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
