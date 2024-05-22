import { z } from 'zod';

// Define the variant schema
const VariantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

// Define the inventory schema
const InventoryValidationSchema = z.object({
  quantity: z.number().min(1, { message: 'Inventory quantity is required' }),
  inStock: z.boolean().default(true),
});

// Define the product schema
const ProductValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(1, { message: 'Product price is required' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z.array(z.string().min(1, { message: 'Product tags are required' })),
  variants: z
    .array(VariantValidationSchema)
    .nonempty({ message: 'Product variants are required' }),
  inventory: InventoryValidationSchema,
});

export {
  VariantValidationSchema,
  InventoryValidationSchema,
  ProductValidationSchema,
};
