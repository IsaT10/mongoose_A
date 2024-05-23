"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = exports.InventoryValidationSchema = exports.VariantValidationSchema = void 0;
const zod_1 = require("zod");
// Define the variant schema
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Variant type is required' }),
    value: zod_1.z.string().min(1, { message: 'Variant value is required' }),
});
exports.VariantValidationSchema = VariantValidationSchema;
// Define the inventory schema
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number({
        required_error: 'Inventory quantity is required',
        invalid_type_error: 'Inventory quantity must be a number',
    })
        .min(1, 'Inventory quantity must be at least 1'),
    inStock: zod_1.z.boolean().default(true),
}, { required_error: 'Inventory data is required' });
exports.InventoryValidationSchema = InventoryValidationSchema;
// Define the product schema
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Product name is required',
    })
        .trim()
        .min(1, 'Product name cannot be empty'),
    description: zod_1.z
        .string({
        required_error: 'Product description is required',
    })
        .min(1, 'Product description cannot be empty'),
    price: zod_1.z.number({
        required_error: 'Product price is required',
    }),
    category: zod_1.z
        .string({
        required_error: 'Product category is required',
    })
        .min(1, 'Product category cannot be empty'),
    tags: zod_1.z
        .array(zod_1.z
        .string({
        required_error: 'Tags are required',
    })
        .min(1, 'Tag cannot be empty'))
        .nonempty({
        message: 'Tags array cannot be empty',
    }),
    variants: zod_1.z
        .array(VariantValidationSchema, { required_error: 'Variants are required' })
        .nonempty({
        message: 'Variants cannot be empty',
    }),
    inventory: InventoryValidationSchema,
});
exports.ProductValidationSchema = ProductValidationSchema;
