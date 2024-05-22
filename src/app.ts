import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';
import { OrderRoutes } from './modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// api routes

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// initial server start
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found`,
  });
});

export default app;
