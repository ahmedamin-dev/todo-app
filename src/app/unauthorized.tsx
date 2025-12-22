import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-52 gap-8 text-center">
      <h1 className="text-4xl">You must Sign in to continue</h1>
      <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
        Sign in Page
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
