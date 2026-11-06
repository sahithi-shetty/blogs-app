"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { getCurrentUser } from "@/app/services/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();

  // Server-side validation check
  if (!title || title.length < 3) {
    return { error: "Blog title must be at least 3 characters long" };
  }
  if (!url) {
    return { error: "Blog URL is required" };
  }

  await db.insert(blogs).values({
    title,
    author: author || user.name,
    url,
    userId: user.id,
  });

  revalidatePath("/blogs");
  redirect("/blogs");
};