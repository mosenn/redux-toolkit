import HomesList from "@/app/components/home-list/home-list";
import GetHomes from "@/app/lib/api/home/get-home";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export interface Home {
  id: string;
  title: string;
  location: string;
  price: string;
}

export default async function HydrationHomeList() {
  const queryClient = new QueryClient();

  // Server-side fetch
  //دخیره کرده    queryClient داده ها رو در prefetchQuery
  await queryClient.prefetchQuery({
    queryKey: ["homes"],
    queryFn: GetHomes,
  });

  const dehydratedState = dehydrate(queryClient); // میشه تا به کلاینت ارسال شه Json   اینجاداده های کچ شده در کوئری کلاینت  
  const homes = queryClient.getQueryData<Home[]>(["homes"]) || []; // ✅ // getQueryData اینجا داره داده ذخیره شده رو می خونه به وسیله

  return (
    // داده های کچ شده رو در کلاینت می خونه HydrationBoundary
    //برای اینکه دیتا خالی نباشه react-query برای نمایش سریع قبل از فعال شدن  initalHomes
    // اینجا دیتا از جیسون استخراج میشه به کامپونت هوم پاس داده میشه
    <HydrationBoundary state={dehydratedState}>
      
      <HomesList initialHomes={homes} />
    </HydrationBoundary>
  );
}
