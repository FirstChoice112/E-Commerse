# E-COMMERCE

A mockup E-com clothing store with three major collections in a responsive React application.  
As of October 2024, the front-end part of the responsive React application has its first draft togheter with an Admin panel in the frontend and Backend endpoints.  
Currently working on:

- Trello, user stories, and commenting on potential improvements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

- [Installation](#installation)

  - To get the project running locally, follow these steps:
    ```bash
    git clone https://github.com/FirstChoice112/E-Commerse.git
    cd your-repository
    npm install
    ```
    **Note:** Make sure to replace `your-username` and `your-repository` with your actual GitHub username and repository name.

- [Usage](#usage)

  - To start the application, run:
    ```bash
    npm start
    ```
    This will start the development server, and you can access the application at [http://localhost:3000](http://localhost:3000).

- [Features](#features)

  - Features:
    - Responsive React application with three major collections.
    - Uses React Router for client-side routing.
    - RESTful API endpoints for managing products, users, and orders.
    - Authentication and authorization with JWT.
    - MongoDB as the primary database.
    - Error handling middleware for consistent error responses.

- [Testing](#testing)

  - To run tests, use the following command:
    ```bash
    npm test
    ```
    This will run the Jest test suite.

- [API Documentation](#api-documentation)

### API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/products`   | Fetch all products      |
| POST   | `/api/auth/login` | User login              |
| POST   | `/api/orders`     | Create a new order      |
| PUT    | `/api/users/:id`  | Update user information |

## Component Breakdown

### App.js

- Main entry point for the application.
- Uses `BrowserRouter`, `Routes`, and `Route` from `react-router-dom` for routing.
- Renders different components (e.g., `Shop`, `Product`, `LoginSignup`, `Cart`) based on the URL path.

### LoginSignup.jsx

- Handles user login and registration functionality.
- Uses `useState` to toggle between login and signup modes and `fetch` to send POST requests to the server for authentication.

### Product.jsx

- Displays details of a specific product based on the `productId` from the URL.
- Fetches data from the `ShopContext` using `useContext` and `useParams` to get the product ID.

### ShopCategory.jsx

- Displays products within a specific category.
- Uses `useContext` to access `all_products` and filter products based on the current category.

### ShopContext.jsx

- Provides global state management for product data and cart items using `useState` and `useEffect`.
- Handles adding/removing products from the cart and synchronizing with the server if the user is logged in.

### RelatedProducts.jsx

- Displays a list of products related to the currently viewed product.
- Uses the `Item` component to display each product's details (name, image, price).

### ProductDisplay.jsx

- Displays detailed information about a specific product, including images, price, description, rating, and size options.
- Allows users to add products to their cart using the `ShopContext`.

### Popular.jsx

- Displays popular products within the "Women's" category.
- Fetches popular product data from an API and displays it using the `Item` component.

---

## Usage of Context and State

- `ShopContext` manages the global state for products and the shopping cart. It provides functions for adding/removing products from the cart and updates the cart in real-time.
- `useState` and `useEffect` are used throughout the components to manage local component state (e.g., form inputs, fetched data) and side effects (e.g., fetching data on component mount).

---

## Routing

- You're using `React Router` for client-side routing, defining paths such as `/mens`, `/womens`, `/kids`, `/product/:productId`, and `/cart`.
- These routes map to different pages and render components like the product list, category-specific pages, individual product pages, and the cart.
