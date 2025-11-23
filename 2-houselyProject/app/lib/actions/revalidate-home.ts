"use server"
import { revalidateTag } from "next/cache";

export async function revalidateHomes() {
  revalidateTag("homes");
}
