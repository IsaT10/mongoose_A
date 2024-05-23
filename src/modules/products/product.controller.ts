/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.services';
import { ProductValidationSchema } from './product.validation.schema';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  try {
    const result = await ProductServices.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: `${
        searchTerm?.length
          ? `Products matching search term '${searchTerm}' fetched successfully!`
          : 'Products fetched successfully!'
      }`,
      data: result,
    });
  } catch (err: any) {
    next({
      ...err,
      message:
        err.message || 'Failed to retrieve products. Please try again later!',
    });
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      throw new Error(
        'Product not found. Please ensure the product ID is correct and try again'
      );
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    next({
      ...err,
      message: err.message || 'Unable to fetch the requested product!',
    });
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      updateData
    );

    if (!result) {
      throw new Error(
        'Product not found. Please ensure the product ID is correct and try again'
      );
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: any) {
    next({
      ...err,
      message: err.message || 'Failed to update the product!',
    });
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next({
      ...err,
      message: err.message || 'Failed to create the product!',
    });
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;

  try {
    const result = await ProductServices.deleteProductFromDB(productId);

    if (!result) {
      throw new Error(
        'Product not found. Please ensure the product ID is correct and try again'
      );
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    next({
      ...err,
      message: err.message || 'Failed to delete the product',
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
