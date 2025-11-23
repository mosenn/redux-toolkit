// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo/todoSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos:todoReducer,
  },
});

//  برای مشخص کردن نوع تایپ که موقع گرفتن راحتر باشیم
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;