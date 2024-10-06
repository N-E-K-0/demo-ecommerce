"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut } from "../lib/authService";
import { RootState } from "../redux/store";

const NavBar = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleLogOut = () => {
    logOut();
    router.push("/auth/login");
  };

  return (
    <nav className="flex justify-between mx-10">
      <Link href="/">Home</Link>
      <div className="space-x-4">
        <Link href="/cart">Cart ({cartItems.length})</Link>
        <button
          onClick={handleLogOut}
          className="border-2 rounded-md bg-slate-300 px-2"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
