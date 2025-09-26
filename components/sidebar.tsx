'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ThemeSwitch from './theme-switch';
import { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Wrench, 
  Menu, 
  X 
} from 'lucide-react';
import { name, avatar } from 'lib/info';

const navItems = {
  '/': {
    name: 'Home',
    icon: Home,
    description: 'Back to homepage'
  },
  '/about': {
    name: 'About',
    icon: User,
    description: 'Learn more about me'
  },
  '/projects': {
    name: 'Projects',
    icon: Briefcase,
    description: 'View my work'
  },
  '/tools': {
    name: 'Tools',
    icon: Wrench,
    description: 'Tech stack & tools'
  },
};

function Logo() {
  return (
    <Link 
      aria-label="Hericles Bitencourt Rocha" 
      href="/"
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <Image 
          alt={name}
          className="relative rounded-full shadow-xl border-4 border-white/20 dark:border-zinc-700/40"
          src={avatar}
          width={72}
          height={72}
          priority
        />
      </motion.div>
    </Link>
  );
}

function MobileMenuToggle({ isOpen, setIsOpen }) {
  return (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="md:hidden relative z-50 p-3 rounded-xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/90 transition-colors duration-200"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle menu"
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X size={20} className="text-zinc-800" />
        ) : (
          <Menu size={20} className="text-zinc-800" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default function Navbar() {
  let pathname = usePathname() || '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-[280px] md:flex-shrink-0 font-sans">
        <motion.div 
          className={clsx(
            "lg:sticky lg:top-8 transition-all duration-300",
            scrolled ? "lg:top-4" : "lg:top-8"
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo Section */}
          <div className="mb-8 px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Logo />
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Hericles Bitencourt
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 shadow-xl">
              <LayoutGroup>
                {Object.entries(navItems).map(([path, { name, icon: Icon, description }], index) => {
                  const isActive = path === pathname;
                  return (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        href={path}
                        className={clsx(
                          'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group mb-1',
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                        )}
                        title={description}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200/20 dark:border-blue-400/20"
                            layoutId="activeTab"
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        
                        <Icon 
                          size={18} 
                          className="relative group-hover:scale-110 transition-transform duration-200" 
                        />
                        
                        <div className="relative flex-1">
                          <span className={clsx(
                            'font-medium',
                            isActive ? 'font-semibold' : ''
                          )}>
                            {name}
                          </span>
                          {!isActive && (
                            <div className="absolute left-0 top-full text-xs text-zinc-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {description}
                            </div>
                          )}
                        </div>

                        {isActive && (
                          <motion.div
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </LayoutGroup>
            </div>

            {/* Theme Switch */}
            <div className="mt-6 px-2">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Theme
                  </span>
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </nav>
        </motion.div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <Logo />
          <MobileMenuToggle isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 right-0 h-full w-80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-l border-white/20 z-40 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6 pt-20">
              <nav className="space-y-2">
                {Object.entries(navItems).map(([path, { name, icon: Icon, description }], index) => {
                  const isActive = path === pathname;
                  return (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={clsx(
                          'flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300',
                          isActive
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/20'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                        )}
                      >
                        <Icon size={20} />
                        <div>
                          <div className={clsx(
                            'font-medium',
                            isActive ? 'font-semibold' : ''
                          )}>
                            {name}
                          </div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    Theme Settings
                  </span>
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
