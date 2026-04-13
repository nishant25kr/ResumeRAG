import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">
              ResumeIQ <span className="text-indigo-600">Hub</span>
            </h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              The Future of Talent Acquisition
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-end gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by Skillion Team
            </p>
            <p className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] mt-1">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
