# Admin Panel - MERN Project

## Overview

This is the Admin panel for our fullstack MERN project. The Admin panel is built with **React** and is used for managing product administration within the webshop. It includes features such as adding new products, displaying a list of products, and handling product deletions. The application uses **React Router** for navigation between different views and **Vite** as the development server.

## Project Structure

The Admin panel codebase is organized as follows:

- **components/** - Contains all the React components for the admin interface.
- **pages/** - Main pages handling different functionalities like adding products and displaying product lists.

## Key Features

### AddProduct Component

- A form-based component for adding new products to the webshop.
- Users can input product details such as name, category, price, and upload a product image.
- The component handles the image upload and then sends the product details to the backend for further processing and storage in the database.

**Functions:**

- `imageHandler`: Manages the file upload for the product image.
- `changeHandler`: Updates the state with user input for product details.
- `Add_product`: An asynchronous function that handles the API request for uploading the image and then sending product information to the backend.

### ListProduct Component

- Fetches and displays a list of products from the backend API.
- Shows product image, name, old price, new price, category, and includes a delete icon.
- Provides a delete functionality to remove products from the list, with immediate UI update without needing to refetch data.

**Features:**

- Fetches product data on the initial render using `useEffect`.
- Displays a loading indicator while data is being fetched.
- Handles errors for both fetching and deleting products.

### Navbar Component

- Represents the top navigation bar of the application.
- Displays a logo and a profile picture.

### Sidebar Component

- Represents the navigation menu in the admin panel.
- Includes links for adding a new product and viewing the product list.

### Admin Component

- Manages the layout for the admin dashboard.
- Includes the Sidebar for navigation and routes for handling products:
  - `AddProduct`: Page for adding new products.
  - `ListProduct`: Page for listing all products.

## Scripts

Here are the key npm scripts available in the `package.json`:

- **`dev`**: Starts the development server using Vite.
- **`build`**: Builds the project for production using Vite.
- **`lint`**: Runs ESLint to check for code issues.
- **`preview`**: Previews the built project using Vite.

## Dependencies

The main dependencies used in this Admin panel are:

- **React**: v18.3.1
- **React DOM**: v18.3.1
- **React Router DOM**: v6.27.0

**DevDependencies**:

- **Vite**: v5.4.8
- **ESLint**: v9.11.1 with plugins for React and React hooks
