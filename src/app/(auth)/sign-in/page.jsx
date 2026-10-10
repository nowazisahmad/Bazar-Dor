"use client";

import { signIn } from "@/lib/auth-client";
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

    if (error) {
      toast.danger(error.message || "লগইন করতে সমস্যা হয়েছে!");
    } else {
      toast.success("সফলভাবে লগইন হয়েছে!");
    }
    
    console.log(signInData, error);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({ provider: "google" });
    } catch (err) {
      toast.danger("Google লগইন ব্যর্থ হয়েছে!");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signIn.social({ provider: "github" });
    } catch (err) {
      toast.danger("GitHub লগইন ব্যর্থ হয়েছে!");
    }
  };

  return (
    <>
      <Toast.Provider /> 
      <main className="min-h-[calc(100vh-120px)] bg-[#f3f8f4] px-4 py-12">
        <div className="mx-auto mb-7 max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#17241d] md:text-3xl">
            সাইন ইন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বাজার দর-এ আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>
        <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            <TextField isRequired name="email">
              <Label className="mb-1.5 block text-[11px] font-medium text-[#37423a]">
                ইমেইল
              </Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="h-9 w-full rounded-md border border-[#dce5de] bg-white px-3 text-[12px] text-[#26332b] outline-none focus:border-[#079447]"
              />
            </TextField>
            <TextField isRequired name="password">
              <Label className="mb-1.5 block text-[11px] font-medium text-[#37423a]">
                পাসওয়ার্ড
              </Label>
              <Input
                type="password"
                placeholder="********"
                className="h-9 w-full rounded-md border border-[#dce5de] bg-white px-3 text-[12px] text-[#26332b] outline-none focus:border-[#079447]"
              />
            </TextField>
            <Button
              type="submit"
              className="h-9 w-full rounded-md bg-green-400 px-4 text-[11px] font-medium text-white shadow-sm"
            >
              লগইন
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
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="text-green-600 font-medium">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignIn;