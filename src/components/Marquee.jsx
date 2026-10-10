"use client";

import Link from "next/link";
import { useState } from "react";
import MarqueeText from "react-marquee-text";

const Marquee = ({ products }) => {

  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
     onMouseEnter= {() => setIsPaused(true)}
     onMouseLeave= {() => setIsPaused(false)} 
     className="bg-base-300 py-2">
      <MarqueeText direction="right" duration={10} paused={isPaused}>
        {products.map((product) => (
      <Link key={product.id} href={`/products/${product.id}`}>
        <div className="inline-flex items-center mr-8"> 
            <p className="mr-2 text-sm">
              {product.categoryIcon} {product.nameBn} {product.today} {product.unit}
            </p>
            <span
              className={`text-xs font-bold flex items-center ${
                product.change.dir === "up" ? "text-red-500" : "text-green-400"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"}
              {product.change.pct}%
            </span>
          </div>
      </Link>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;