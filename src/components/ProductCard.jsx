import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col h-full">
      <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.nameBn}</h1>
              <p className="text-gray-500 text-sm mt-1">
                প্রতি {product.unit}
              </p>
            </div>
          </div>
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="text-gray-500 text-xs mb-1">আজকের দাম</p>
          <h4 className="text-gray-900 font-bold text-lg">{product?.today} টাকা</h4>
        </div>
        <div>
          <span className={`text-xs font-semibold flex items-center gap-1 ${product.change.dir === "up" ? "text-red-500" : "text-green-500"}`}>
            {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;