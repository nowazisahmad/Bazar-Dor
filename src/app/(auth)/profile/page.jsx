"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@heroui/react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

const ProfilePage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;

  const [name, setName] = useState(user?.name || "");

  useEffect(() => {
    if (status !== "loading" && !user) {
      router.replace("/sign-in");
    }
  }, [status, user, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f2f7f3] px-4 py-16">
      <div className="mx-auto max-w-125">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                {user.name?.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-sm font-semibold">
                {user.name}
              </h2>
              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-5 text-sm font-semibold">
            তথ্য
          </h2>
          <div className="mb-4">
            <Label className="mb-1 block text-xs">
              নাম
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label className="mb-1 block text-xs">
              ইমেইল
            </Label>
            <Input
              value={user.email || ""}
              isReadOnly
            />
          </div>
          <Button
            className="w-full bg-green-600 text-white"
          >
            আপডেট
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
