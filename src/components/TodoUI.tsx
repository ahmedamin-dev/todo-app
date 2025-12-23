"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TodosCard from "./TodosCard";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Todo } from "@/types/todo";

const TodoUI = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error("error creating todo");
      }

      if (res.ok) {
        const data = await res.json();
        setTodos([...todos, data.newTodo]);
      }
    } catch (error) {
      console.error(error);
    }
    setContent("");
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  return (
    <div className="pt-20 space-y-5">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-4xl font-bold">Welcome User</h1>
        <p className="sm:text-lg text-muted-foreground">Start Adding Todos!</p>
      </div>
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Add a new task"
              value={content}
              onChange={handleChange}
            />
            <Button variant={"outline"}>Add</Button>
          </form>

          <div className="flex flex-col gap-3 max-h-80 overflow-y-scroll">
            {todos.map((todo) => (
              <TodosCard
                key={todo.id}
                todoId={todo.id}
                content={todo.content}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoUI;
