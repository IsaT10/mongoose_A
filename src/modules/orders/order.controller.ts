/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.services';
import { OrderValidationSchema } from './order.validation';

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query.email as string | undefined;

    const result = await OrderServices.getAllOrdersFromDB(email);

    console.log(result);

    if (!result.length && email?.length) {
      throw new Error('User has not placed an order!');
    }

    res.status(200).json({
      success: true,
      message: `${
        email
          ? 'Orders fetched successfully for user email!'
          : 'Orders fetched successfully!'
      }`,
      data: result,
    });
  } catch (err: any) {
    next({
      ...err,
      message:
        err.message || 'Failed to retrieve orders. Please try again later!',
    });
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body;

    const validateData = OrderValidationSchema.parse(orderData);
    const result = await OrderServices.createNewOrderIntoDB(validateData);

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    next({
      ...err,
      message:
        err.message ||
        'An unexpected error occurred while creating the order.!',
    });
  }
};

export const OrderControllers = {
  getAllOrders,
  createOrder,
};
