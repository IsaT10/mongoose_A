import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../products/product.model';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
  },
});

orderSchema.pre('save', async function (next) {
  const order = this as TOrder;

  const product = await Product.findById(order.productId);
  console.log(product);
  if (!product) {
    throw new Error('Product is not there');
  }

  next();
});

export const Order = model<TOrder>('Order', orderSchema);
