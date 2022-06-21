import axios from "axios";

export const UserContextRenew = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/usercontext`,
      {
        withCredentials: true,
      }
    );
    const userInfo = await response.data;
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};
