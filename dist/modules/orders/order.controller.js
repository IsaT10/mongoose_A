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
exports.OrderControllers = void 0;
const order_services_1 = require("./order.services");
const order_validation_1 = require("./order.validation");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_services_1.OrderServices.getAllOrdersFromDB(email);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Could not fetch orders!',
        });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const validateData = order_validation_1.OrderValidationSchema.parse(orderData);
        const result = yield order_services_1.OrderServices.createNewOrderIntoDB(validateData);
        res.json({
            success: true,
            message: 'Order created successfully!',
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
exports.OrderControllers = {
    getAllOrders,
    createOrder,
};
