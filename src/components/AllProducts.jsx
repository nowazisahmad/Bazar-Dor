import baseUrl from "@/services/baseUrl";
import ProductCard from "./ProductCard";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
};

const AllProducts = async () => {
  const products = await getProducts();

  return (
    <div>
      <p className="text-2xl font-bold py-5">সব পণ্য</p>
      <p className="text-semibold text-gray-500">মোট ৩৩ টি পণ্য দেখানো হচ্ছে</p>
      <div id="all-proucts" className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
