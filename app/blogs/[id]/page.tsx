import { Suspense } from "react";
import { blogs } from "../data";
import { likeBlog } from "../actions";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

async function BlogDetails({ params }: Props) {
  const { id } = await params;

  const blog = blogs.find((blog) => blog.id === Number(id));

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <main
      style={{
        backgroundColor: "white",
        color: "#222",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h2>{blog.title}</h2>

      <p>Author: {blog.author}</p>

      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>

      <p>Likes: {blog.likes}</p>

      <form action={likeBlog.bind(null, blog.id)}>
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 25px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ❤️ Like
        </button>
      </form>

      <br />

      <Link href="/blogs">Back to Blogs</Link>
    </main>
  );
}

export default function BlogPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading blog...</p>}>
      <BlogDetails params={params} />
    </Suspense>
  );
}