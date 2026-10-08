import MarqueeText from "react-marquee-text";

const Marquee = ({ products }) => {
  return (
    <div className="bg-base-300 py-2">
      <MarqueeText direction="right" duration={10}>
        {products.map((product) => (
          <div key={product.id} className="inline-flex items-center mr-8"> 
            <p className="mr-2 text-sm">
              {product.categoryIcon} {product.nameBn} {product.today} {product.unit}
            </p>
            <span
              className={`text-xs font-bold flex items-center ${
                product.change.dir === "up" ? "text-red-500" : "text-green-600"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"}
              {product.change.pct}%
            </span>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;