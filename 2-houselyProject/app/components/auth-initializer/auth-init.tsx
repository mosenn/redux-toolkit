// components/AuthInitializer.tsx
"use client";

import useFetchUserProfile from "@/app/hooks/useFetchUserProfile";

export default function AuthInitializer() {
  useFetchUserProfile(); // فقط یک بار کل پروفایل رو می‌گیره
  return null; // هیچ UI لازم نیست
}
