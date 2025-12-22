"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const SigninButton = () => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/todo",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        variant={"outline"}
        onClick={handleSignin}
        disabled={loading}
        className="disabled:bg-muted-foreground/20"
      >
        {loading ? (
          "Signing in..."
        ) : (
          <>
            <FcGoogle size={18} /> Continue with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default SigninButton;
