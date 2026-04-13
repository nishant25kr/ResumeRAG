import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  KeyRound, 
  Mail, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Lock
} from "lucide-react";
import { toast } from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

        try {
            const res = await axios.post(
                `${backendURL}/api/user/login`,
                { email, password },
                { withCredentials: true }
            );

            if (res.status === 200) {
                localStorage.setItem("User", JSON.stringify(res.data.user));
                toast.success("Welcome back, Captain!");
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Authentication failed");
            setErrors({ general: "Invalid credentials" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md relative z-10"
            >
                {/* Brand Logo Header */}
                <div className="text-center mb-12">
                   <motion.div 
                     whileHover={{ rotate: 5 }}
                     className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                   >
                      <Zap className="w-8 h-8 text-white fill-current" />
                   </motion.div>
                   <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                     Access Control
                   </h1>
                   <p className="text-gray-500 dark:text-gray-400 font-medium italic">
                     Authentication required for executive dashboard
                   </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-500">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                              Institutional Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@corp.ai"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                              Security Key
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                    <KeyRound className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:bg-gray-800 dark:hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:scale-95 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Verify & Enter <ChevronRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-4 text-xs font-bold text-gray-400 tracking-wider">
                       <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 256-BIT AES</div>
                       <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                       <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> RSA-4096</div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-bold transition-colors">
                      Trouble signing in? Contact IT Support
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
