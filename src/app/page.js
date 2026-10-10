import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import baseUrl from "@/services/baseUrl";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
};

export default async function Home() {
  const products = await getProducts();
  const upProducts = [...products]
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const downProducts = [...products]
    .filter((pd) => pd.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div>
      <Marquee products={products} />
      <div>
        <Banner />
      </div>
      <div>
        <p className="text-2xl font-bold py-5">▲ আজকে দাম বেড়েছে</p>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upProducts.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold py-5">▼ আজকে দাম কমেছে</p>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {downProducts.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold py-5">সব পণ্য</p>
        <p className="text-semibold text-gray-500">মোট ৩৩ টি পণ্য দেখানো হচ্ছে</p>
        <AllProducts />
      </div>
    </div>
  );
}
