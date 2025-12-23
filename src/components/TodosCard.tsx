"use client";

import { DeleteIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { Todo } from "@/types/todo";
import EditDialog from "./EditDialog";

type Props = {
  todoId: string;
  content: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

const TodosCard = ({ content, todoId, todos, setTodos }: Props) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error deleting todo");
    }

    if (res.ok) {
      toast.success("Task deleted successfully");
      setTodos(todos.filter((todo) => todo.id !== todoId));
    }
  };
  return (
    <div className="border rounded-xl flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Checkbox id={todoId} />
        <label htmlFor={todoId} className="wrap-break-word">
          {content}
        </label>
      </div>

      <div className="flex gap-2">
        <EditDialog />
        <Button
          variant={"outline"}
          size={"icon"}
          title="delete"
          onClick={handleDelete}
          className="cursor-pointer"
        >
          <DeleteIcon className="text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default TodosCard;
