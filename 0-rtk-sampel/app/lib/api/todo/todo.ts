import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`
  );
  console.log(response, "response");
  return response.data;
});