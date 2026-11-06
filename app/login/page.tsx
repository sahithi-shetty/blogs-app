"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "24px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Username</label>
          <input 
            type="text" 
            name="username" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Password</label>
          <input 
            type="password" 
            name="password" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ padding: "10px", marginTop: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}