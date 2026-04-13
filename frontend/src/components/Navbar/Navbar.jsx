import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Sun, 
  Moon, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Menu,
  X,
  Zap
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode, toggleTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("User");
        setIsLoggedIn(false) 
        navigate("/");
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("User"));
        setIsLoggedIn(!!user);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Resumes', path: '/resumes', icon: FileText },
    ];

    return (
        <nav 
          aria-label="Main Navigation"
          className={`
            fixed top-0 left-0 w-full z-50 transition-all duration-500
            ${isScrolled 
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl py-2' 
                : 'bg-white dark:bg-gray-900 py-4'
            }
            border-b border-gray-100 dark:border-gray-800
        `}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <Link to="/" className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-gray-900 dark:text-white leading-none">
                                ResumeIQ
                            </h1>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">Hub</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        {isLoggedIn && navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all
                                    ${location.pathname === link.path 
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                                `}
                            >
                                <link.icon className="w-4 h-4" />
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side Actions */}
                    <div className="flex items-center space-x-2 lg:space-x-4">
                        {/* Theme Toggle */}
                        <button
                          onClick={toggleTheme}
                          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                          className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {isLoggedIn ? (
                            <div className="flex items-center space-x-2 lg:space-x-4 border-l border-gray-100 dark:border-gray-800 pl-4 lg:pl-4">
                                <button
                                    onClick={handleLogout}
                                    aria-label="Logout"
                                    className="p-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                                <div className="hidden sm:block">
                                   <div className="w-10 h-10 rounded-full border-2 border-indigo-600 p-0.5">
                                      <img 
                                        src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" 
                                        alt="User Avatar"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                   </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-gray-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button 
                          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          aria-expanded={isMobileMenuOpen}
                          aria-label="Toggle Menu"
                        >
                          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 space-y-2 animate-in slide-in-from-top duration-300">
                    {isLoggedIn && navLinks.map((link) => (
                        <Link 
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
                        >
                            <link.icon className="w-5 h-5 text-indigo-600" />
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
