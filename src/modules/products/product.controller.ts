import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import { ProductValidationSchema } from './product.validation.schema';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const result = await ProductServices.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Could not fetch products!',
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      throw new Error('Product not found');
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Could not fetch product!',
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      updateData
    );

    if (!result) {
      throw new Error('Product not found');
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Could not fetch product!',
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const validateData = ProductValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(validateData);

    res.json({
      success: true,
      message: 'Product created successfully!',
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

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const result = await ProductServices.deleteProductFromDB(productId);

    if (!result) {
      throw new Error('Product not found');
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Could not delete product!',
    });
  }
};

export const ProductControllers = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
