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

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/SammedDoshi03/nexus-commerce.git
    cd nexus-commerce
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - Copy `.env.example` to `.env`
    - Update `MONGO_URI` with your MongoDB connection string.
    - Set `JWT_SECRET` and `PORT`.

    ```bash
    cp .env.example .env
    ```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

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
