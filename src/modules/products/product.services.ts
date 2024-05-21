import { TProduct } from './product.interface';
import { Product } from './product.model';

const getAllProductsFromDB = async (searchTerm: string | undefined) => {
  const queryObject: any = {};

  if (searchTerm) {
    queryObject.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const result = await Product.find(queryObject);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
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

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateSingleProductIntoDB,
  deleteProductFromDB,
};
