import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import { Todo } from "@/types/todo";

type Props = {
  todoId: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

const DeleteDialog = ({ todoId, setTodos, todos }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          title="delete"
          className="cursor-pointer"
        >
          <DeleteIcon className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleDelete}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
