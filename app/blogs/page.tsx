import { Suspense } from "react";
import { blogs } from "./data";
import Link from "next/link";


type Props = {
  searchParams: Promise<{ filter?: string }>;
};

async function BlogList({ searchParams }: Props) {
  const params = await searchParams;
  const filter = params.filter || "";

  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes);

  return (
    <main
      style={{
        backgroundColor: "white",
        color: "#222",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h2>Blogs</h2>

      <form action="/blogs" method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={filter}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {filteredBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "20px",
              maxWidth: "650px",
            }}
          >
            <h3>
  <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
</h3>
            <p>Author: {blog.author}</p>
            <p>
              URL: <a href={blog.url}>{blog.url}</a>
            </p>
            <p>Likes: {blog.likes}</p>
          </div>
        ))
      )}
    </main>
  );
}

export default function Blogs({ searchParams }: Props) {
  return (
    <Suspense fallback={<p>Loading blogs...</p>}>
      <BlogList searchParams={searchParams} />
    </Suspense>
  );
}