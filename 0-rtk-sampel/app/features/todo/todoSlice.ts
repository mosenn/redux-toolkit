// todoSlice.js
// import { fetchTodos } from "@/app/lib/api/todo/todo";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// رو صدا می زنیم دیتا رو می گیریم api اینجا داریم فانشکن مربوط به
// می تونیم این فانکشن رو جدا بنویسم
// که درون  lib/api/todo/todo . همین کد رو اضافه کردیم و بعد ایمپورت می کنیم و استفاده می کنیم

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`
  );
  console.log(response, "response");
  return response.data;
});

//* post todo createAsyncThunk
// export const postTodo = createAsyncThunk("todos/add", async (newTodo) => {
//   const response = await axios.post(
//     "https://jsonplaceholder.typicode.com/todos",
//     newTodo
//   );
//   console.log(response, "response");
//   return response.data;
// });

// dispatch(addTodo({ title: "New Todo", completed: false }));



// یک اسلایس تعریف کردیم
const todoSlice = createSlice({
  // اسم نیاز داریم برای مشخص شدن
  name: "todos",
  // استیت ما به طور پیش فرض که تعینن می کنیم شامل چه مقادیری هست
  initialState: {
    data: [] as { id: number; title: string }[],
    loading: false,
    error: null,
  },
  // می تونیم در این قسمت فانشکن های رو اضافه کنیم در صورت نیاز
  reducers: {
    // 1️⃣ افزودن یک todo جدید
    addTodo: (state, action: { payload: { id: number; title: string } }) => {
      state.data.unshift(action.payload);
    },
    // 2️⃣ حذف یک todo بر اساس id
    removeTodo: (state, action: { payload: number }) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
    // 3️⃣ تغییر عنوان یک todo بر اساس id
    updateTodo: (state, action: { payload: { id: number; title: string } }) => {
      const todo = state.data.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    }, // ← این کاما و } فراموش نشود
  },
  extraReducers: (builder) => {
    builder
      // اگر گرفتن دیتا ما در حال پردازش بود لودینگ داشته باشیم
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      // اگر دیتای ما موفقیت امیز بود لودینگ ما فالس شه و دیتسا در استسیت جاگذاری شه
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        // اینجا دیتا درون استیت ریخته میشه
        state.data = action.payload;
      })
      // اگر به هر دلیل در خواست ناموفق بود دوباره لودینگ رو داریم می تونی ارور هم قرار بدیم
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
