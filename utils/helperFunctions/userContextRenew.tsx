import axios from "axios";
import { BaseAPI } from "../constants/common";

export const UserContextRenew = async () => {
  try {
    const response = await axios.get(`${BaseAPI}/user/usercontext`, {
      withCredentials: true,
    });
    const userInfo = await response.data;
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};
