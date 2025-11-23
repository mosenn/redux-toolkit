import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";

import axiosInstance from "./axiosInstance";

//* with out interceptor
// interface propsCreate {
//   title: string;
//   price: number;
//   propertyType: "APARTMENT" | "VILLA" | "HOUSE" | "LAND";
//   listingType: "SALE" | "RENT";
//   address: string;
//   city: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   images: string[];
//   availableFrom: string;
// }

// const CreateHome = async (formData:propsCreate) => {
//   console.log("📦 ارسال داده برای ساخت ملک:", formData);

//   const {
//     title,
//     address,
//     price,
//     propertyType,
//     listingType,
//     city,
//     bedrooms,
//     bathrooms,
//     area,
//     images,
//     availableFrom,
//   } = formData;

//   try {
//     const response = await axios.post(
//       `${apiBaseUrl}/house/create`,
//       {
//         title,
//         address,
//         price,
//         propertyType,
//         listingType,
//         city,
//         bedrooms,
//         bathrooms,
//         area,

//         // availableFrom: "2025-11-01T00:00:00Z",
//         images: [
//           "https://example.com/images/apartment1.jpg",
//           "https://example.com/images/apartment2.jpg",
//         ],
//          availableFrom, // تاریخ از فرم گرفته میشه
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     console.log("✅ ملک با موفقیت ایجاد شد:", response.data.data);
//     return response.data.data;
//   } catch (err) {
//     console.log("❌ خطا در ایجاد ملک:", err);
//     if (axios.isAxiosError(err)) {
//       return {
//         ErrorMessage: { status: err.response?.status || 400 },
//         TextMessage: err.message || "Create home failed due to an error",
//       };
//     }
//     return {
//       ErrorMessage: { status: 400 },
//       TextMessage: "An unknown error occurred",
//     };
//   }
// };

// export default CreateHome;

//* with interceptor


interface propsCreate {
  title: string;
  price: number;
  propertyType: "APARTMENT" | "VILLA" | "HOUSE" | "LAND";
  listingType: "SALE" | "RENT";
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  availableFrom: string;
}

const CreateHome = async (formData: propsCreate) => {
  try {
    const response = await axiosInstance.post("/house/create", {
      ...formData,
      // فقط نمونه عکس ثابت برای تست
      images: formData.images.length ? formData.images : [
        "https://example.com/images/apartment1.jpg",
        "https://example.com/images/apartment2.jpg",
      ],
      availableFrom: formData.availableFrom || "2025-11-01T00:00:00Z",
    });

    return response.data.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    console.error("❌ خطا در ایجاد ملک:", err);
    return {
      ErrorMessage: { status: err.status || 400 },
      TextMessage: err.message || "Create home failed",
    };
  }
};

export default CreateHome;
