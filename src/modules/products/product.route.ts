import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.post('/', ProductControllers.createProduct);
router.put('/:productId', ProductControllers.updateProduct);
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
