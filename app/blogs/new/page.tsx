"use client";

import { useActionState } from "react";
import { createBlog } from "@/app/blogs/actions";

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, { error: "" });

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Create a new blog</h2>
      
      {/* Inline error message display */}
      {state.error && (
        <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "4px" }}>
          {state.error}
        </p>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Author</label>
          <input 
            type="text" 
            name="author" 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>URL</label>
          <input 
            type="url" 
            name="url" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}