import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="border-b px-4">
      <nav className="flex items-center justify-between w-full max-w-5xl mx-auto py-4">
        <div className="text-2xl font-bold">
          <Link href={"/"}>Fakarny</Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant={"outline"}>
            Logout
            <LogOutIcon />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
