import { apiBaseUrl } from "@/app/lib/utils/api-base-url";
import CrudHouse from "../crud-house-admin/crud-house";
import Link from "next/link";

//* fetch

export async function getHomes() {
  const res = await fetch(`http://localhost:2025/house/all`, {
    next: { tags: ["homes"], revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch homes");

  const data = await res.json();
  return data;
}

type Props = {
  activebtn?: boolean;
};

interface Home {
  id: string;
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
  location: string;
}

export default async function HomeListSSR({ activebtn }: Props) {
  // اینجا درخواست در سمت سرور انجام میشه ✅ axios
  //   const homes = await GetHomes();
  // fetch
  const homes = await getHomes();
  //   console.log(homes, "homes");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">لیست ملک‌ها</h1>

      {homes.data.length === 0 ? (
        <p>هیچ ملکی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {homes?.data
            ?.map((home: Home) => (
              <div key={home.id} className="p-4 rounded-lg shadow bg-white">
                <h2 className="text-lg font-semibold">{home.title}</h2>
                <p className="text-gray-500">{home.location}</p>
                <p className="text-blue-600 font-bold">
                  {home.price.toLocaleString()} تومان
                </p>
                <p className="text-blue-600 font-bold">
                  <Link href={`/detail/${home.id}`}>دیدن جزئیات</Link>
                </p>
                {activebtn && <CrudHouse houseId={home.id} houseData={home} />}
              </div>
            ))
            .slice(0, 10)}
        </div>
      )}
    </main>
  );
}
