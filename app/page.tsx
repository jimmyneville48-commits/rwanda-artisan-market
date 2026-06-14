import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

// On connecte la base de données directement ici
const prisma = new PrismaClient();

export default async function HomePage() {
  // On récupère les produits
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Menu */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-600">Rwanda Artisan Market</h1>
        <Link href="/cart" className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
          🛒 Cart
        </Link>
      </nav>

      {/* Bannière */}
      <div className="bg-emerald-600 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Authentic Rwandan Handicrafts</h2>
        <p className="text-lg">Support local artisans. Shop beautiful, handmade products.</p>
      </div>

      {/* Grille des produits */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h3 className="text-2xl font-semibold mb-6">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={product.imageUrl} alt={product.title} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">{product.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                  <button className="bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}