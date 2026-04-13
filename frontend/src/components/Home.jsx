import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  ArrowUpRight,
  Sparkles,
  Lock,
  Globe,
  PieChart
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-[140px] animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto px-6 py-20 lg:py-32 min-h-[90vh]">
          {/* Left Content */}
          <div className="flex-1 lg:pr-12 text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 mb-8 mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">Next-Gen Talent Intelligence</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tighter"
            >
              Hiring, <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                Accelerated.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              ResumeIQ Hub is the world's first RAG-powered recruitment engine. 
              Find your next 10x developer from a million resumes in milliseconds.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16"
            >
              <Link 
                to="/login"
                className="group relative px-10 py-5 bg-gray-900 dark:bg-indigo-600 text-white rounded-[2rem] font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-200 dark:shadow-none"
              >
                <div className="relative z-10 flex items-center gap-2">
                  Launch Portal <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <button className="px-10 py-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white rounded-[2rem] font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                Request Demo
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <Globe className="w-8 h-8 text-gray-400" />
              <div className="h-6 w-px bg-gray-200"></div>
              <Activity className="w-8 h-8 text-gray-400" />
              <div className="h-6 w-px bg-gray-200"></div>
              <ShieldCheck className="w-8 h-8 text-gray-400" />
            </motion.div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="flex-1 mt-20 lg:mt-0 relative w-full max-w-2xl">
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                {/* Main Card Reveal */}
                <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4">
                      <Zap className="w-8 h-8 text-indigo-500 animate-pulse" />
                   </div>
                   <div className="space-y-6">
                      <div className="w-20 h-2 bg-indigo-100 dark:bg-gray-700 rounded-full"></div>
                      <div className="w-full h-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"></div>
                      <div className="w-3/4 h-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"></div>
                      <div className="pt-8 grid grid-cols-2 gap-4">
                          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                             <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">99.8%</p>
                             <p className="text-[10px] uppercase font-bold text-gray-400">Precision</p>
                          </div>
                          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl">
                             <p className="text-2xl font-black text-rose-600 dark:text-rose-400">~2ms</p>
                             <p className="text-[10px] uppercase font-bold text-gray-400">Latency</p>
                          </div>
                      </div>
                   </div>
                   
                   {/* Floating Tooltip */}
                   <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute -bottom-4 -right-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-6 rounded-3xl shadow-2xl rotate-3"
                   >
                      <p className="text-xs font-bold leading-tight">AI Agent <br />Analyzing Pipeline...</p>
                   </motion.div>
                </div>
              </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   {
                     icon: Lock,
                     title: "Enterprise Shield",
                     desc: "Military-grade encryption for candidate data with role-based access control.",
                     color: "text-blue-600"
                   },
                   {
                     icon: PieChart,
                     title: "Deep Analytics",
                     desc: "Understand skill gaps and candidate potential through 5D vector analysis.",
                     color: "text-purple-600"
                   },
                   {
                     icon: Globe,
                     title: "Global Search",
                     desc: "Unified search across all your document stores and third-party integrations.",
                     color: "text-emerald-600"
                   }
                 ].map((feature, idx) => (
                   <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="group flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all"
                   >
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gray-900 dark:group-hover:bg-indigo-600 transition-colors">
                        <feature.icon className={`w-8 h-8 ${feature.color} group-hover:text-white transition-colors`} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      </motion.div>

      {/* Admin Access Panel */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 mb-24"
      >
        <div className="relative p-12 bg-indigo-600 rounded-[3rem] overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                  <h2 className="text-4xl font-black text-white mb-4">Ready to scale?</h2>
                  <p className="text-indigo-100 text-lg font-medium max-w-md">
                    Join 500+ top enterprises using ResumeIQ Hub to build their future teams today.
                  </p>
              </div>
              <div className="flex gap-4">
                 <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                    Get Started <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
