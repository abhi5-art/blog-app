# Full-Stack Blog Application (MERN)

A complete multi-user blogging platform built with the MERN stack, featuring secure authentication, CRUD operations, and modern UI/UX design.

## 🚀 Features

### Frontend
- **Authentication & Authorization** - Secure user registration/login with JWT
- **Blog Management** - Create, read, update, and delete blog posts
- **Advanced Search** - Search and filter blogs with pagination
- **Email Integration** - User verification and password recovery
- **Responsive Design** - Modern UI built with React-Bootstrap

### Backend
- **RESTful API** - Scalable and well-documented backend
- **File Upload** - Image handling with Cloudinary integration
- **Email Service** - SendGrid integration for transactional emails
- **Data Validation** - Request validation using express-validator
- **Pagination** - Efficient data loading (10 items per page initially)

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework with virtual DOM for performance
- **Axios** - Promise-based HTTP client for API calls
- **React Router DOM** - Client-side route management
- **React Toastify** - User notification system
- **React Bootstrap** - UI components and modals

### Backend
- **Node.js** - Runtime environment (non-blocking, event-driven I/O)
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for scalable data storage
- **JWT** - Secure authentication tokens
- **Cloudinary** - File and image management
- **SendGrid** - Email delivery service


## 🏗️ Architecture Decisions

### Why React.js?
- Provides state-of-the-art functionality and excellent developer experience
- Enables building complex UI interactions that communicate efficiently with the server
- Virtual DOM ensures high performance with JavaScript-driven pages

### Why Node.js/Express?
- Non-blocking, event-driven I/O for lightweight and efficient performance
- Ideal for data-intensive real-time applications
- Excellent for building scalable RESTful APIs

### Key Implementation Choices
- **Pagination**: Implemented to load data efficiently (10 items initially) instead of loading all data at once
- **Authentication**: Comprehensive auth system including user verification and password recovery
- **Scalability**: Modular architecture allowing easy feature additions and maintenance

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account (for image storage)
- SendGrid account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blog-app.git
   ```
2. **Frontend Setup**
   ```bash
   cd blog-app
   npm install
   cp .env.example .env
   # Add your environment variables in .env
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd blog-app
   cd server
   npm install
   cp .env.example .env
   # Add your environment variables in .env
   npm start
   ```
