import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";
interface User {
  email: string;
  password: string;
}

interface SuccessResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string;
  statusCode: number;
}

interface ErrorResponse {
  ErrorMessage: { status: number };
  TextMessage: string;
}

type UserResponse = SuccessResponse | ErrorResponse;

const UserLoginCallApi = async (userdata: User): Promise<UserResponse> => {
  console.log("userdata in axios call front-end ", userdata);
  const { email, password } = userdata;
  try {
    const LoginUser = await axios.post(
      `${apiBaseUrl}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true, // 🟢 اضافه کردن این گزینه بسیار مهمه
      }
    );

    return {
      data: LoginUser.data,
      message: `user ${email} is login sueccss`,
      statusCode: LoginUser.status,
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

export default UserLoginCallApi;
