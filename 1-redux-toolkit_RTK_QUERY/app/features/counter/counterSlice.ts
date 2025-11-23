import { createSlice } from "@reduxjs/toolkit";


const initialState = { value: 0 }; // مقدار استیت

const counterSlice = createSlice({
  name: "counter", // اسم برای شناسایی
  initialState, // مقدار اولیه استیت
  reducers: {
    // فانکشن ها
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// در واقع اینجا فانکشن های داخل ریدوسر رو اکشن حساب می کنه
// در ادامه می تونیم از این فانکشن ها در هر جا نیاز باشه درون پروژه استفاده کنیم استفاده کنیم 
export const { increment , decrement , incrementByAmount} = counterSlice.actions;

// اینجا خوده ریدورسرو هم اسکپورت کردیم بهش نیاز داریم
export default counterSlice.reducer;