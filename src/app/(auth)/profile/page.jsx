"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  Toast,
  toast,
} from "@heroui/react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = useSession();

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("in the form data", userData);

    const resData = await updateUser({
      name: userData.name,
    });

    console.log("after submit user profile", resData);

    toast.success("Profile Update Successfully!");
  };
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f7f3]">
        <p className="text-sm text-red-500">Please login first.</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <>
      <Toast.Provider />

      <div className="min-h-screen bg-[#f3f7f3] px-4 py-16">
        <div className="mx-auto w-full max-w-107">
          <div className="mb-5">
            <h1 className="text-[22px] font-bold text-[#27332b]">
              আমার প্রোফাইল
            </h1>
            <p className="mt-1 text-[12px] text-gray-500">
              আপনার প্রোফাইলের তথ্য এখানে দেখুন
            </p>
          </div>
          <div className="mb-4 rounded-xl border border-[#e1e8e2] bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8eee9]">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">👤</span>
                  )}
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-[#26332b]">
                    {user.name}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-md border border-red-300 bg-green-500 px-3 py-1.5 text-[11px] font-medium text-white"
              >
                নাম আপডেট
              </button>
            </div>
          </div>
          <Form className="w-full" onSubmit={handleUpdateUser}>
            <Fieldset className="rounded-xl border border-[#e1e8e2] bg-white px-4 py-4 shadow-sm">
              <Fieldset.Legend className="text-[14px] font-bold text-[#26332b]">
                তথ্য
              </Fieldset.Legend>
              <Description className="sr-only">
                Update your profile information.
              </Description>
              <FieldGroup className="mt-5 flex flex-col gap-2">
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
                  <Label className="mb-1.5 block text-[11px] font-medium text-[#37423a]">
                    নাম
                  </Label>
                  <Input
                    defaultValue={user.name}
                    className="
                      h-9
                    w-full
                      rounded-md
                      border
                      border-[#dce5de]
                      bg-white
                      px-3
                      text-[12px]
                      text-[#26332b]
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#079447]
                      focus:ring-2
                      focus:ring-[#079447]/10
                    "
                  />
                  <FieldError className="mt-1 text-[10px] text-red-500" />
                </TextField>
              </FieldGroup>
              <Fieldset.Actions className="mt-2">
                <Button
                  type="submit"
                  className="
                    h-9
                    w-full
                    rounded-md
                    bg-green-500
                    px-4
                    text-[11px]
                    font-medium
                    text-white
                    shadow-sm
                  "
                >
                  আপডেট
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
