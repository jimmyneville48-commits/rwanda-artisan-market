"use client";

import { useCart } from '../../context/CartContext';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const { addToCart, cartCount } = useCart();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Our Products</h3>
        <span className="text-emerald-600 font-bold">{cartCount} items in cart</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={product.imageUrl} alt={product.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800">{product.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}