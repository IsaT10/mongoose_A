"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_services_1.OrderServices.getAllOrdersFromDB(email);
        console.log(result);
        if (!result.length && (email === null || email === void 0 ? void 0 : email.length)) {
            throw new Error('User has not placed an order!');
        }
        res.status(200).json({
            success: true,
            message: `${email
                ? 'Orders fetched successfully for user email!'
                : 'Orders fetched successfully!'}`,
            data: result,
        });
    }
    catch (err) {
        next(Object.assign(Object.assign({}, err), { message: err.message || 'Failed to retrieve orders. Please try again later!' }));
    }
});
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(Object.assign(Object.assign({}, err), { message: err.message ||
                'An unexpected error occurred while creating the order.!' }));
    }
});
exports.OrderControllers = {
    getAllOrders,
    createOrder,
};
