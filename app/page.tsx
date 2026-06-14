import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ProductGrid from './components/ProductGrid';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-600">Rwanda Artisan Market</h1>
        <Link href="/cart" className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
          🛒 Cart
        </Link>
      </nav>

      <div className="bg-emerald-600 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Authentic Rwandan Handicrafts</h2>
        <p className="text-lg">Support local artisans. Shop beautiful, handmade products.</p>
      </div>

      {/* On utilise notre composant interactif ici */}
      <ProductGrid products={products} />
    </main>
  );
}