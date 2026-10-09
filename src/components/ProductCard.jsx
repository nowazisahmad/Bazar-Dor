const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col h-full">
      <div className="flex flex-row items-start mb-5">
        <span role="img" aria-label={product?.nameBn} className="text-3xl mb-2">
          {product?.categoryIcon}
        </span>
        <div>
            <p className="text-gray-700 font-medium text-sm">{product?.nameBn}</p>
            <p className="text-gray-400 text-xs mt-0.5">{product?.unit}</p>
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="text-gray-500 text-xs mb-1">আজকের দাম</p>
          <h4 className="text-gray-900 font-bold text-lg">{product?.today}</h4>
        </div>
        <div>
          <span className={`text-xs font-semibold flex items-center gap-1 ${product.change.dir === "up" ? "text-red-500" : "text-green-500"}`}>
            {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
          </span>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;