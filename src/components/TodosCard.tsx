"use client";

import { Checkbox } from "./ui/checkbox";
import { Todo } from "@/types/todo";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Props = {
  todoId: string;
  content: string;
  completed: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

const TodosCard = ({ content, todoId, completed, todos, setTodos }: Props) => {
  const handleChecked = async (checked: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: checked } : todo
      )
    );

    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: checked }),
    });

    if (!res.ok) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !checked } : todo
        )
      );
      throw new Error("Error Checking the task");
    }
  };

  return (
    <div className="border rounded-xl flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Checkbox
          id={todoId}
          checked={completed}
          onCheckedChange={handleChecked}
        />
        <label
          htmlFor={todoId}
          className={`wrap-break-word ${
            completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {content}
        </label>
      </div>

      <div className="flex gap-2">
        <EditDialog
          todoId={todoId}
          initialContent={content}
          setTodos={setTodos}
        />
        <DeleteDialog setTodos={setTodos} todoId={todoId} todos={todos} />
      </div>
    </div>
  );
};

export default TodosCard;
