# Demo E-Commerce Application

This is a fully functional e-commerce application built with **Next.js**, leveraging **GraphQL** for data fetching and **Redux Toolkit** for state management.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the Repository:**

```bash
git clone <repository-url>

cd <repository-folder>
```

2. **Install Dependencies:** Use npm or yarn to install the necessary libraries.

```python
npm install

# or

yarn install
```

3.**Run the Application:** Start the development server:

```python
npm run dev

# or

yarn dev
```

Open your browser and navigate to http://localhost:3000 to view the application.

## Libraries Used
1. **apollo/client:** For handling GraphQL queries and state management.
2. **reduxjs/toolkit:** To simplify state management with Redux.
3. **graphql:** The query language for your API.
4. **next:** The React framework for server-side rendering and static site generation.
5. **react:** JavaScript library for building user interfaces.
6. **react-dom:** Provides methods to interact with the DOM.
7. **react-redux:** Official React bindings for Redux

## Design Decisions

This application is structured using a component-based architecture, promoting reusability and maintainability. The product details page includes functionality for selecting variations (size and color) and handling a shopping cart, ensuring a seamless user experience.

State management is achieved through Redux Toolkit, which allows for a centralized store that maintains the authentication state and cart items. Apollo Client is utilized for fetching data via GraphQL, offering efficient data management and caching.

Overall, this application emphasizes performance, usability, and a responsive design, making it a robust solution for e-commerce needs.


## License

[MIT](https://choosealicense.com/licenses/mit/)
