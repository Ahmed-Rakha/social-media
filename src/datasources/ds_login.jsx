export async function sendUserLogin(object) {
  try {
    setIsLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}users/signin`,
      object,
    );
    setIsLoading(false);
    toast.success("Login successfully");
    navigate("/posts");
  } catch (error) {
    // console.log(error.response.data.error);
    toast.error(error.response.data.error);
    setIsLoading(false);
  }
}
