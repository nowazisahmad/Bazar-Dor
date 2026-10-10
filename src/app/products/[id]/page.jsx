import baseUrl from "@/services/baseUrl";

const ProductDetails = async ({ params }) => {
  const { id } = await params; 

  const res = await fetch(`${baseUrl}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-xl font-semibold text-gray-600">ডেটা লোড করা যায়নি!</div>;
  }

  const data = await res.json();
  console.log("API Response:", data);

  const product = data.products ? data.products[0] : data;

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-600">
        প্রোডাক্টটি খুঁজে পাওয়া যায়নি!
      </div>
    );
  }

  const averagePrice = Math.round((product.today + product.yesterday) / 2);
  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <span>হোম</span> <span className="mx-2">/</span>
          <span>{product.categoryNameBn}</span> <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.nameBn}</span>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.nameBn}</h1>
              <p className="text-gray-500 text-sm mt-1">
                প্রতি {product.unit} - {product.categoryNameBn}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-right w-full md:w-auto">
            <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-3xl font-bold text-gray-800">{product.today}</span>
              <span className="text-sm text-gray-500">টাকা</span>
            </div>
            <div
              className={`text-sm font-medium mt-1 ${
                product.change?.dir === 'up'
                  ? 'text-red-500'
                  : product.change?.dir === 'down'
                  ? 'text-green-500'
                  : 'text-gray-500'
              }`}
            >
              {product.change?.dir === 'up' ? '▲' : product.change?.dir === 'down' ? '▼' : '●'}{' '}
              {Math.abs(product.change?.pct || 0)}%
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600">{minPrice} টাকা</p>
            <p className="text-xs text-gray-400 mt-1">বাজারের সবচেয়ে কম দাম</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-bold text-red-600">{maxPrice} টাকা</p>
            <p className="text-xs text-gray-400 mt-1">বাজারের সবচেয়ে বেশি দাম</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">গড় দাম</p>
            <p className="text-2xl font-bold text-blue-600">{averagePrice} টাকা</p>
            <p className="text-xs text-gray-400 mt-1">আজকের গড় বাজার দর</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">বাজারভিত্তিক আজকের দাম</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">বাজার</th>
                  <th className="px-6 py-4 font-medium">বিভাগ</th>
                  <th className="px-6 py-4 font-medium">সর্বনিম্ন</th>
                  <th className="px-6 py-4 font-medium">সর্বোচ্চ</th>
                  <th className="px-6 py-4 font-medium">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {product.markets?.map((market, index) => {
                  const marketAvg = Math.round((market.min + market.max) / 2);
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{market.market}</td>
                      <td className="px-6 py-4 text-gray-500">{market.division}</td>
                      <td className="px-6 py-4 text-gray-600">{market.min} টাকা</td>
                      <td className="px-6 py-4 text-gray-600">{market.max} টাকা</td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">{marketAvg} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;