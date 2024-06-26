/* eslint-disable @typescript-eslint/no-explicit-any */

import { TOrder } from './order.interface';
import { Order } from './order.model';

const getAllOrdersFromDB = async (email: string | undefined) => {
  const queryObject: any = {};

  if (email) {
    queryObject.email = email;
  }

  const result = await Order.find(queryObject);
  return result;
};

const createNewOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};

export const OrderServices = {
  getAllOrdersFromDB,
  //   getSingleOrderFromDB,
  createNewOrderIntoDB,
};
