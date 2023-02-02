import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Order, User, Product } from '@/models';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  noPaidOrders: number;
  numberOfClients: number; // role: client
  numberOfProducts: number;
  productsWithNoInventory: number; // 0
  lowInventory: number; // Products with 10 stock or less
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.findOne({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    noPaidOrders: numberOfOrders - paidOrders,
  });
}
