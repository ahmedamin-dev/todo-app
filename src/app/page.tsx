import SigninButton from "@/components/SigninButton";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/getSession";
import Link from "next/link";

const Home = async () => {
  const session = await getServerSession();

  const user = session?.user;

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to <span className="italic">Fakarny</span>
          </h1>
          <p className="text-muted-foreground sm:text-lg">
            Your handy Todo-List App!
          </p>
        </div>

        {user ? (
          <Button variant={"outline"} asChild>
            <Link href={"/todo"}>Go to the App</Link>
          </Button>
        ) : (
          <SigninButton />
        )}
      </div>
    </section>
  );
};

export default Home;
