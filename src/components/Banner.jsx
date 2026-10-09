import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-full border bg-gray-400 px-4">
      <div className="bg-gray-100 rounded-2xl bg-gray-400 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
            {date}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, চিনি ও অন্যান্য নিত্যপ্রয়োজনীয়
            পণ্যের আজকের দাম এক নজরে দেখে নিন।
          </p>
          <div className="pt-2">
            <Link href="/">
              <Button>সব পণ্য দেখুন</Button>
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের সবজি ও ফলের ঝুড়ি"
            width={300}
            height={300}
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
