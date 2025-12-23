"use client";

import { DeleteIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { Todo } from "@/types/todo";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Props = {
  todoId: string;
  content: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

const TodosCard = ({ content, todoId, todos, setTodos }: Props) => {
  return (
    <div className="border rounded-xl flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Checkbox id={todoId} />
        <label htmlFor={todoId} className="wrap-break-word">
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
