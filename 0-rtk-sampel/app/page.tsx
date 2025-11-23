"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./features/counter/counterSlice";
import { useEffect, useState } from "react";
import { addTodo, removeTodo, updateTodo } from "./features/todo/todoSlice";

import { fetchTodos } from "./features/todo/todoSlice";
import type { AppDispatch, RootState } from "./store/store";
// در صورتی که از lib/api/todo/todo بخوایم استفاده کنیم و فانکشن ما دیکه در اسلایس نباشه
// import { fetchTodos } from "./lib/api/todo/todo";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>(); // ← اینجا مهم است
  const todos = useSelector((state: RootState) => state.todos.data ?? []);

  const loading = useSelector((state: RootState) => state.todos.loading);

  const count = useSelector(
    (state: { counter: { value: number } }) => state.counter.value
  );

  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // const todos = useSelector(
  //   (state: { todos: { data: { title: string } } }) => state.todos.data
  // );

  // const loading = useSelector(
  //   (state: { todos: { loading: boolean } }) => state.todos.loading
  // );

  // const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos()); // ← این خط لازم است
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addTodo({ id: 101, title: "Todo جدید" }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleUpdate = (id: number, title: string) => {
    dispatch(updateTodo({ id, title }));
  };

  // if (loading) return <p>Loading...</p>;

  return (
    <main className=" bg-gray-100  items-center justify-center">
      <div className="flex h-full items-center justify-center ">
        <button
          className="border border-gray-300 p-5 m-5 w-[100px] h-[50px] text-5xl items-center flex justify-center"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <h1 className="text-5xl font-bold">{count}</h1>
        <button
          className="border border-gray-300 p-5 m-5 w-[100px] h-[50px] text-5xl items-center flex justify-center"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className="border border-gray-300 p-5 m-5 w-[100px] h-[50px] text-5xl items-center flex justify-center"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
      </div>

      {/* افزودن Todo */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New todo..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            if (newTitle.trim()) {
              dispatch(addTodo({ id: Date.now(), title: newTitle }));
              setNewTitle("");
            }
          }}
        >
          Add
        </button>
      </div>
      {/* map todo */}
      {/* {todos?.map((todo: { id: number; title: string }) => (
        <div className="p-5 m-5 font-medium text-xl" key={todo.id}>
          <p>
            <span>{todo.id}</span> : {todo.title}
            <button onClick={() => handleRemove(todo.id)}>X</button>
          </p>
  

          
        </div>
      ))} */}

      {/*  */}

      {/* لیست Todos */}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex  items-center bg-gray-100 p-3 rounded mb-2 "
        >
          {editId === todo.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-1 rounded w-full"
              />
              <button
                className="ml-2 bg-blue-600 text-white px-2 mx-5 py-1 rounded"
                onClick={() => {
                  dispatch(updateTodo({ id: todo.id, title: editTitle }));
                  setEditId(null);
                  setEditTitle("");
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                {" "}
                <span>{todo.id} : </span>
                {todo.title}
              </p>
              <div className="flex gap-2">
                <button
                  className="bg-green-700  ml-5 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setEditId(todo.id);
                    setEditTitle(todo.title);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400  text-white px-2 py-1 rounded"
                  onClick={() => dispatch(removeTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </main>
  );
}
