import { TProduct } from './product.interface';
import { Product } from './product.model';

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const updateSingleProductIntoDB = async (id: string, updateData: object) => {
  const result = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateSingleProductIntoDB,
  deleteProductFromDB,
};
