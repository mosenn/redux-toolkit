"use client";
import { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./features/todo/todoApiService";

export default function Home() {
  const { data: todos, isLoading, isFetching } = useGetTodosQuery(null);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [newName, setnewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <main className="p-6 font-medium text-xl font-mono">
      <h1 className="text-2xl font-bold mb-4">⚡ RTK Query Todo App</h1>

      {/* افزودن Todo */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New todo..."
          value={newName}
          onChange={(e) => setnewName(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={() => {
            if (!newName.trim()) return;
            addTodo({
              name: newName,
            });
            setnewName("");
          }}
          className="bg-green-800 text-white px-4 py-2 rounded"
        >
          افزودن
        </button>
      </div>

      {/* لیست Todos */}
      <div>
        {/* [...todos].reverse() */}
        {[...todos].reverse()?.map((todo: { id: number; name: string }) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2"
          >
            {editId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <button
                  onClick={() => {
                    updateTodo({ id: todo.id, name: editTitle });
                    setEditId(null);
                    setEditTitle("");
                  }}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  ذخیره
                </button>
              </>
            ) : (
              <>
                <p className="flex-1">
                  <span className="text-gray-500 mr-2">{todo.id}</span>
                  {todo.name}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTitle(todo.name);
                    }}
                    className="bg-green-700 text-white px-3 py-1 rounded"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-400 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {isFetching && (
        <p className="text-sm text-gray-400 mt-2">در حال به‌روزرسانی...</p>
      )}
    </main>
  );
}
