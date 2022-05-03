import axios from "axios";
import { BaseAPI } from "../constants/common";
import { useCookies, Cookies } from "react-cookie";

export const pageAuthCheck = async (context: any) => {
  try {
    // const cookie = context.req.headers.cookie.replace("token=", "");
    const cookie = context.req.headers.cookie;
    //here
    const response = await axios.post(`${BaseAPI}/user/pageauth`, { cookie });
    const data = await response.data;
    return {
      props: { data },
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
