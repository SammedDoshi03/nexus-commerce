# Nexus Commerce
A generic, Extensible & Scalable E-commerce Core for NestJS.

**Nexus Commerce** is a production-ready, modular backend library designed to jumpstart e-commerce applications. It features a **Repository Pattern** architecture, allowing you to swap out the underlying database layer (defaults to MongoDB/Mongoose).

## Author
**Sammed Doshi**  
[GitHub](https://github.com/SammedDoshi03) | hammeddoshi03.sd@gmail.com

## Key Features
- **Database Agnostic Design**: Abstract Repository Pattern allows easy migration (e.g., to SQL/TypeORM).
- **Pre-built Modules**: Users, Auth, Products, Cart, Orders.
- **Enterprise Security**: Helmet, Rate Limiting, JWT, CORS, Input Validation.
- **Modular Monolith**: Clean separation of concerns.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas or Local)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Auth**: Passport.js & JWT

## Installation via NPM
 
You can install this library in your existing NestJS application:

```bash
npm install nexus-commerce @nestjs/mongoose mongoose
```

## Quick Start

1. **Import Modules**: Import the desired modules into your root `AppModule`.
2. **Database Connection**: Ensure you provide a MongoDB connection via `MongooseModule.forRoot()`.

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule, OrdersModule, UsersModule, AuthModule } from 'nexus-commerce';

@Module({
  imports: [
    // 1. Connect to Database (Required)
    MongooseModule.forRoot(process.env.MONGO_URI),

    // 2. Register Feature Modules
    UsersModule, 
    AuthModule,
    ProductsModule,
    OrdersModule
  ],
})
export class AppModule {}
```

## Configuration

Ensure your `.env` file contains the following keys required by the library's services:

```env
JWT_SECRET=your_super_secret_key
# Optional: Used if you stick to the default MongooseRepository
MONGO_URI=mongodb://localhost:27017/your-db 
```

Once the application is running, you can visit the Swagger UI to interact with the API:

- **URL**: `http://localhost:3000/api`

## Modules Overview

- **Users**: User registration and profile management.
- **Auth**: Login, Register to obtain JWT access tokens.
- **Products**: Manage product catalog (CRUD).
- **Cart**: Add products to cart, view cart, remove items.
- **Orders**: Checkout cart to create an order.

## License

This project is [MIT licensed](LICENSE).
