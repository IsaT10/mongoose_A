import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../products/product.model';

const orderSchema = new Schema<TOrder>(
  {
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
  },
  { versionKey: false }
);

orderSchema.pre('save', async function (next) {
  const order = this;

  const product = await Product.findById(order.productId);

  if (!product) {
    throw new Error('Product not found!');
  }

  if (order.quantity > product.inventory.quantity) {
    throw new Error('Insufficient quantity available in inventory!');
  }

  await Product.findByIdAndUpdate(
    order.productId,
    {
      inventory: {
        quantity: product.inventory.quantity - order.quantity,
        inStock: product.inventory.quantity - order.quantity > 0,
      },
    },
    {
      new: true,
    }
  );

  next();
});

export const Order = model<TOrder>('Order', orderSchema);
