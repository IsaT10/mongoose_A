"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
// Zod validation schema for TOrder
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email('Invalid email format'),
    quantity: zod_1.z
        .number({
        required_error: 'Quantity is required',
    })
        .min(1, 'Quantity must be at least 1'),
    price: zod_1.z.number({
        required_error: 'Price is required',
    }),
    productId: zod_1.z.string({
        required_error: 'Product ID is required',
    }),
});
exports.OrderValidationSchema = OrderValidationSchema;
