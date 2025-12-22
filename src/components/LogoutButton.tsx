"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  };
  return (
    <Button variant={"outline"} onClick={handleLogout}>
      Logout
      <LogOutIcon />
    </Button>
  );
};

export default LogoutButton;
