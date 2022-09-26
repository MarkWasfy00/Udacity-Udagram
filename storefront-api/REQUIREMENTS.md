# RESTful Routes Endpoints 

## Auth Routes
- localhost:3000/api/auth/login -> `POST` -> returns `renew jwt token`
- localhost:3000/api/auth/register -> `POST`  -> returns `jwt token with registerd user data`

## User Routes
- localhost:3000/api/users -> `GET` -> must be logged in `token needed` -- get all users
- localhost:3000/api/users/:id -> `GET` -> must be logged in `token needed` -- get specific user
  
- localhost:3000/api/users -> `POST` -> must be logged in `token needed` -- creates user
- localhost:3000/api/users/:id -> `PUT` -> must be logged in `token needed` -- update user
- localhost:3000/api/users/:id -> `DELETE` -> must be logged in `token needed` -- delete user

## Product Routes
- localhost:3000/api/products -> `GET` -> must be logged in `token needed` -- get all products
- localhost:3000/api/products/:id -> `GET` -> must be logged in `token needed` -- get specific product
  
- localhost:3000/api/products -> `POST` -> must be logged in `token needed` -- creates product
- localhost:3000/api/products/:id -> `PUT` -> must be logged in `token needed` -- update product
- localhost:3000/api/products/:id -> `DELETE` -> must be logged in `token needed` -- delete product

## Order Routes
- localhost:3000/api/orders -> `GET` -> must be logged in `token needed` -- get all orders
- localhost:3000/api/orders/:id -> `GET` -> must be logged in `token needed` -- get specific order
- localhost:3000/api/orders/:id/products -> `GET` -> must be logged in `token needed` -- get order details
  
- localhost:3000/api/orders -> `POST` -> must be logged in `token needed` -- creates order
- localhost:3000/api/orders/:id/products -> `POST` -> -- add product to the order
- localhost:3000/api/orders/:id -> `PUT` -> -- update order
- localhost:3000/api/orders/:id -> `DELETE` -> -- delete order

# Database schema 

### user schema
- `id` -> `type of` -> `Primary key` -> `auto increment`
- `email` -> `type of` -> `String` (varchar(50)) -> `unique`
- `firstname` -> `type of` -> `String` (varchar(50)) -> `required`
- `lastname` -> `type of` -> `String` (varchar(50)) -> `required`
- `password` -> `type of` -> `String` (varchar(255)) -> `required`

### product schema
- `id` -> `type of` -> `Primary key` -> `auto increment`
- `name` -> `type of` -> `String` (varchar(50)) -> `required`
- `price` -> `type of` -> `Decimal` (decimal(10,2)) -> `required`

### order schema
- `id` -> `type of` -> `Primary key` -> `auto increment`
- `user_id` -> `type of` -> `INT` (reference) -> `users(id)`
- `is_complete` -> `type of` -> `Boolean` (boolean) -> `required`

### order products schema
- `id` -> `type of` -> `Primary key` -> `auto increment`
- `order_id` -> `type of` -> `BIG INT` (reference) -> `orders(id)`
- `product_id` -> `type of` -> `BIG INT` (reference) -> `products(id)`
- `quantity` -> `type of` -> `INT` (int) -> `required`