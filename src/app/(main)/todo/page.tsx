import TodoUI from "@/components/TodoUI";
import { getServerSession } from "@/lib/getSession";
import { unauthorized } from "next/navigation";

const TodoPage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    unauthorized();
  }
  return (
    <>
      <TodoUI user={user} />
    </>
  );
};

export default TodoPage;
