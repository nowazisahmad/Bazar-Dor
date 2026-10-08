import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import baseUrl from "@/services/baseUrl";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
}

export default async function Home() {
  
  const products = await getProducts();
  const downProducts = products.filter(p => p.trend == 'down');

  return (
    <div>
      <Marquee products={products}/>
      <div>
        <Banner/>
      </div>
    </div>
  );
}
