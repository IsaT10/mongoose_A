import { Request, Response } from 'express';
import { ProductServices } from './product.services';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const result = await ProductServices.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Products are retrived successfully !',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch products!',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch product!',
      error: err,
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDB(productData);

    res.json({
      success: true,
      message: 'Product is created successfully !',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch product!',
      error: err,
    });
  }
};

export const ProductControllers = {
  getAllProducts,
  getSingleProduct,
  createProduct,
};
