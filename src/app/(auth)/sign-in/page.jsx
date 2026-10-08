"use client";

import { signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

const SignIn = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signInData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    console.log(signInData, error);
  };

  const handleGoogleLogin = async () => {
    const data = await signIn.social({
      provider: "google",
    });

    console.log(data);
  };

  const handleGithubLogin = async () => {
    const data = await signIn.social({
      provider: "github",
    });

    console.log(data);
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f3f8f4] px-4 py-12">
      <div className="mx-auto mb-7 max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#17241d] md:text-3xl">
          সাইন ইন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          বাজার দর-এ আপনার অ্যাকাউন্টে লগইন করুন
        </p>
      </div>
      {/* Card */}
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={onSubmit}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-gray-700">
              ইমেইল
            </Label>
            <Input
              className="h-11 rounded-lg border-gray-200"
              placeholder="you@example.com"
            />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              className="h-11 rounded-lg border-gray-200"
              placeholder="Enter your password"
            />
            <Description className="mt-2 text-xs text-gray-500">
              কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা থাকতে হবে
            </Description>
            <FieldError />
          </TextField>
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#009b4d] font-semibold text-white shadow-sm hover:bg-[#008943]"
          >
            সাইন ইন
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <Button
            type="button"
            onPress={handleGoogleLogin}
            variant="bordered"
            className="h-11 w-full rounded-lg border-gray-200 bg-white text-sm font-medium text-gray-700"
          >
            <span className="mr-2 text-base font-bold text-[#4285F4]">
              G
            </span>
            Google দিয়ে লগইন করুন
          </Button>
          <Button
            type="button"
            onPress={handleGithubLogin}
            variant="bordered"
            className="h-11 w-full rounded-lg border-gray-200 bg-white text-sm font-medium text-gray-700"
          >
            <span className="mr-2 text-base font-bold text-black">
              ◉
            </span>
            GitHub দিয়ে লগইন করুন
          </Button>
          <div className="text-center text-sm text-gray-500">
            পাসওয়ার্ড ভুলে গেছেন?{" "}
            <Link
              href="/forget-password"
              className="font-medium text-[#009b4d] hover:underline"
            >
              পাসওয়ার্ড রিসেট করুন
            </Link>
          </div>
        </Form>
      </div>
      <p className="mt-7 text-center text-xs text-gray-400">
        — বাজার দর-এ নিরাপদে লগইন করুন
      </p>
    </main>
  );
};

export default SignIn;