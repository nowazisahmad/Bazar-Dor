"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const user = session?.user;

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <div className="flex items-center justify-between my-3">
      <Link
        href="/"
        className="flex items-center gap-2"
      >
        <Image
          src="/logo-icon.png"
          alt="বাজার দর"
          width={36}
          height={36}
          priority
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-tight text-green-600">
            বাজার দর
          </span>
          <span className="text-[10px] leading-tight text-neutral-500">
            {date}
          </span>
        </div>
      </Link>
      <div>
        {user ? (
          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full bg-green-400 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium">
                {firstName}
              </span>
              <span className="text-xs">
                ▾
              </span>
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div className="border-b border-gray-100 px-3 py-2">
                <p className="text-sm font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
              <Link
                href="/profile"
                className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                আমার প্রোফাইল
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
              >
                সাইন আউট
              </button>
            </div>
          </details>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button>
                সাইন ইন
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button>
                সাইন আপ
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;