"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_services_1 = require("./product.services");
const product_validation_schema_1 = require("./product.validation.schema");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_services_1.ProductServices.getAllProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Could not fetch products!',
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.ProductServices.getSingleProductFromDB(productId);
        if (!result) {
            throw new Error('Product not found');
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Could not fetch product!',
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updateData = req.body;
    try {
        const result = yield product_services_1.ProductServices.updateSingleProductIntoDB(productId, updateData);
        if (!result) {
            throw new Error('Product not found');
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Could not fetch product!',
        });
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const validateData = product_validation_schema_1.ProductValidationSchema.parse(productData);
        const result = yield product_services_1.ProductServices.createProductIntoDB(validateData);
        res.json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err.name === 'ZodError') {
            res.status(500).json({
                success: false,
                message: err.issues[0].message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const result = yield product_services_1.ProductServices.deleteProductFromDB(productId);
        if (!result) {
            throw new Error('Product not found');
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Could not delete product!',
        });
    }
});
exports.ProductControllers = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
