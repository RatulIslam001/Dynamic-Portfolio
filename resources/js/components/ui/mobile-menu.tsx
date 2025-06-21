import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
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

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
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
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Logo */}
            <div className="px-8 mb-6">
              <DynamicLogo
                logoText={logoText}
                logoType={logoType}
                logoIcon={logoIcon}
                logoIconType={logoIconType}
                logoColor={logoColor}
              />
            </div>

            {/* Menu items */}
            <div className="flex-1 flex flex-col px-8">
              <nav className="flex flex-col space-y-6 mb-12">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i}
                    variants={itemVariants}
                    className="border-b border-gray-100 dark:border-gray-800 pb-4"
                  >
                    <ScrollLink
                      to={item.href}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="text-base font-medium cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#20B2AA] transition-colors block"
                      activeClass="!text-[#20B2AA]"
                      onClick={onClose}
                    >
                      {item.title}
                    </ScrollLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                variants={itemVariants}
                custom={navItems.length}
                className="mt-auto mb-6"
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
                  <button className="bg-[#20B2AA] hover:bg-[#1a9994] text-white w-full py-3 rounded-md text-base font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
                    Hire Me
                  </button>
                </ScrollLink>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {logoText}. All rights reserved.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 