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
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../products/product.model");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    productId: {
        type: String,
        required: [true, 'Product ID is required'],
    },
}, { versionKey: false });
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        const product = yield product_model_1.Product.findById(order.productId);
        if (!product) {
            throw new Error('Product not found. Please ensure the product ID is correct and try again!');
        }
        if (order.quantity > product.inventory.quantity) {
            throw new Error('Insufficient quantity available in inventory!');
        }
        yield product_model_1.Product.findByIdAndUpdate(order.productId, {
            inventory: {
                quantity: product.inventory.quantity - order.quantity,
                inStock: product.inventory.quantity - order.quantity > 0,
            },
        }, {
            new: true,
        });
        next();
    });
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
