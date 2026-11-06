"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: "15px 20px", backgroundColor: "#f0f0f0", marginBottom: "20px", borderRadius: "6px" }}>
      <Link href="/" style={{ marginRight: "10px" }}>Home</Link>
      {" | "}
      <Link href="/blogs" style={{ margin: "0 10px" }}>Blogs</Link>
      {" | "}
      <Link href="/users" style={{ margin: "0 10px" }}>Users</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new" style={{ margin: "0 10px" }}>create new</Link>
          {" | "}
          <em style={{ margin: "0 10px" }}>{session.user?.name} logged in</em>{" "}
          <button 
            onClick={() => signOut()} 
            style={{ padding: "4px 10px", marginLeft: "10px", cursor: "pointer" }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ margin: "0 10px" }}>login</Link>
          {" | "}
          <Link href="/register" style={{ marginLeft: "10px" }}>register</Link>
        </>
      )}
    </nav>
  );
}