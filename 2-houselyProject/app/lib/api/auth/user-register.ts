// import {BaseUrl } from "@/app/lib/utils/configs/base-url";
import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";
interface User {
  email: string;
  password: string;
  username: string;
}
const UserRegister = async (userdata: User) => {
  console.log("userdata in axios call front-end ", userdata);
  const { email, password, username } = userdata;
  try {
    const CreateUser = await axios.post(`${apiBaseUrl}/auth/register`, {
      email,
      password,
      username,
    });

    return {
      data: CreateUser,
      message: "user is created sueccss",
      statusCode: CreateUser.status,
    };
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

export default UserRegister;
