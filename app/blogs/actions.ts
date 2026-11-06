"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function likeBlog(id: number) {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id));

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}