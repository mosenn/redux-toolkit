import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";

interface propsUpdateHome {
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

const UpdateHome = async (houseId: string, formData: propsUpdateHome) => {
  // http://localhost:2025/house/update/68e3664bb1dc04afdc497099
  console.log("formdata", formData);
  const {
    title,
    address,
    price,
    propertyType,
    listingType,
    city,
    bedrooms,
    bathrooms,
    area,
    availableFrom,
  } = formData;
  try {
    const house = await axios.put(
      `${apiBaseUrl}/house/update/${houseId}`,
      {
        title,
        address,
        price,
        propertyType,
        listingType,
        city,
        bedrooms,
        bathrooms,
        area,
        // availableFrom,
        images: [
          "https://example.com/images/apartment1.jpg",
          "https://example.com/images/apartment2.jpg",
        ],
        availableFrom: "2025-11-01T00:00:00Z",
      },

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

export default UpdateHome;
