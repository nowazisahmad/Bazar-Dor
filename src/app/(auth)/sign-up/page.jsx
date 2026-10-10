"use client";

import { signUp, signIn } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Toast, 
  toast, 
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

    if (error) {
      toast.danger(error.message || "সাইন আপ করতে সমস্যা হয়েছে!");
    } else {
      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
    }
    
    console.log(signUpData, error);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({ provider: "google" });
    } catch (err) {
      toast.danger("Google সাইন আপ ব্যর্থ হয়েছে!");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signIn.social({ provider: "github" });
    } catch (err) {
      toast.danger("GitHub সাইন আপ ব্যর্থ হয়েছে!");
    }
  };

  return (
    <>
      <Toast.Provider />

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
            <TextField isRequired name="name">
              <Label className="mb-1.5 block text-[11px] font-medium text-[#37423a]">
                নাম
              </Label>
              <Input
                placeholder="আপনার নাম"
                className="h-9 w-full rounded-md border border-[#dce5de] bg-white px-3 text-[12px] text-[#26332b] outline-none focus:border-green-400"
              />
            </TextField>
            <TextField isRequired name="email">
              <Label className="mb-1.5 block text-[11px] font-medium text-[#37423a]">
                ইমেইল
              </Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="h-9 w-full rounded-md border border-[#dce5de] bg-white px-3 text-[12px] text-[#26332b] outline-none focus:bordergreen-400"
              />
            </TextField>
            <TextField isRequired name="password">
              <Label className="mb-1.5 block text-[11px] font-medium text-[#37423a]">
                পাসওয়ার্ড
              </Label>
              <Input
                type="password"
                placeholder="********"
                className="h-9 w-full rounded-md border border-[#dce5de] bg-white px-3 text-[12px] text-[#26332b] outline-none focus:border-green-400"
              />
            </TextField>
            <Button
              type="submit"
              className="h-9 w-full rounded-md bg-green-400 px-4 text-[11px] font-medium text-white shadow-sm"
            >
              সাইন আপ
            </Button>
          </Form>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleGoogleLogin}
              className="flex w-[48%] items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-xs font-medium hover:bg-gray-50"
            >
              <Icon icon="flat-color-icons:google" width="16" />
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="flex w-[48%] items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-xs font-medium hover:bg-gray-50"
            >
              <Icon icon="mdi:github" width="16" />
              GitHub
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-gray-500">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="text-green-400 font-medium">
              লগইন করুন
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUp;