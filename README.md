# Portfolio MERN Stack Web App

A full-featured portfolio web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application showcases web development and data science projects with admin capabilities for content management.

## Features

- 🎨 Modern UI with Tailwind CSS and DaisyUI
- 🔐 Firebase Authentication for admin access
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 📂 Project portfolio with categories
- 📝 Admin dashboard for content management
- 📄 Resume download functionality
- 📬 Contact form
- 🔒 Secure API endpoints

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- Framer Motion
- Firebase Authentication
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Mongoose
- JWT Authentication

## Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js (v14.0.0 or higher)
* MongoDB (v4.0.0 or higher)
* Firebase account with a project set up
* Git

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-mern
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Create environment variables:

   Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/portfolio

   # Firebase Admin Configuration
   FIREBASE_PROJECT_ID=your-project-id
   GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
   ```

   Create a `.env` file in the frontend directory with the following variables:
   ```
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id

   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Set up Firebase:
   - Create a new project in Firebase Console
   - Enable Authentication with Google provider
   - Generate a service account key and save it securely
   - Update the environment variables with your Firebase configuration

5. Run the development server:
   ```bash
   # In the root directory
   npm run dev
   ```

   This will start both the backend server and the frontend development server.

## Project Structure

```
portfolio-mern/
├── frontend/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── utils/
├── backend/           # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── uploads/          # Project files storage
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs both frontend and backend in development mode
- `npm run server`: Runs only the backend server
- `npm run client`: Runs only the frontend server
- `npm run build`: Builds the frontend for production

## Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Set the environment variables in your production environment

3. Start the server:
   ```bash
   npm start
   ```

## Security

- All admin routes are protected with Firebase Authentication
- API endpoints for project management require valid Firebase ID tokens
- Environment variables are used for sensitive information
- CORS is configured for security
- Input validation and sanitization are implemented

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 