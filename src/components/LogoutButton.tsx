"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant={"outline"}
      onClick={handleLogout}
      disabled={loading}
      className="disabled:bg-muted-foreground/20"
    >
      {loading ? (
        "Loggin out..."
      ) : (
        <>
          Logout
          <LogOutIcon />
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
