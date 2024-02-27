import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-blue-800 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>To Do</div>
        <div className="flex gap-10 hover:outline rounded-md px-2 items-center justify-center outline-1 hover:bg-blue-900">
          {session ? (
            <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link>
          ) : (
            <Link href={"/api/auth/signin "}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
