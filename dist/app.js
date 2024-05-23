"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/orders/order.route");
const handleError_1 = require("./utils/handleError");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// api routes
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_route_1.OrderRoutes);
// initial server start
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found`,
    });
});
app.use(handleError_1.globalErrorHandler);
exports.default = app;
