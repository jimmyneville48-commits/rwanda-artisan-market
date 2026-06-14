"use client";

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerData, items: cart, total: cartTotal }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setOrderId(data.orderId);
        clearCart();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si la commande est passée avec succès
  if (orderId) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order ID is:</p>
          <p className="text-xl font-mono bg-gray-100 p-2 rounded mb-6">{orderId}</p>
          <Link href="/" className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // Formulaire de paiement
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <Link href="/cart" className="text-emerald-600 hover:underline">← Back to Cart</Link>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire Client */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" required className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" required className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" required className="w-full border border-gray-300 p-2 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-emerald-600 text-white py-3 rounded-md font-semibold hover:bg-emerald-700 transition disabled:bg-gray-400"
              >
                {isSubmitting ? 'Placing Order...' : `Pay $${cartTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Résumé de la commande */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-700">{item.title} (x{item.quantity})</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-800">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-emerald-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}