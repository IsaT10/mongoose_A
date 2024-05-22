import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { OrderValidationSchema } from './order.validation';

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    const result = await OrderServices.getAllOrdersFromDB(email);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
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

    const validateData = OrderValidationSchema.parse(orderData);
    const result = await OrderServices.createNewOrderIntoDB(validateData);

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const OrderControllers = {
  getAllOrders,
  createOrder,
};
