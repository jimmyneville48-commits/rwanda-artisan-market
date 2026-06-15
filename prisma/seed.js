const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Supprimer les anciens produits au cas où
  await prisma.product.deleteMany();

  // Créer les 15 produits
  await prisma.product.createMany({
    data: [
      { title: "Woven Rwanda Basket", description: "Beautiful hand-woven traditional Rwandan basket.", price: 25.00, imageUrl: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=500", category: "Handicrafts" },
      { title: "African Print Fabric", description: "Colorful and vibrant African print fabric by the yard.", price: 15.50, imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500", category: "Fashion" },
      { title: "Rwandan Coffee Beans", description: "Premium Arabica coffee beans from the hills of Rwanda.", price: 18.00, imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500", category: "Food & Drinks" },
      { title: "Traditional Wood Carving", description: "Hand-carved wooden animal sculpture made by local artisans.", price: 45.00, imageUrl: "https://images.unsplash.com/photo-1565711561500-49678a10a63f?w=500", category: "Handicrafts" },
      { title: "Beaded Necklace", description: "Colorful handmade beaded necklace with traditional patterns.", price: 12.00, imageUrl: "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=500", category: "Jewelry" },
      { title: "Peace Basket (Agaseke)", description: "The iconic Rwandan peace basket, symbol of unity and prosperity.", price: 35.00, imageUrl: "https://images.unsplash.com/photo-1585264550248-1778be3b6368?w=500", category: "Handicrafts" },
      { title: "Rwandan Tea Box", description: "High-quality black tea leaves grown in Rwandan tea plantations.", price: 10.00, imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500", category: "Food & Drinks" },
      { title: "Handmade Soap", description: "Natural organic soap made with local ingredients and essential oils.", price: 8.50, imageUrl: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500", category: "Beauty" },
      { title: "Leather Journal", description: "Hand-stitched genuine leather journal, perfect for writing.", price: 22.00, imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500", category: "Accessories" },
      { title: "Banana Leaf Art", description: "Unique artwork made from dried banana leaves depicting village life.", price: 55.00, imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500", category: "Art" },
      { title: "Pottery Vase", description: "Handcrafted clay vase with traditional Rwandan motifs.", price: 30.00, imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500", category: "Handicrafts" },
      { title: "Woven Bracelet", description: "Lightweight and colorful woven bracelet handmade in Rwanda.", price: 6.00, imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500", category: "Jewelry" },
      { title: "Eco-friendly Tote Bag", description: "Reusable shopping bag made from recycled kitenge fabric.", price: 14.00, imageUrl: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=500", category: "Fashion" },
      { title: "Spicy Honey Jar", description: "Pure Rwandan honey infused with local chili for a sweet and spicy kick.", price: 11.00, imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500", category: "Food & Drinks" },
      { title: "Miniature Drums", description: "Set of miniature traditional Rwandan drums, perfect for decoration.", price: 40.00, imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500", category: "Art" }
    ]
  });

  console.log('Database seeded successfully with 15 products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });