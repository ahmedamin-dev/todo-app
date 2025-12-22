"use client";

import { DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type Props = {
  id?: number;
  content: string;
};

const TodosCard = ({ content }: Props) => {
  return (
    <div className="border rounded-xl flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Checkbox id="completed" />
        <label htmlFor="completed" className="wrap-break-word">
          {content}
        </label>
      </div>

      <div className="flex gap-2">
        <Button size={"icon"} variant={"outline"} title="edit">
          <EditIcon />
        </Button>
        <Button variant={"outline"} size={"icon"} title="delete">
          <DeleteIcon className="text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default TodosCard;
