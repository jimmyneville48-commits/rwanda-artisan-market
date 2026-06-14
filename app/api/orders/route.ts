import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerData, items, total } = body;

    // 1. Créer ou trouver l'utilisateur par email
    let user = await prisma.user.findUnique({
      where: { email: customerData.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: customerData.name,
          email: customerData.email,
          password: 'default_password', // Pas de connexion réelle pour l'instant
        },
      });
    }

    // 2. Créer la commande
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}