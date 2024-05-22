import { Request, Response } from 'express';
import { OrderServices } from './order.services';

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    const result = await OrderServices.getAllOrdersFromDB(email);

    // if (!result) {
    //   throw new Error('Order not found');
    // }

    res.status(200).json({
      success: true,
      message: 'Orders are retrived successfully !',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch orders!',
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createNewOrderIntoDB(orderData);

    res.json({
      success: true,
      message: 'Order is created successfully !',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
    });
  }
};

export const OrderControllers = {
  getAllOrders,
  createOrder,
};
