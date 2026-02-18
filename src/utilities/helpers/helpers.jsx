import toast from "react-hot-toast";

export function displayError(error, message = "Invalid data!") {
  toast.error(error.response?.data?.message || error.message || message);
}

export function displaySuccess(message = "Success!") {
  toast.success(message);
}
