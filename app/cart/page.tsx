"use client";

import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-600">Rwanda Artisan Market</Link>
        <Link href="/" className="text-emerald-600 hover:underline">Continue Shopping</Link>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>

        {/* Si le panier est vide */}
        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-xl text-gray-500 mb-4">Your cart is currently empty.</p>
            <Link href="/" className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition">
              Go back to shopping
            </Link>
          </div>
        ) : (
          /* Si le panier a des articles */
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-6">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-emerald-600 font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 font-bold"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total et Bouton Checkout */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center mt-8">
              <div>
                <p className="text-lg text-gray-500">Total:</p>
                <p className="text-3xl font-bold text-emerald-600">${cartTotal.toFixed(2)}</p>
              </div>
              <Link href="/checkout" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition text-lg">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}