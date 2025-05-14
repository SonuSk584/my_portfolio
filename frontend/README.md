# Modern Portfolio Website

A modern, responsive portfolio website built with React.js and styled with Tailwind CSS. This single-page application showcases my projects, skills, and provides a contact form powered by EmailJS.

## Features

- 🎨 Modern and clean UI design
- 🌓 Beautiful animations with Framer Motion
- 📱 Fully responsive layout
- 💼 Project showcase with detailed modal views
- 📬 Contact form integration with EmailJS
- ⚡ Fast performance and optimized build
- 🎯 SEO friendly
- 🚀 Easy deployment on Render

## Tech Stack

- React.js
- Tailwind CSS
- Framer Motion
- EmailJS
- React Icons
- React Router DOM

## Live Demo

Visit the live website: [Your Portfolio](https://portfolio-frontend-xxxx.onrender.com)

## Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js (v14.0.0 or higher)
* npm or yarn package manager
* EmailJS account for contact form functionality

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SonuSk584/my_portfolio.git
   cd my_portfolio
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create environment variables:
   Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   ```

4. Run the development server:
   ```bash
   npm start
   ```

## Project Structure

```
frontend/
├── public/           # Static files
└── src/
    ├── components/   # Reusable components
    ├── pages/       # Page components
    ├── data/        # Project data and constants
    └── assets/      # Images and other assets
```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Deployment on Render

1. Push your code to GitHub
2. Create a new Static Site on Render
3. Connect your GitHub repository
4. Configure the build settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
5. Add environment variables in Render dashboard
6. Deploy!

## Features in Detail

### Animated UI Components
- Smooth page transitions
- Interactive project cards
- Animated skill badges
- Typewriter effect for hero section

### Project Showcase
- Detailed project modals
- Live demo links
- GitHub repository links
- Technology tags

### Contact Form
- EmailJS integration
- Form validation
- Success/Error notifications
- Social media links

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 