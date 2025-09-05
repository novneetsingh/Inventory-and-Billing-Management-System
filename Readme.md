# Inventory and Billing Management System

A backend system for small businesses to manage products and transactions. Built with Node.js, Express, and MongoDB.

## Features

- User Authentication (JWT)
- Product Management
- Transaction Management (Sales and Purchases)
- Stock Management
- Business Data Isolation

## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Setup and Installation

1. Clone the repository
   ```bash
   git clone https://github.com/novneetsingh/Inventory-and-Billing-Management-System.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```env
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── app.js              # Main application file
├── controllers/        # Business logic
│   ├── userController.js
│   ├── productController.js
│   ├── contactController.js
|   ├── reportController.js
│   └── transactionController.js
├── middleware/        # Custom middleware
│   └── auth.js       # JWT authentication middleware
├── models/           # Database models
│   ├── User.js
│   ├── Product.js
│   ├── Contact.js
│   └── Transaction.js
├── routes/           # API routes
    ├── userRoutes.js
    ├── productRoutes.js
    ├── contactRoutes.js
    ├── reportRoutes.js
    └── transactionRoutes.js
```

## Data Models

### User Schema

```javascript
{
  username: String,
  email: String,
  password: String,
}
```

### Product Schema

```javascript
{
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  businessId: String
}
```

### Contact Schema

```javascript
{
  name: String,
  phone: String,
  type: String,
  email: String,
  address: String,
  businessId: String
}
```

### Transaction Schema

```javascript
{
  type: String,
  customerId: String,
  vendorId: String,
  products: [{
    productId: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  date: Date,
  businessId: String
}
```

## API Endpoints

### Authentication

- `POST /register` - Register a new user

  ```json
  Request:

  {
    "username": "novneetsingh",
    "email": "novneet300@gmail.com",
    "password": "asd"
  }

  Response:

  {
    "success": true,
    "message": "User registered successfully",
    "data": {
        "username": "novneetsingh",
        "email": "novneet300@gmail.com",
        "password": "$2b$10$GrT55wLPJ9Cc9e8HXqestuRDpkBu0Dz6Z6VCughbb.Or9VJSA3gx.",
        "_id": "68babd6b154d9fd75f95123a",
        "createdAt": "2025-09-05T10:37:31.061Z",
        "updatedAt": "2025-09-05T10:37:31.061Z",
        "__v": 0
    }
  }
  ```

- `POST /login` - User login

  ```json
  Request:

  {
    "email": "novneet300@gmail.com",
    "password": "asd"
  }

  Response:

  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmFiZDZiMTU0ZDlmZDc1Zjk1MTIzYSIsImlhdCI6MTc1NzA2OTE3MCwiZXhwIjoxNzU3MTU1NTcwfQ.YUMXu3Ih6k0ciX6D1pT63A-HlRh0qyhoowjGOQSSKMk"
    }
  }
  ```

- `POST /logout` - User logout

  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### Products

- `GET /products` - List all products

```
  Query Parameters: name, category

  /products?name=wash&category=cosmetics

```

```json
Response:

{
  "success": true,
  "message": "Products fetched successfully",
  "count": 1,
  "data": [
      {
        "_id": "68badb78cf25212ad47509f3",
        "name": "Face Wash",
        "description": "Aloe vera face wash 150ml",
        "price": 150,
        "stock": 60,
        "category": "Cosmetics",
        "businessId": "68babd6b154d9fd75f95123a",
        "createdAt": "2025-09-05T12:45:44.015Z",
        "updatedAt": "2025-09-05T13:06:34.919Z",
        "__v": 0
      }
  ]
}

```

- `POST /products` - Add new product

  ```json
  Request:

  {
    "name": "Detergent Powder",
    "description": "1kg washing powder",
    "price": 250,
    "stock": 60,
    "category": "Household"
  }

  Response:

  {
    "success": true,
    "message": "Product created successfully",
    "data": {
        "name": "Detergent Powder",
        "description": "1kg washing powder",
        "price": 250,
        "stock": 60,
        "category": "Household",
        "businessId": "68babd6b154d9fd75f95123a",
        "_id": "68badca29850072e4a61bc4c",
        "createdAt": "2025-09-05T12:50:42.073Z",
        "updatedAt": "2025-09-05T12:50:42.073Z",
        "__v": 0
    }
  }
  ```

- `PUT /products/:id` - Update product

  ```json
  /products/68badba8cf25212ad47509fb

  Request:

  {
    "description": "2kg washing powder"
  }

  Response:

  {
    "success": true,
    "message": "Product updated successfully",
    "data": {
      "_id": "68badba8cf25212ad47509fb",
      "name": "Detergent Powder",
      "description": "2kg washing powder",
      "price": 250,
      "stock": 60,
      "category": "Household",
      "businessId": "68babd6b154d9fd75f95123a",
      "createdAt": "2025-09-05T12:46:32.209Z",
      "updatedAt": "2025-09-05T12:49:27.166Z",
      "__v": 0
    }
  }
  ```

- `DELETE /products/:id` - Delete product

### Contacts

- `GET /contacts` - List all contacts

```
  Query Parameters: name, phone, email, address, type

  /contacts?name=john
