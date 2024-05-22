import { Request, Response } from 'express';
import { OrderServices } from './order.services';

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    const result = await OrderServices.getAllOrdersFromDB(email);

    res.status(200).json({
      success: true,
      message: 'Orders are retrived successfully !',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch orders!',
      error: err,
    });
  }
};

// const getSingleOrder = async (req: Request, res: Response) => {
//   try {
//     const email = req.query.email as string | undefined;
//     const result = await OrderServices.getSingleOrderFromDB(email);

//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'Order not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Order fetched successfully!',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: 'Could not fetch order!',
//       error: err,
//     });
//   }
// };

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
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      messages: err.message,
      error: err,
    });
  }
};

export const OrderControllers = {
  getAllOrders,
  createOrder,
};
