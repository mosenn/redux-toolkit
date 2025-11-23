// features/todos/todosApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  // تعریف می کنیم برای شناسایی  createSlice می مونه که در  name  مثل
  // هستش RTK Query API Slice اما مخصوص
  reducerPath: "todosApi",
  // اینجا داریم ادرس مربوط رو مشخص می کنم که به چه ادرسی در خواست بزنیم
  baseQuery: fetchBaseQuery({
    baseUrl: "https://63d108283f08e4a8ff8ef010.mockapi.io",
  }),
  // builder - برای ساختن اند پوینت و ادد کیس استفاده میشه
  // builder.query - هر کوئری می تونه یک کوئری باشه برای گرفتن داده یا یک میوتیشن برای تغییر داده ها
  //query: () => - هست اضافه میشه baseUrl که همون  api به مسیر اصلی
  // baseUrl + query() = https://jsonplaceholder.typicode.com/todos

  //* وقتی که میایم این  فانکشن ها رو می نویسیم
  //   getTodos: builder.query({...}),
  // addTodo: builder.mutation({...}),
  //* میاد به صورت خودکار برای ما یک سری هوک ایجاد می کنه  RTK خوده
  //* که بتونیم برای کال کردن این فانکشن ها ازشون استفاده کنیم
  //* کردن نداریم useEffect , dispatch دیگه نیازی به

  // getTodos	useGetTodosQuery()

  // addTodo	useAddTodoMutation()

  // deleteTodo	useDeleteTodoMutation()

  // updateTodo	useUpdateTodoMutation()

  //*  باید اینو تعریف کنیم   provides/invalidates استفاده کنیم
  //* باعث میشن بعد از تغییرات دیتا ها مون اپدیت بشن یا ریفچ بشن provides/invalidates 
  tagTypes: ["Todos"],

  // رو انجام میدیم get , post , put , delete  عملیات  endpoints  اینجای به وسیله
  endpoints: (builder) => ({
    // داره انجام میشه  GET در اینجا
    getTodos: builder.query({
      query: () => "/users",
      providesTags: ["Todos"],
    }),
    // انجام میشه POST در اینجا داره عملیات

    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/users",
        method: "POST",
        body: {
          name: newTodo.name,
        },
      }),
      invalidatesTags: ["Todos"],
    }),

    // حذف کردن
    deleteTodo: builder.mutation({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    // اپدیت کردن
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// ساخته شده RTK Query هوک های که توسط خوده
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;