```

```json
  Response:

    {
      "success": true,
      "message": "Contacts fetched successfully",
      "count": 1,
      "data": [
          {
            "_id": "68bac9a64892843351db89da",
            "name": "Alice Johnson",
            "phone": "9876512345",
            "email": "alice@test.com",
            "address": "22 Lakeview Road, Delhi",
            "type": "customer",
            "businessId": "68babd6b154d9fd75f95123a",
            "createdAt": "2025-09-05T11:29:42.727Z",
            "updatedAt": "2025-09-05T11:29:42.727Z",
            "__v": 0
          }
      ]
  }

```

- `POST /contacts` - Add new contact

  ```json
  Request:

  {
    "name": "FreshMart Suppliers",
    "phone": "9090909090",
    "email": "freshmart@suppliers.com",
    "address": "55 Market Street, Chennai",
    "type": "vendor"
  }

  Response:

  {
    "success": true,
    "message": "Contact created successfully",
    "data": {
        "name": "FreshMart Suppliers",
        "phone": "9090909090",
        "email": "freshmart@suppliers.com",
        "address": "55 Market Street, Chennai",
        "type": "vendor",
        "businessId": "68babd6b154d9fd75f95123a",
        "_id": "68bacb4ab434cf0c134ce1c7",
        "createdAt": "2025-09-05T11:36:42.075Z",
        "updatedAt": "2025-09-05T11:36:42.075Z",
        "__v": 0
    }
  }

  ```

- `PUT /contacts/:id` - Update contact

- `DELETE /contacts/:id` - Delete contact

### Transactions

- `GET /transactions` - List transactions with filters

- `POST /transactions` - Create new transaction

```json

  Request:

  {
    "type": "sale",
    "customerId": "68bac9a64892843351db89da",
    "products": [
      {
        "productId": "68badb78cf25212ad47509f3",
        "quantity": 10,
        "price": 150
      },
      {
        "productId": "68badb8ecf25212ad47509f7",
        "quantity": 30,
        "price": 50
      }
    ]
  }

  Response:

  {
    "success": true,
    "message": "Transaction created successfully",
    "data": {
      "type": "sale",
      "customerId": "68bac9a64892843351db89da",
      "products": [
        {
          "productId": "68badb78cf25212ad47509f3",
          "quantity": 10,
          "price": 150
        },
        {
          "productId": "68badb8ecf25212ad47509f7",
          "quantity": 30,
          "price": 50
        }
      ],
      "totalAmount": 3000,
      "businessId": "68babd6b154d9fd75f95123a",
      "_id": "68bae05a42210b56b8602068",
      "date": "2025-09-05T13:06:34.598Z",
      "createdAt": "2025-09-05T13:06:34.754Z",
      "updatedAt": "2025-09-05T13:06:34.754Z",
      "__v": 0
    }
  }

```

### Reports

- `GET /reports/inventory` - Generate reports about inventory

- `GET /reports/transactions` - Generate reports about transactions

```
  Query Parameters: startDate, endDate, type

  /reports/transactions?startDate=2025-09-01&type=sale
```

```json
  Response:

  {
    "success": true,
    "message": "Transactions fetched successfully",
    "count": 1,
    "data": [
      {
        "_id": "68bae05a42210b56b8602068",
        "type": "sale",
        "customerId": {
          "_id": "68bac9a64892843351db89da",
          "name": "Alice Johnson",
          "phone": "9876512345",
          "email": "alice@test.com"
        },
        "products": [
          {
            "productId": {
              "_id": "68badb78cf25212ad47509f3",
              "name": "Face Wash",
              "price": 150,
              "category": "Cosmetics"
            },
            "quantity": 10,
            "price": 150
          },
          {
            "productId": {
              "_id": "68badb8ecf25212ad47509f7",
              "name": "Notebook",
              "price": 50,
              "category": "Stationery"
            },
            "quantity": 30,
            "price": 50
          }
        ],
        "totalAmount": 3000,
        "businessId": "68babd6b154d9fd75f95123a",
        "date": "2025-09-05T13:06:34.598Z",
        "createdAt": "2025-09-05T13:06:34.754Z",
        "updatedAt": "2025-09-05T13:06:34.754Z",
        "__v": 0
      }
    ]
  }
```
