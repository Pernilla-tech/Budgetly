"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";

import { Mail } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/seperator";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail, signInWithGoogle, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.error("Something went wrong!");
      console.error(error);
    }
  };

  // Check if there is a user
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div className="flex items-center justify-center w-full h-full px-8">
      {/* Main Container */}
      <div className="w-full max-w-lg">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="mt-2 text-neutral-600">
            Welcome to{" "}
            <span className="font-semibold text-neutral-800">Budgetly</span>{" "}
          </p>
        </div>
        {/* Github Button */}
        <button
          onClick={signInWithGoogle}
          className="flex items-center w-full gap-2 mt-6"
        >
          {/* Login with Github <Gmail size="16" /> */}
          Login with Google
        </button>
        {/* Seperator */}
        <div className="flex items-center my-8"></div>
        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <button type="submit" className="flex items-center w-full gap-2 mt-6">
            Login with Email
            <Mail size="16" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
