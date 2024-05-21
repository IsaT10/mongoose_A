import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);

// initial server start
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

// api routes

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

export default app;
