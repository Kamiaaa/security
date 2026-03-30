'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi';
import Image from 'next/image';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change background when scrolled more than 50px
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle clicks outside of menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Load and apply dark mode from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/' },
    // {
    //   label: 'Facilities',
    //   dropdown: [
    //     { label: 'Health Center & Gym', href: '/' },
    //     { label: 'Restaurant', href: '/' },
    //     { label: 'Laboratories', href: '/' },
    //     { label: 'Lounges', href: '/' },
    //     { label: 'Billiards & Snooker', href: '/' },
    //     { label: 'Library', href: '/' },
    //   ],
    // },
    {
      label: 'Services',
      dropdown: [
        { label: 'Sales Engine', href: '/' },
        { label: 'AI Voice Assistant', href: '/' },
        { label: 'Inbound and Outbound Calls', href: '/' },
        { label: 'All-in-one CRM Platform', href: '/' },
        { label: 'Advanced Marketing Automation', href: '/' },
        { label: 'Multi-Channel Engagement', href: '/' },
        { label: 'Lead Tracking', href: '/' },
        { label: 'Smart Scheduling', href: '/' },
        { label: 'Brand Trust Management', href: '/' },
      ],
    },
    { label: 'Pricing', href: '/' },
    { label: 'Blog', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={`fixed top-0 h-16 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-blue-950 dark:bg-blue-900 shadow-lg'
          : 'bg-gray-900 dark:bg-gray-900'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          <Image
            className="h-16 w-auto py-2"
            src="/img/logo.png"
            alt="Logo"
            height={300}
            width={300}
          />
        </Link>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className={`text-3xl transition-colors ${isScrolled
                ? 'text-white'
                : 'text-gray-50 dark:text-white'
              }`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>

          <button
            className={`text-3xl transition-colors ${isScrolled
                ? 'text-white'
                : 'text-gray-50 dark:text-white'
              }`}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center gap-1 text-xl font-semibold hover:text-white dark:hover:text-white transition font-poppins ${isScrolled
                      ? 'text-white hover:text-gray-200 dark:hover:text-gray-200'
                      : 'text-gray-50 dark:text-white'
                    }`}
                >
                  {item.label}
                  <FiChevronDown className="mt-0.5 transform transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-0 hidden group-hover:block bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 w-80 z-40">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 font-poppins"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xl font-semibold hover:text-white dark:hover:text-white transition font-poppins ${isScrolled
                    ? 'text-white hover:text-gray-200 dark:hover:text-gray-200'
                    : 'text-gray-50 dark:text-white'
                  } ${pathname === item.href ? 'font-semibold' : ''}`}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Dark Mode Toggle for Desktop */}
          <button
            onClick={toggleDarkMode}
            className={`text-xl transition-colors ${isScrolled
                ? 'text-white'
                : 'text-white dark:text-white'
              }`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
        />
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-0 left-0 h-full w-full bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  className="h-16 w-auto"
                  src="/img/logo.png"
                  alt="Logo"
                  height={200}
                  width={200}
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 dark:text-white text-3xl"
                aria-label="Close Menu"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-4">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full text-left py-3 px-3 rounded-lg text-gray-800 dark:text-white text-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>{item.label}</span>
                      <FiChevronDown
                        className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 text-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-3 rounded-lg text-xl font-medium transition-colors ${pathname === item.href
                        ? 'text-gray-800 dark:text-gray-100 font-semibold' // Changed to text color only
                        : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Dark Mode Toggle in Mobile Menu */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                toggleDarkMode();
              }}
              className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              <span className="mr-2">
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </span>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;