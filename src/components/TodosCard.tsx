import { DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  id?: number;
  content: string;
};

const TodosCard = ({ content }: Props) => {
  return (
    <div className="border rounded-xl flex items-center justify-between p-4">
      <p>{content}</p>
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
