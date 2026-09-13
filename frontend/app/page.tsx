"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/api/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    setInput("");
    fetchTodos();
  };

  const toggleDone = async (todo: Todo) => {
    await fetch(`${API_URL}/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        📝 할 일 목록 (Spring Boot + Next.js)
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="할 일을 입력하세요"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          onClick={addTodo}
        >
          추가
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white shadow-sm rounded-md px-4 py-3"
          >
            <span
              onClick={() => toggleDone(todo)}
              className={`flex-1 cursor-pointer ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
