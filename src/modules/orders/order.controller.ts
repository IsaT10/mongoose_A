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
      statusCode: 500,
      message: err.message || 'Product not found',
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
      statusCode: 404,
      message: err.message || 'Order do not create successfully!',
    });
  }
};

export const OrderControllers = {
  getAllOrders,
  createOrder,
};
