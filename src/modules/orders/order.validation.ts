import { z } from 'zod';

// Zod validation schema for TOrder
const OrderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),

  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
    .min(1, 'Quantity must be at least 1'),

  price: z.number({
    required_error: 'Price is required',
  }),

  productId: z.string({
    required_error: 'Product ID is required',
  }),
});

export { OrderValidationSchema };
