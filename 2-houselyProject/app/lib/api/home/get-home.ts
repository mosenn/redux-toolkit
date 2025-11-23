import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";

const GetHomes = async () => {
  try {
    const house = await axios.get(`${apiBaseUrl}/house/all`);
    // console.log("house", house.data.data);
    return house.data.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      return {
        ErrorMessage: { status: err.response?.status || 500 },
        TextMessage: err.message || "User login failed due to an error",
      };
    }
    return {
      ErrorMessage: { status: 500 },
      TextMessage: "An unknown error occurred",
    };
  }
};

export default GetHomes;
