"use client";

import UpdateHome from "@/app/lib/api/home/update-home";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { revalidateHomes } from "@/app/lib/actions/revalidate-home";
import DeleteHome from "@/app/lib/api/home/delete-home";
// ✅ تعریف zod schema دقیق
export const ZodHouseUpdate = z.object({
  title: z.string().min(2, "عنوان باید حداقل دو کاراکتر باشد"),
  price: z.number().min(1, "قیمت معتبر نیست"),
  propertyType: z.enum(["APARTMENT", "VILLA", "HOUSE", "LAND"]),
  listingType: z.enum(["SALE", "RENT"]),
  address: z.string().min(3, "آدرس را وارد کنید"),
  city: z.string().min(2, "شهر را وارد کنید"),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  area: z.number().min(1),
  images: z.array(z.string("آدرس تصویر معتبر نیست")),
  availableFrom: z.string().min(4, "تاریخ معتبر نیست"),
});

type HouseFormData = z.infer<typeof ZodHouseUpdate>;

// ✅ props باید houseId و داده فعلی خانه رو بگیره
const CrudHouse = ({
  houseId,
  houseData,
}: {
  houseId: string;
  houseData: HouseFormData;
}) => {
  const [showActiveForm, setShowActiveForm] = useState(false);
  const queryClient = useQueryClient();
  // 🧠 form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HouseFormData>({
    resolver: zodResolver(ZodHouseUpdate),
    mode: "onChange",
  });

  // ✅ وقتی فرم باز میشه، داده‌های خونه رو داخل فرم قرار بده
  useEffect(() => {
    if (showActiveForm && houseData) {
      reset({
        title: houseData.title,
        price: houseData.price,
        propertyType: houseData.propertyType,
        listingType: houseData.listingType,
        address: houseData.address,
        city: houseData.city,
        bedrooms: houseData.bedrooms,
        bathrooms: houseData.bathrooms,
        area: houseData.area,
        images: houseData.images,
        availableFrom: houseData.availableFrom.split("T")[0], // برای نمایش درست در input datetime-local
      });
    }
  }, [showActiveForm, houseData, reset]);

  // 🔄 React Query Mutation
  const updateMutation = useMutation({
    mutationFn: (formData: HouseFormData) => UpdateHome(houseId, formData),
    onSuccess: async (data) => {
      console.log("✅ ملک با موفقیت بروزرسانی شد");
      console.log("Updated House:", data);
      //* دیتای اپدیت شده رو به روز رسانی می کردیم invalidateQueries اگر دیتا ها سمت کلاینت فچ شده بودند به وسیله
      //  queryClient.invalidateQueries({ queryKey: ["homes"] });
      //* که سمت سرور فقط اجرا میشه دیتا ها رو به روز رسانی کنیم revalidateTag زمانی که دیتاها سمت سرور سایت فچ شدن می تونیم به وسیله
      await revalidateHomes(); // 🔄 تریگر رفرش SSR
      //* اگر بخوایم فروم مربوط به اپدیت بعد از اپدیت شدن بسته شه
      setShowActiveForm(false);
    },
    onError: (err) => {
      console.log("❌ خطا در بروزرسانی: " + err.message);
    },
  });

  const onSubmit = (data: HouseFormData) => {
    const formattedData = {
      ...data,
      availableFrom: new Date(`${data.availableFrom}T00:00:00Z`).toISOString(),
    };
    updateMutation.mutate(formattedData);
  };

  //* delete-mutation
  const deleteMutation = useMutation({
    mutationFn: () => DeleteHome(houseId),
    onSuccess: async (data) => {
      console.log(` ${houseId} ملک با موفقیت حذف شد `);
      console.log("delete House:", data);
      //* دیتای اپدیت شده رو به روز رسانی می کردیم invalidateQueries اگر دیتا ها سمت کلاینت فچ شده بودند به وسیله
      // queryClient.invalidateQueries({ queryKey: ["homes"] });
      //* که سمت سرور فقط اجرا میشه دیتا ها رو به روز رسانی کنیم revalidateTag زمانی که دیتاها سمت سرور سایت فچ شدن می تونیم به وسیله
      await revalidateHomes(); // 🔄 تریگر رفرش SSR
      //* اگر بخوایم فروم مربوط به اپدیت بعد از اپدیت شدن بسته شه
      setShowActiveForm(false);
    },
    onError: (err) => {
      console.log("❌ خطا در بروزرسانی: " + err.message);
    },
  });

  return (
    <main>
      <button
        onClick={() => setShowActiveForm(!showActiveForm)}
        className="border cursor-pointer border-gray-100 p-2 mx-2 rounded-lg my-5 bg-gray-50 text-lg"
      >
        {showActiveForm ? "بستن فروم" : "آپدیت"}
      </button>

      <button
        onClick={() => {
          deleteMutation.mutate();
        }}
        className="border cursor-pointer border-gray-100 p-2 mx-2 rounded-lg my-5 bg-gray-50 text-lg"
      >
        حذف
      </button>

      {/* update form */}
      {showActiveForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow [&>div>input]:p-2 [&>div>input]:border [&>div>input]:my-2 [&>div>input]:rounded-md [&>div>select]:rounded-md [&>div>select]:my-2 [&>div>select]:p-2 [&>div>select]:border [&>div]:flex [&>div]:flex-col"
        >
          {/* Title */}
          <div>
            <label>عنوان</label>
            <input {...register("title")} className="input" />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label>قیمت</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="input"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label>شهر</label>
            <input {...register("city")} className="input" />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label>آدرس</label>
            <input {...register("address")} className="input" />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Area */}
          <div>
            <label>متراژ (متر)</label>
            <input
              type="number"
              {...register("area", { valueAsNumber: true })}
              className="input"
            />
            {errors.area && (
              <p className="text-red-500">{errors.area.message}</p>
            )}
          </div>

          {/* Property Type */}
          <div>
            <label>نوع ملک</label>
            <select {...register("propertyType")} className="input">
              <option value="APARTMENT">آپارتمان</option>
              <option value="VILLA">ویلا</option>
              <option value="HOUSE">خانه</option>
              <option value="LAND">زمین</option>
            </select>
          </div>

          {/* Listing Type */}
          <div>
            <label>نوع آگهی</label>
            <select {...register("listingType")} className="input">
              <option value="SALE">فروش</option>
              <option value="RENT">اجاره</option>
            </select>
          </div>

          {/* Available From */}
          <div>
            <label>در دسترس از</label>
            {/* <input type="text" {...register("availableFrom")} /> */}
            <input type="date" {...register("availableFrom")} />

            {errors.availableFrom && (
              <p className="text-red-500">{errors.availableFrom.message}</p>
            )}
          </div>

          {/* Images */}
          <div className="col-span-2">
            <label>تصاویر (URL با کاما جدا)</label>
            <input
              {...register("images", {
                setValueAs: (v) =>
                  typeof v === "string"
                    ? v.split(",").map((url: string) => url.trim())
                    : [],
              })}
              className="input"
            />
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting || updateMutation.isPending}
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {updateMutation.isPending ? "در حال بروزرسانی..." : "بروزرسانی ملک"}
          </button>
        </form>
      )}
    </main>
  );
};

export default CrudHouse;
