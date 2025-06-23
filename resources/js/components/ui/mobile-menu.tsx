import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { DynamicLogo } from './dynamic-logo';

interface NavItem {
  title: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  logoText?: string;
  logoType?: 'text_only' | 'icon_only' | 'text_with_icon';
  logoIcon?: string;
  logoIconType?: 'letter' | 'svg' | 'image';
  logoColor?: string;
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  navItems = [
    { title: 'Home', href: 'home' },
    { title: 'Services', href: 'services' },
    { title: 'Works', href: 'works' },
    { title: 'Skills', href: 'skills' },
    { title: 'Resume', href: 'resume' },
    { title: 'Testimonials', href: 'testimonials' },
    { title: 'Contact', href: 'contact' }
  ],
  logoText = 'Portfolio',
  logoType = 'text_with_icon',
  logoIcon = 'P',
  logoIconType = 'letter',
  logoColor = '#20B2AA'
}: MobileMenuProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsMounted(true);
    
    // Set active section based on current scroll position
    const handleScroll = () => {
      const sections = navItems.map(item => item.href);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300
      }
    })
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { 
      opacity: 0.6,
      transition: { duration: 0.3 }
    }
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Header with close button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800"
            >
              {/* Logo */}
              <DynamicLogo
                logoText={logoText}
                logoType={logoType}
                logoIcon={logoIcon}
                logoIconType={logoIconType}
                logoColor={logoColor}
                className="scale-90"
              />
              
              <motion.button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-900 dark:text-white" />
              </motion.button>
            </motion.div>

            {/* Menu items */}
            <div className="flex-1 flex flex-col px-6 py-8">
              <nav className="flex flex-col space-y-1 mb-12">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i}
                    variants={itemVariants}
                  >
                    <ScrollLink
                      to={item.href}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className={`flex items-center justify-between text-base font-medium cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 ${
                        activeSection === item.href 
                          ? 'text-[#20B2AA] bg-[#E6F7F6] dark:bg-[#20B2AA]/10' 
                          : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={onClose}
                    >
                      <span>{item.title}</span>
                      <motion.div
                        animate={activeSection === item.href ? { x: 0 } : { x: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ChevronRight className={`w-4 h-4 ${
                          activeSection === item.href 
                            ? 'opacity-100 text-[#20B2AA]' 
                            : 'opacity-50'
                        }`} />
                      </motion.div>
                    </ScrollLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                variants={itemVariants}
                custom={navItems.length}
                className="mt-auto"
              >
                <ScrollLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="cursor-pointer block"
                  onClick={onClose}
                >
                  <motion.button 
                    className="bg-[#20B2AA] hover:bg-[#1a9994] text-white w-full py-3.5 rounded-lg text-base font-medium transition-colors duration-300 shadow-md hover:shadow-lg shadow-[#20B2AA]/20 hover:shadow-[#20B2AA]/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Hire Me
                  </motion.button>
                </ScrollLink>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div 
              variants={itemVariants}
              custom={navItems.length + 1}
              className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-100 dark:border-gray-800"
            >
              &copy; {new Date().getFullYear()} {logoText}. All rights reserved.
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 