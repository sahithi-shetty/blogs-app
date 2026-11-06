import { Suspense } from "react";
import { db } from "@/db";
import { users } from "@/db/schema";
import Link from "next/link";

export default function UsersPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading users...</p>}>
      <UsersList />
    </Suspense>
  );
}

async function UsersList() {
  const allUsers = await db.select().from(users);

  return (
    <main className="min-h-screen bg-white p-8 text-black">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>

      {allUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {allUsers.map((user) => (
            <div key={user.id} className="rounded-lg border p-4">
              <Link
                href={`/users/${user.username}`}
                className="text-xl font-semibold text-blue-600"
              >
                {user.name}
              </Link>

              <p className="text-gray-600">@{user.username}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}