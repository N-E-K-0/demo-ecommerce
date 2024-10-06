"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../lib/authService";
import { setAuthTokens } from "../../../redux/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tokens = await logIn(email, password);
      dispatch(setAuthTokens(tokens));
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white/50 min-h-screen text-center">
      <div className="bg-gray-100/25 border-2 rounded-md shadow-md p-10 m-10">
        <h1 className="m-4 text-lg">Log In</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            {loading ? "Logging In..." : "Log In"}
          </button>
          <p>
            Do not have an account?{" "}
            <Link href="/auth/signup">
              <b>Signup</b>
            </Link>{" "}
            here
          </p>
        </form>
        {error && <p className="text-red-400">{error}</p>}{" "}
      </div>
    </div>
  );
};

export default LogInPage;
