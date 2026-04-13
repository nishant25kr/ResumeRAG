import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "./context/ThemeContext"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Resumes from "./components/Resumes"
import ResumePDF from "./components/ResumePDF"

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/resumes" element={<PageTransition><Resumes /></PageTransition>} />
        <Route path="/resumes/pdf/:id" element={<PageTransition><ResumePDF /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
