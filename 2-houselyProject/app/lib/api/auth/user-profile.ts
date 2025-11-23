import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";

const CallUserProfile = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/auth/profile`, {
      withCredentials: true,
    });

    console.log("response in user profile", response);
    if (response.status === 200) {
      console.log(response.data, "response in call user profile");
      return response.data;
    } else {
      console.log("UnAuthorization");
      return { status: 200, mesasge: "UnAuthorization" };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        ErrorMessage: { status: err.response?.status || 401 },
        TextMessage:
          err.message || "User profile failed due to an error service/profile",
      };
    }
  }
};

export default CallUserProfile;
