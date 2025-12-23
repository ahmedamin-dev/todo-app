"use client";

import { EditIcon } from "lucide-react";
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
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Todo } from "@/types/todo";

type Props = {
  initialContent: string;
  todoId: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const EditDialog = ({ todoId, setTodos, initialContent }: Props) => {
  const [content, setContent] = useState<string>(initialContent);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleEdit = async () => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw new Error("Error updating task");
    }

    if (res.ok) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === todoId ? { ...todo, content } : todo))
      );
      toast.success("Task updated successfully");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={"icon"}
          variant={"outline"}
          title="edit"
          className="cursor-pointer"
        >
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your Task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <label htmlFor="task">Task</label>
            <Input id="task" value={content} onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
