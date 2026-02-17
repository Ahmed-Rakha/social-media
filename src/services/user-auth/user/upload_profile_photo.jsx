import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = localStorage.getItem("token");

export const uploadProfilePhoto = async (image) => {
  const ROUTE = `users/upload-photo`;
  const formData = new FormData();
  formData.append("photo", image);

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
