## Project Overview

This project aims to develop an Express application using TypeScript, integrating MongoDB with Mongoose for effective data management. Data integrity is ensured through validation using Zod.

## Objectives

- Set up an Express project with TypeScript
- Integrate MongoDB using Mongoose to store product and order data
- Define Mongoose models for product data with appropriate data types and validations
- Implement CRUD operations for product management
- Implement order management and ensure inventory updates
- Validate incoming data for product and order creation using Joi/Zod

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or Yarn
- MongoDB (Local instance or a cloud-based MongoDB Atlas)

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/IsaT10/mongoose_A.git
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   PORT=7000

   DATABASE_URL= Local MongoDB instance or use MongoDB Atlas URI
   ```

   - `PORT`: The port on which your server will run.
   - `MONGODB_URI`: Your MongoDB connection string. You can set up a local MongoDB instance or use a cloud-based MongoDB service like MongoDB Atlas.

4. **Run the Project**

   To start the development server, use the following command:

   ```bash
   npm run start:dev
   ```

5. **Available Scripts**

   - `npm run start`: Runs the project in production mode.
   - `npm run start:dev`: Runs the project in development mode with hot-reloading.
   - `npm run build`: Compiles TypeScript to JavaScript.
   - `npm run lint`: Runs ESLint for code linting.
   - `npm run lint:fix`: Runs ESLint and fixes any fixable issues.

6. **API Endpoints**

   ### Product Management

   - `GET` : `/api/products`: Retrieve all products.
   - `GET` : `/api/products/:productId`: Retrieve a single product by ID.
   - `PUT` : `/api/products/:productId`: Update a product by ID.
   - `POST` : `/api/products`: Create a new product.
   - `DELETE` : `/api/products/:productId`: Delete a product by ID.

   ### Order Management

   - `GET` : `/api/orders`: Retrieve all orders.
   - `POST` : `/api/orders`: Create a new order and update inventory.
