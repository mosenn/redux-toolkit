"use client";

import GetHomes from "@/app/lib/api/home/get-home";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Home {
  id: string;
  title: string;
  location: string;
  price: string;
}

interface HomesListProps {
  initialHomes: Home[];
}

export default function HomesList({ initialHomes }: HomesListProps) {
  const { data: homes = initialHomes } = useQuery({
    queryKey: ["homes"],
    queryFn: GetHomes,
    initialData: initialHomes,
    // هر ۱۰ ثانیه داده‌ها رو آپدیت کن
    refetchInterval: 10000,
    // داده‌ها رو ۵ دقیقه fresh نگه دار تا fetch اضافی نزنه
    staleTime: 1000 * 60 * 5,
  });
  console.log("homes", homes);
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {homes.map(
        (home: {
          title: string;
          location: string;
          price: string;
          id: string;
        }) => (
          <div key={home.id} className="p-4 rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold">{home.title}</h2>
            <p className="text-gray-500">{home.location}</p>
            <p className="text-blue-600 font-bold">
              {Number(home.price).toLocaleString()} تومان
            </p>
            <p className="text-blue-600 font-bold">
              <Link href={`/detail/${home.id}`}>دیدن جزئیات</Link>
            </p>
          </div>
        )
      )}
    </div>
  );
}
