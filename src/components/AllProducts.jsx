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
      <div id="all-proucts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
