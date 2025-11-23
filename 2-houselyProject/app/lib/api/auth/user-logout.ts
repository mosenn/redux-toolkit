import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";
const CallUserLogout = async () => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/logout`,
      {},
      {
        withCredentials: true, // برای ارسال کوکی
      }
    );
    console.log("response CallUserLogout", response);
    return {
      statusCode: response.status,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Logout error", error);
    return {
      statusCode: 500,
      message: "Logout failed",
    };
  }
};

export default CallUserLogout;