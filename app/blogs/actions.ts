"use server";

import { revalidatePath } from "next/cache";
import { blogs } from "./data";

export async function likeBlog(id: number) {
  const blog = blogs.find((blog) => blog.id === id);

  if (blog) {
    blog.likes += 1;
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}