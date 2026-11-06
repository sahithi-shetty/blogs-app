import { Suspense } from "react";
import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default function UserPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="p-8">Loading user...</p>}>
      <UserDetails params={params} />
    </Suspense>
  );
}

async function UserDetails({ params }: Props) {
  const { username } = await params;

  const result = await db
    .select({
      userId: users.id,
      name: users.name,
      username: users.username,
      blogId: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
    })
    .from(users)
    .leftJoin(blogs, eq(users.id, blogs.userId))
    .where(eq(users.username, username));

  if (result.length === 0) {
    notFound();
  }

  const user = result[0];
  const userBlogs = result.filter((blog) => blog.blogId !== null);

  return (
    <main className="min-h-screen bg-white p-8 text-black">
      <Link href="/users" className="text-blue-600">
        ← Back to Users
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{user.name}</h1>

      <p className="text-gray-600">@{user.username}</p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">
        Added Blogs
      </h2>

      {userBlogs.length === 0 ? (
        <p>No blogs added by this user.</p>
      ) : (
        <div className="space-y-4">
          {userBlogs.map((blog) => (
            <div key={blog.blogId} className="rounded-lg border p-4">
              <Link
                href={`/blogs/${blog.blogId}`}
                className="text-xl font-semibold text-blue-600"
              >
                {blog.title}
              </Link>

              <p>Author: {blog.author}</p>
              <p>Likes: {blog.likes}</p>

              <a
                href={blog.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                {blog.url}
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}