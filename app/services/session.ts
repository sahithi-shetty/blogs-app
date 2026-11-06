import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, session.user.email))
    .limit(1);

  return user || null;
};