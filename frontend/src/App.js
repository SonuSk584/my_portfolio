import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

// Loading component for suspense fallback
const Loading = () => (
  <div className="min-h-screen bg-secondary-dark flex items-center justify-center">
    <div className="text-white">Loading...</div>
  </div>
);

function App() {
  return (
    <div className="app bg-secondary min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-black to-accent/5"></div>
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;