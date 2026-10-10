"use client";

import { signUp } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

const SignUp = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signUpData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    console.log(signUpData, error);
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f3f8f4] px-4 py-12">
      <div className="mx-auto mb-7 max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#17241d] md:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          বাজার দর-এ যোগ দিতে আপনার তথ্যগুলো পূরণ করুন।
        </p>
      </div>
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-gray-700">
              নাম
            </Label>
            <Input
              className="h-11 rounded-lg border-gray-200"
              placeholder="যেমন: নাজিম উদ্দিন"
            />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="confirmPassword"
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
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              className="h-11 rounded-lg border-gray-200"
              placeholder="আবার পাসওয়ার্ড লিখুন"
            />
            <FieldError />
          </TextField>
          <Button type="submit" className="w-full bg-green-400 text-white">
            অ্যাকাউন্ট তৈরি করুন
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              className="h-10 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700"
            >
              <span className="mr-1 font-bold text-[#4285F4]">G</span>
              Google দিয়ে সাইন আপ
            </Button>
            <Button
              type="button"
              className="h-10 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700"
            >
              <span className="mr-1 font-bold text-black">◉</span>
              GitHub দিয়ে সাইন আপ
            </Button>
          </div>
          <p className="text-center text-xs text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <a
              href="/sign-in"
              className="font-medium text-green-400 hover:underline"
            >
              সাইন ইন করুন
            </a>
          </p>
        </Form>
      </div>
      <p className="mt-7 text-center text-xs text-gray-400">
        — বাজার দর-এ যোগ দিন
      </p>
    </main>
  );
};

export default SignUp;
