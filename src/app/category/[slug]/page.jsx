import ProductCategory from "./ProductCategory"; 
import baseUrl from "@/services/baseUrl";

const getProductCategory = async (slug) => {
  const res = await fetch(`${baseUrl}/products?category=${slug}`, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data?.data ?? data;
};

const CategoryPage = async ({ params }) => {
  const { slug } = await params; 
  const products = await getProductCategory(slug);

  return <ProductCategory products={products} slug={slug} key={slug}/>;
};

export default CategoryPage;