// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo/todoSlice";
import { todosApi } from "../features/todo/todoApiService";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    // اضافه می کنه store رو به  RTK Query  مربوط به  reducer  اینجا داره
    // به یک ریدوسر مخصوص به خودش نیاز داره success state , error , loading , cache  برای مدیریت  RTK Query در واقع
    [todosApi.reducerPath]: todosApi.reducer,
  },
  // میدل ور : کد واسطی که قبل یا بعد یک اتفاق ران میشه
  // ایجاد میشه reducer  به  action اینجا این کد قبل از رسیدن به هر اتفاق یا
  // مثلا وقتی کد ران میشه
  //* action  →  middlewareها  →  reducer

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),

  // دقیقاً چی کار می‌کنه؟   RTK Query Middleware

  // برای اینکه بتونه: RTK Query

  //*   رو مدیریت کنه HTTP در خواست های
  //*   رو نگه میداره cache  وضیعت
  //*   رو انجام بده refetch خود کار
  //*   رو هندل کنه invalidation
  //*   کردن در خواست ها رو انجام بده abort
  //*   شد unmount مثلا اگر کامپونت
  // مخصوص به خودش نیاز داره middelware  به یک

  //*  اضافه نکنیم store  رو به  todoApi.middlewere   اگه که

  // اجرا نمیشه API  در خواست های مربوط به

  // ساخته شدن کار نمی کنند API   هوک های که برای کال کردن  useGetTodosQuery و useAddTodoMutation

  // caching و refetch هم از کار می‌افته

  // حتی ارور خاصی نمی‌ده، فقط هیچ داده‌ای نمی‌گیری 😅

  //* هست fetch  و  Redux Store   با RTK Query مغز اصلی ارتباط  middleware پس این
});

//  برای مشخص کردن نوع تایپ که موقع گرفتن راحتر باشیم
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
