import axios from "axios";
import { BaseAPI } from "../constants/common";

export const pageAuthCheck = async (context: any) => {
  try {
    const cookie = context.req.headers.cookie.replace("token=", "");
    const response = await axios.post(`${BaseAPI}/user/pageauth`, { cookie });
    const data = await response.data;
    return {
      props: { authStatus: true },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};