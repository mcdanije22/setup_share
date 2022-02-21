import axios from "axios";
import { BaseAPI } from "../constants/common";

export const UserContextRenew = async () => {
  try {
    const response = await axios.get(`${BaseAPI}/user/usercontext`);
    const userInfo = await response.data;
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};
