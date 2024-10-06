"use client";

import { useState } from "react";
import { signUp } from "../../../lib/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, tokens } = await signUp(name, email, password);

      // Store the JWT tokens (access_token, refresh_token) in localStorage
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white/50 min-h-screen text-center">
      <div className="bg-gray-100/25 border-2 rounded-md shadow-md p-10 m-10">
        <h1 className="m-4 text-lg">Sign Up</h1>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-100 p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100 p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100 p-2"
          />
          <button
            type="submit"
            className="bg-gray-100 p-2 border-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p>
            Already signed up?{" "}
            <Link href="/auth/login">
              <b>Login</b>
            </Link>{" "}
            here
          </p>
        </form>
        {error && <p className="text-red-400">{error}</p>}{" "}
      </div>
    </div>
  );
};

export default SignUpPage;
