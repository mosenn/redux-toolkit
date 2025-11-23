import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";

const DeleteHome = async (houseId: string, ) => {
  // http://localhost:2025/house/update/68e3664bb1dc04afdc497099
  try {
    const house = await axios.delete(
      `${apiBaseUrl}/house/remove/${houseId}`,
      {
        withCredentials: true,
      }
    );
    // console.log("house", house.data.data);
    return house.data.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      return {
        ErrorMessage: { status: err.response?.status || 400 },
        TextMessage: err.message || "User login failed due to an error",
      };
    }
    return {
      ErrorMessage: { status: 400 },
      TextMessage: "An unknown error occurred",
    };
  }
};

export default DeleteHome;
