import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Clock, Sun, Moon, MessageCircle } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Bar with Clinic Logistics */}
      <div className="bg-[#094A45] text-slate-100 text-xs py-2 px-4 sm:px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="tel:+96566391083" className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
              <Phone size={13} className="text-luxury-gold shrink-0" />
              <span>+965 6639 1083</span>
            </a>
            <a href="https://wa.me/96566391083" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
              <MessageCircle size={13} className="text-emerald-400 shrink-0" />
              <span>WhatsApp Inquiries</span>
            </a>
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin size={13} className="text-luxury-gold shrink-0" />
              <span>MedC, Shaab Al Bahari, Kuwait</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Clock size={13} className="text-luxury-gold shrink-0" />
              <span>Sat - Thu: 9:00 AM - 9:00 PM</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Clinic Open
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md border-b border-slate-100 dark:border-slate-800 py-3' 
          : 'bg-white dark:bg-slate-950 border-b border-slate-50 dark:border-slate-900 py-4.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo with Luxurious Typography */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary-teal border border-teal-600/30 overflow-hidden shadow-md">
              <span className="text-white font-display font-bold text-lg tracking-tight">DF</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </div>
            <div className="text-left">
              <h1 className="font-display font-extrabold text-base tracking-normal text-slate-800 dark:text-white flex items-center gap-1">
                Dr. Fiza
                <span className="text-luxury-gold font-normal text-xs font-serif italic">Orthodontist</span>
              </h1>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold block leading-none">
                Cosmetic Dentistry
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              Services
            </button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              Smile Gallery
            </button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              Reviews
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              FAQs
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary-teal dark:hover:text-teal-400 transition-colors py-1.5 relative group">
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-primary-teal hover:bg-teal-50/50 dark:hover:bg-teal-950/20 transition-all border border-slate-100 dark:border-slate-800"
              aria-label="Toggle visual mode"
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Call Action */}
            <a 
              href="tel:+96566391083" 
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50/50 dark:hover:bg-teal-950/25 transition-all text-xs font-bold"
              title="Call Clinic"
            >
              <Phone size={15} />
            </a>

            {/* Book Button */}
            <button 
              onClick={() => scrollToSection('appointment')}
              className="bg-primary-teal hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-700/10"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Small screen Theme switch */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="flex items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 bg-slate-950/60 backdrop-blur-sm lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute top-[110px] left-4 right-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 py-6 px-5 flex flex-col gap-6 shadow-2xl transform transition-transform duration-500 ease-out ${
            isOpen ? 'translate-y-0' : '-translate-y-12'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-3 text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              Home
              <span className="text-xs text-slate-400">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              About Clinic
              <span className="text-xs text-slate-400">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              Dental Services
              <span className="text-xs text-slate-400">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              Smile Gallery
              <span className="text-xs text-slate-400">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('reviews')} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              Patient Reviews
              <span className="text-xs text-slate-400">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              Clinic FAQs
              <span className="text-xs text-slate-400">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-left py-2 border-b border-slate-50 dark:border-slate-800/50 hover:text-primary-teal flex justify-between items-center"
            >
              Contact Us
              <span className="text-xs text-slate-400">→</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-slate-100 dark:border-slate-800/80 pt-4">
            <a 
              href="https://wa.me/96566391083" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all"
            >
              <MessageCircle size={15} />
              WhatsApp: +965 6639 1083
            </a>
            <a 
              href="tel:+96566391083" 
              className="flex justify-center items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Phone size={14} />
              Call Clinic: +965 6639 1083
            </a>
            <button 
              onClick={() => scrollToSection('appointment')}
              className="bg-primary-teal hover:bg-teal-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-700/15"
            >
              Book Online Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
