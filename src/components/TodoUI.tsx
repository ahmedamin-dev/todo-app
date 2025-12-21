import TodosCard from "./TodosCard";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

type Todo = {
  id: number;
  content: string;
};

const todos: Todo[] = [
  {
    id: 1,
    content: "Learn React basics",
  },
  {
    id: 2,
    content: "Build a Todo app with Next.js",
  },
  {
    id: 3,
    content: "Practice Tailwind CSS layouts",
  },
  {
    id: 4,
    content: "Push project to GitHub",
  },
];

const TodoUI = () => {
  return (
    <div className="w-full pt-20 flex flex-col items-center gap-8">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-4xl font-bold">Welcome User</h1>
        <p className="sm:text-lg text-muted-foreground">Start Adding Todos!</p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Add a new task" />
            <Button variant={"outline"}>Add</Button>
          </div>

          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <TodosCard key={todo.id} content={todo.content} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoUI;
