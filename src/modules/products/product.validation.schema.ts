import { z } from 'zod';

// Define the variant schema
const VariantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

// Define the inventory schema
const InventoryValidationSchema = z.object(
  {
    quantity: z
      .number({
        required_error: 'Inventory quantity is required',
        invalid_type_error: 'Inventory quantity must be a number',
      })
      .min(1, 'Inventory quantity must be at least 1'),
    inStock: z.boolean().default(true),
  },
  { required_error: 'Inventory data is required' }
);

// Define the product schema
const ProductValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Product name is required',
    })
    .trim()
    .min(1, 'Product name cannot be empty'),

  description: z
    .string({
      required_error: 'Product description is required',
    })
    .min(1, 'Product description cannot be empty'),

  price: z.number({
    required_error: 'Product price is required',
  }),

  category: z
    .string({
      required_error: 'Product category is required',
    })
    .min(1, 'Product category cannot be empty'),

  tags: z
    .array(
      z
        .string({
          required_error: 'Tags are required',
        })
        .min(1, 'Tag cannot be empty')
    )
    .nonempty({
      message: 'Tags array cannot be empty',
    }),

  variants: z
    .array(VariantValidationSchema, { required_error: 'Variants are required' })
    .nonempty({
      message: 'Variants cannot be empty',
    }),

  inventory: InventoryValidationSchema,
});

export {
  VariantValidationSchema,
  InventoryValidationSchema,
  ProductValidationSchema,
};
