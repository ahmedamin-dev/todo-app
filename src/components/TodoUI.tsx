"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TodosCard from "./TodosCard";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Todo } from "@/types/todo";

type Props = {
  user: { name: string };
};

const TodoUI = ({ user }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContent(value);
    if (value.trim().length > 0) setError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        setLoading(false);
        throw new Error("error creating todo");
      }

      if (res.ok) {
        const data = await res.json();
        setTodos([...todos, data.newTodo]);
        setError(false);
      }
    } catch (error) {
      console.error(error);
    }
    setContent("");
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/todos");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-20 space-y-5">
      <div className="text-center space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome {user.name}</h1>
        <p className="sm:text-lg text-muted-foreground">
          Let&apos;s get some work done!
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Add a new task"
              value={content}
              aria-invalid={error}
              onChange={handleChange}
            />
            <Button
              variant={"outline"}
              disabled={loading}
              className="disabled:bg-muted-foreground"
            >
              Add
            </Button>
          </form>
          {error && (
            <div role="alert" className="text-red-500 text-center">
              You must enter a valid Task
            </div>
          )}

          <div className="flex flex-col gap-3 max-h-80 overflow-y-scroll">
            {todos.map((todo) => (
              <TodosCard
                key={todo.id}
                todoId={todo.id}
                content={todo.content}
                completed={todo.completed}
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
