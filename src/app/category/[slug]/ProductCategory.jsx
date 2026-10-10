"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductCategory = ({ products, slug }) => {
  const categoryName = products?.[0]?.categoryNameBn;
  const categoryIcon = products?.[0]?.categoryIcon;

  const [sortOrder, setSortOrder] = useState("default");
  const sortedProducts = [...(products || [])].sort((a, b) => {
    const priceA = Number(a.today || 0); 
    const priceB = Number(b.today || 0);

    if (sortOrder === "low-high") {
      return priceA - priceB;
    }
    if (sortOrder === "high-low") {
      return priceB - priceA;
    }
    return 0; 
  });

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{categoryIcon}</span>
            <p className="text-xl font-bold text-gray-800">{categoryName}</p>
          </div>
          <h3 className="text-sm text-gray-600">
            {products?.length || 0} টি পণ্যের আজকের দাম ও পরিবর্তন
          </h3>
        </div>
        <div className="flex justify-end mb-6">
          <div className="bg-white border rounded-md px-4 py-2 flex items-center gap-2 text-sm text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50">
            <span>সাজান:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent outline-none cursor-pointer font-medium text-gray-800"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">দাম: কম থেকে বেশি</option>
              <option value="high-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>
        {sortedProducts && sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((item) => (
              <ProductCard key={item.slug || item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-xl text-gray-500 mb-4">
              দুঃখিত, এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;