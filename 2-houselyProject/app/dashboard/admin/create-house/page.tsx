"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { revalidateHomes } from "@/app/lib/actions/revalidate-home";
import CreateHome from "@/app/lib/api/home/create-home";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ContainerToast from "@/app/components/toast-container/toast";

// ✅ Zod Schema
export const ZodHouseCreate = z.object({
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

type HouseFormData = z.infer<typeof ZodHouseCreate>;

const CreateHouse = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HouseFormData>({
    resolver: zodResolver(ZodHouseCreate),
    mode: "onChange",
  });

  const createMutation = useMutation({
    mutationFn: (formData: HouseFormData) => CreateHome(formData),

    onSuccess: async (data) => {
      console.log(data);
      console.log("✅ ملک با موفقیت ساخته شد");
      console.log("Created House:", data);
      await revalidateHomes(); // بروزرسانی سمت سرور
      reset(); // ریست فرم بعد از ساخت موفق
      toast.dark("  خانه جدید اضافه شد🎉", {
        style: { background: "#1E1E1E", color: "#fff" },
      });
      setTimeout(() => {
        router.push("/dashboard/admin/houses");
      }, 3000);
    },
    onError: (err) => {
      console.log("❌ خطا در ایجاد ملک: " + err.message);
    },
  });

  const onSubmit = (data: HouseFormData) => {
    console.log("🟢 Form Submitted", data);
    const formattedData = {
      ...data,
      availableFrom: new Date(`${data.availableFrom}T00:00:00Z`).toISOString(),
    };
    createMutation.mutate(formattedData);
  };

  const onError = (err: unknown) => {
    console.log("🔴 Form Validation Error:", err);
  };

  return (
    <main>
      <ContainerToast />
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow [&>div>input]:p-2 [&>div>input]:border [&>div>input]:my-2 [&>div>input]:rounded-md [&>div>select]:rounded-md [&>div>select]:my-2 [&>div>select]:p-2 [&>div>select]:border [&>div]:flex [&>div]:flex-col"
      >
        {/* Title */}
        <div>
          <label>عنوان</label>
          <input {...register("title")} />
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
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label>شهر</label>
          <input {...register("city")} />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label>آدرس</label>
          <input {...register("address")} />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* Area */}
        <div>
          <label>متراژ (متر)</label>
          <input type="number" {...register("area", { valueAsNumber: true })} />
          {errors.area && <p className="text-red-500">{errors.area.message}</p>}
        </div>

        {/* Property Type */}
        <div>
          <label>نوع ملک</label>
          <select {...register("propertyType")}>
            <option value="APARTMENT">آپارتمان</option>
            <option value="VILLA">ویلا</option>
            <option value="HOUSE">خانه</option>
            <option value="LAND">زمین</option>
          </select>
        </div>

        {/* Listing Type */}
        <div>
          <label>نوع آگهی</label>
          <select {...register("listingType")}>
            <option value="SALE">فروش</option>
            <option value="RENT">اجاره</option>
          </select>
        </div>
        {/* bathrooms
         */}

        <div>
          <label>bathrooms </label>

          <input
            type="number"
            {...register("bathrooms", { valueAsNumber: true })}
          />
        </div>

        {/*  */}

        {/* bathrooms
         */}

        <div>
          <label>bedrooms </label>

          <input
            type="number"
            {...register("bedrooms", { valueAsNumber: true })}
          />
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
          />
          {errors.images && (
            <p className="text-red-500">{errors.images.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting || createMutation.isPending}
          type="submit"
          className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          {createMutation.isPending ? "در حال ایجاد..." : "ایجاد ملک"}
        </button>
      </form>
    </main>
  );
};

export default CreateHouse;
