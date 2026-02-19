import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = localStorage.getItem("token");

export const changePassword = async (payload) => {
  const ROUTE = "users/change-password";

  try {
    const response = await axios.patch(`${BASE_URL}/${ROUTE}`, payload, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
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
