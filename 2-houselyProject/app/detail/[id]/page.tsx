import { notFound } from "next/navigation";
import React from "react";
const fetchSinglePageData = async (houseId: string) => {
  const data = await fetch(
    `http://localhost:2025/house/single-house/${houseId}`
  );
  return await data.json();
};

type Props = {
  // NOTE: params is a Promise in Next.js 15+
  params: Promise<{
    id: string;
  }>;
};

const DetailPage = async (houseId: Props) => {
  const id = (await houseId.params).id;
  console.log(id);
  const home = await fetchSinglePageData(id);
//   console.log(home.data, "home");
  const currentHome = home?.data?.id === id;
  if (!currentHome) return notFound();

  return (
    <div>
      <h1>hi</h1>

      <div key={home?.data?.id} className="p-4 rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold">{home?.data?.title}</h2>
        <p className="text-gray-500">{home?.data?.location}</p>
        <p className="text-blue-600 font-bold">
          {Number(home?.data?.price).toLocaleString()} تومان
        </p>
      </div>
    </div>
  );
};

export default DetailPage;
