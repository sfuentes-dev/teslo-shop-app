import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '@/interfaces';
import { getSession } from 'next-auth/react';
import { db } from '@/database';
import { Product, Order } from '@/models';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderItems, total } = req.body as IOrder;

  // User exits?
  const session: any = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be authenticated for this.' });
  }

  // Create an array with the products the person wants
  const productsIds = orderItems.map((product) => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error('Check the cart again, the product does not exist.');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('Total is different with the amount');
    }

    //All good to this point
    const userId = session.user.id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({
      message: error.message || 'Review server logs',
    });
  }
};
