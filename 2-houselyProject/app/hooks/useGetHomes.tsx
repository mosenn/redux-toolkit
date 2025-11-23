import { useQuery } from "@tanstack/react-query";
import GetHomes from "@/app/lib/api/home/get-home";

export function useGetHomes() {
  return useQuery({
    queryKey: ["homes"],
    queryFn: GetHomes,
  });
}
