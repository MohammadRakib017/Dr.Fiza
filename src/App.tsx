import { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Clock, ChevronRight, Star, 
  ShieldCheck, Activity, Award, Heart, Sparkles, CheckCircle2,
  ChevronDown, Search, ArrowRight, Instagram, MessageCircle, 
  Map, Smile, Info, Check, Calendar, ThumbsUp, AlertCircle, X
} from 'lucide-react';
import Header from './components/Header';
import { AppointmentForm, SmileForm, ContactForm } from './components/Forms';
import { SERVICES, TESTIMONIALS, FAQS } from './data';
import { Service } from './types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFormTab, setActiveFormTab] = useState<'appointment' | 'assessment' | 'message'>('appointment');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('Clear Aligners');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  
  // Before & After Gallery active tab
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>('Smile Makeovers');

  // Testimonial slide index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Smooth back to top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Counters simulation
  const [counters, setCounters] = useState({
    patients: 4950,
    transformations: 1280,
    years: 1,
    emergencyCases: 820
  });

  // Load and apply theme on start
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Staggered counter increment
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        patients: Math.min(5200, prev.patients + 8),
        transformations: Math.min(1400, prev.transformations + 4),
        years: Math.min(15, prev.years + 1),
        emergencyCases: Math.min(900, prev.emergencyCases + 3)
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Filter 21 services based on search & category
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const serviceCategories = ['All', 'Orthodontics', 'Cosmetic Dentistry', 'Comprehensive Care', 'Emergency & Specialized'];

  const handleBookingRedirect = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
    setActiveFormTab('appointment');
    const formElement = document.getElementById('conversion-hub');
    if (formElement) {
      const headerOffset = 110;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Image source mappings for Gallery Before & After items
  const galleryItems: { [key: string]: { before: string; after: string; desc: string; duration: string } } = {
    'Smile Makeovers': {
      before: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600&auto=format&fit=crop', // raw treatment clinic focus
      after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop', // beautiful aligned teeth
      desc: 'Complete restoration utilizing high-end custom porcelain veneers and teeth spacing realignment.',
      duration: 'Only 3 Weeks'
    },
    'Braces': {
      before: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop', // serious smile
      after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop', // happy radiant smile
      desc: 'Severe crowding and bite irregularities treated with aesthetic clear ceramic braces.',
      duration: '14 Months'
    },
    'Clear Aligners': {
      before: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', // modest closed lips
      after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', // wide beam smile
      desc: 'Mild misalignment and canine rotation corrected invisibly using premium Invisalign aligners.',
      duration: '8 Months'
    },
    'Teeth Whitening': {
      before: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop', // slight staining context
      after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop', // bright white dazzling smile
      desc: 'Clinical laser teeth whitening eliminating deep food and beverage stains.',
      duration: '45 Minute Session'
    },
    'Veneers': {
      before: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=600&auto=format&fit=crop', // neutral face
      after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', // gorgeous premium model smile
      desc: 'Symmetrical tooth resizing and shade replacement utilizing custom ultra-thin feldspathic porcelain.',
      duration: '2 Dental Visits'
    },
    'Dental Implants': {
      before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop', // missing tooth gap representation
      after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', // strong natural masculine smiling portrait
      desc: 'Dental implant restoration to substitute a missing molar with a highly stable medical-grade titanium post.',
      duration: '4 Months'
    }
  };

  return (
    <div className="min-h-screen bg-bg-light text-dark-text font-sans antialiased selection:bg-primary-teal selection:text-white transition-colors duration-300 dark:bg-[#071111] dark:text-slate-100">
      
      {/* Dynamic Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none grid-pattern dark:dark-grid-pattern opacity-80" />

      {/* HEADER COMPONENT */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-16 md:py-24 overflow-hidden">
        {/* Full-width elegant clinic interior with dental experts overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.95] dark:brightness-[0.22] transition-all duration-300"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />
        {/* Gradients blending into the background theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-light/95 via-bg-light/80 to-transparent dark:from-[#071111]/98 dark:via-[#071111]/85 dark:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-light dark:from-[#071111] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Trust Seal Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800/60 text-xs font-semibold text-primary-teal dark:text-teal-400">
              <ShieldCheck size={14} className="text-luxury-gold shrink-0 animate-pulse" />
              <span>Leading Orthodontist & Cosmetic Specialist in Kuwait</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-800 dark:text-white leading-[1.1] tracking-tight">
              Your Beautiful <br />
              <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Smile Starts Here</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Providing advanced orthodontics, luxury cosmetic dentistry, and complete clinical care. Experience a customized, comfortable treatment plan guided by Dr. Fiza at MedC, Shaab Al Bahari.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => {
                  setActiveFormTab('appointment');
                  document.getElementById('conversion-hub')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="h-12 inline-flex items-center justify-center px-6 bg-primary-teal hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-teal-700/15"
              >
                Book Appointment
              </button>
              
              <a 
                href="https://wa.me/96566391083" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-12 inline-flex items-center justify-center gap-2 px-5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/10"
              >
                <MessageCircle size={15} />
                WhatsApp Chat
              </a>

              <a 
                href="tel:+96566391083" 
                className="h-12 inline-flex items-center justify-center gap-2 px-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>

            {/* Micro-Credentials Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md">
              <div className="space-y-1">
                <span className="block text-luxury-gold font-serif italic text-lg font-bold leading-none">15+ Years</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Expertise in Kuwait</span>
              </div>
              <div className="space-y-1">
                <span className="block text-primary-teal dark:text-teal-400 text-lg font-bold leading-none">5,200+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Symmetrical Smiles</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="block text-slate-800 dark:text-white text-lg font-bold leading-none flex items-center gap-1">
                  5.0 <Star size={13} className="fill-luxury-gold text-luxury-gold shrink-0" />
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Trusted Reviews</span>
              </div>
            </div>

          </div>

          {/* Luxury Graphic Banner / Interactive Highlight (Right Column) */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              <img 
                src="/src/assets/images/dr_fiza_portrait_1784384771393.jpg" 
                alt="Dr. Fiza Orthodontist Consultation" 
                className="w-full h-[450px] object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-luxury-gold">Pristine Clinical Care</p>
                <h3 className="font-display font-bold text-xl mt-1">Dr. Fiza Clinic</h3>
                <p className="text-xs text-slate-200 mt-1 leading-normal">MedC, Shaab Al Bahari. Outfitted with state-of-the-art diagnostic digital equipment.</p>
              </div>
            </div>

            {/* Absolute Decorative Gold Accent Ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-luxury-gold/30 -z-0" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-teal-500/5 -z-0 blur-xl" />
          </div>

        </div>
      </section>

      {/* INTERACTIVE COUNTERS & TRUST BANNER */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80 py-8 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-extrabold text-primary-teal dark:text-teal-400 font-mono">
                {counters.patients.toLocaleString()}+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Happy Patients
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-extrabold text-luxury-gold font-mono">
                {counters.transformations.toLocaleString()}+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Smile Makeovers
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white font-mono">
                {counters.years} Years
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Expertise in Kuwait
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-extrabold text-primary-teal dark:text-teal-400 font-mono">
                {counters.emergencyCases}+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Urgent Emergencies Resolved
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE DR. FIZA */}
      <section id="why-choose-us" className="py-20 md:py-24 bg-bg-light dark:bg-[#071111]/40 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          
          <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">Why Choose Dr. Fiza</span>
          <div className="accent-line mx-auto mt-2.5 mb-4"></div>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
            Advanced Orthodontics & <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Patient-First Care</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-3 mb-12">
            Every patient deserves a radiant, healthy smile. We combine 15+ years of specialized orthodontic clinical training with comfortable medical techniques.
          </p>

          {/* Grid Cards (9 items requested) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {[
              { title: "Experienced Dentist", desc: "15+ years specializing in complex orthodontics and artistic cosmetic dentistry, delivering premium results in Kuwait.", icon: "Award" },
              { title: "Advanced Technology", desc: "Equipped with state-of-the-art 3D intraoral diagnostic scanning, low-radiation digital radiography, and digital bite modeling.", icon: "Activity" },
              { title: "Pain-Free Treatment", desc: "Prioritizing your physical peace of mind with gentle, micro-invasive tools and localized customized comfort parameters.", icon: "Smile" },
              { title: "Personalized Care", desc: "We design highly customized treatment paths mapped specifically to your organic facial features and aesthetic aspirations.", icon: "Heart" },
              { title: "Modern Equipment", desc: "Fully outfitted with the industry's finest ergonomic dental chairs, high-precision lasers, and quiet dental handpieces.", icon: "Sparkles" },
              { title: "Sterile Environment", desc: "Exacting multi-stage hospital-grade chemical and heat sterilization protocols to guarantee absolute safety and hygiene.", icon: "ShieldCheck" },
              { title: "Emergency Dental Care", desc: "Immediate same-day emergency triage and instant pain-reduction therapies for all acute dental toothaches.", icon: "Phone" },
              { title: "Beautiful Smile Transformations", desc: "Artistic alignment and cosmetic shade adjustments configured to align seamlessly with your facial symmetry.", icon: "Gem" },
              { title: "Patient-Centered Treatment", desc: "No rushed consults. We listen carefully and explain every step transparently to build lifelong trust.", icon: "ThumbsUp" }
            ].map((item, index) => {
              return (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary-teal/20 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center text-primary-teal dark:text-teal-400 mb-5 group-hover:bg-primary-teal group-hover:text-white transition-all duration-300">
                    <Star size={20} className="text-luxury-gold shrink-0 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary-teal dark:group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* DENTAL SERVICES SECTION */}
      <section id="services" className="py-20 md:py-24 bg-white dark:bg-slate-950 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">Premium Dental Solutions</span>
            <div className="accent-line mx-auto mt-2.5 mb-4"></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
              Clinical & <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Cosmetic Specialty Services</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-3 mb-10">
              Browse through our 21 clinical, aesthetic, and orthodontic dental specialties. Refine by category or use the interactive smart search below.
            </p>
          </div>

          {/* Interactive Search & Category Filter Controls */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 mb-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search services (e.g. Aligners, Veneers)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white outline-none focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all"
              />
              <Search size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Categories Horizontal Slider */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-primary-teal text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {category.replace(' Dentistry', '').replace(' Care', '')}
                </button>
              ))}
            </div>

          </div>

          {/* Grid Layout of Services */}
          {filteredServices.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
              <AlertCircle size={32} className="text-luxury-gold mx-auto mb-3 animate-bounce" />
              <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-white">No Services Found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                We couldn't find any services matching "<span className="font-semibold text-primary-teal dark:text-teal-400">{searchQuery}</span>". Try refining your search query.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 bg-primary-teal hover:bg-teal-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => {
                return (
                  <div 
                    key={index} 
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-primary-teal/30 transition-all duration-300 shadow-sm relative group"
                  >
                    <div>
                      {/* Premium Icon Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100/30 flex items-center justify-center text-primary-teal dark:text-teal-400">
                          <Activity size={16} className="text-luxury-gold" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full">
                          {service.category.replace(' Dentistry', '')}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white">
                        {service.name}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2.5 line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-6 mt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                      <button 
                        onClick={() => setSelectedServiceDetail(service)}
                        className="flex-1 h-9 inline-flex items-center justify-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Learn More
                      </button>
                      <button 
                        onClick={() => handleBookingRedirect(service.name)}
                        className="flex-1 h-9 inline-flex items-center justify-center bg-primary-teal hover:bg-teal-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Book Slot
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* DETAILED SERVICE OVERLAY DIALOG / MODAL */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in text-left">
            <button 
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute top-5 right-5 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-primary-teal dark:text-teal-400">
                <Star size={22} className="text-luxury-gold" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-gold block">{selectedServiceDetail.category}</span>
                <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white">{selectedServiceDetail.name}</h3>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              {selectedServiceDetail.description}
            </p>

            <div className="mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Expected Treatment Timeline:</span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-primary-teal dark:text-teal-400">
                <Clock size={13} className="text-luxury-gold" />
                {selectedServiceDetail.duration}
              </span>
            </div>

            <div className="mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Core Clinical Benefits:</span>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {selectedServiceDetail.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedServiceDetail(null)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl transition-all font-semibold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-700"
              >
                Close Window
              </button>
              <button 
                onClick={() => {
                  handleBookingRedirect(selectedServiceDetail.name);
                  setSelectedServiceDetail(null);
                }}
                className="flex-1 bg-primary-teal hover:bg-teal-700 text-white py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-700/15"
              >
                Book This Treatment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT DR. FIZA */}
      <section id="about" className="py-20 md:py-24 bg-slate-50 dark:bg-[#071111]/40 border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Portrait Placeholder Side (Left Column) */}
            <div className="lg:col-span-5 space-y-6 text-left relative">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-xl bg-white dark:bg-slate-900">
                <img 
                  src="/src/assets/images/dr_fiza_portrait_1784384771393.jpg" 
                  alt="Dr. Fiza - Orthodontics & Cosmetic Dentistry Specialist" 
                  className="w-full h-[400px] object-cover object-top hover:scale-105 transition-transform duration-500 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold tracking-wider text-luxury-gold">Dr. Fiza, DDS, MSD</span>
                  <span className="text-[10px] uppercase font-bold py-1 px-2.5 rounded bg-black/80 border border-white/10">MedC Shaab Al Bahari</span>
                </div>
              </div>

              {/* Patient Philosophy Box */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center shrink-0">
                  <Heart size={20} className="text-primary-teal dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider">Patient-First Philosophy</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">Comfort-driven, anxiety-free dentistry where we prioritize your complete diagnostic peace of mind.</p>
                </div>
              </div>
            </div>

            {/* Narrative Content Side (Right Column) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">About Dr. Fiza</span>
              <div className="accent-line mb-2"></div>
              
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
                Meet Dr. Fiza, <br />
                <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Orthodontist & Aesthetic Creator</span>
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                With over 15 years of certified expertise, Dr. Fiza is one of Kuwait's premier providers of luxury cosmetic dentistry and modern clinical orthodontics. We believe a smile makeover is not just a treatment—it is a tailored architectural blueprint engineered specifically to highlight your facial symmetry and organic beauty.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Our clinic located at the state-of-the-art **MedC in Shaab Al Bahari** merges clinical precision with a tranquil, elegant environment. Backed by 3D digital examinations, computerized bite alignment, and sterile surgical suites, we ensure children, adults, and international professionals experience high-end dental mastery.
              </p>

              {/* Core Attributes Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary-teal dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Orthodontic Expertise</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-normal">Clinical master of braces, clear aligners, and growth guidance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary-teal dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Aesthetic Customization</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-normal">Artistically crafted veneers, whitening, and full makeovers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary-teal dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Advanced Dental Tech</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-normal">3D scans, digital alignment simulations, and clinical lasers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary-teal dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Comfortable Atmosphere</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-normal">Gentle pain-free care designed to reduce clinical anxiety.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-left">
                <button 
                  onClick={() => document.getElementById('conversion-hub')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="bg-primary-teal hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
                >
                  Schedule A Private Consultation
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SMILE BEFORE & AFTER GALLERY */}
      <section id="gallery" className="py-20 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">Smile transformations</span>
            <div className="accent-line mx-auto mt-2.5 mb-4"></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
              Clinical & <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Aesthetic Gallery</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-3">
              Witness the power of precision dental alignments. Toggle through our specialist tabs below to view real smile results.
            </p>
          </div>

          {/* Gallery Category Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 max-w-2xl mx-auto">
            {Object.keys(galleryItems).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveGalleryTab(tab)}
                className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeGalleryTab === tab
                    ? 'bg-primary-teal text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Comparison Frame */}
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Before Case Frame */}
              <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                <img 
                  src={galleryItems[activeGalleryTab].before} 
                  alt={`${activeGalleryTab} before treatment`} 
                  className="w-full h-72 object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                  Initial Case
                </div>
              </div>

              {/* After Case Frame */}
              <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                <img 
                  src={galleryItems[activeGalleryTab].after} 
                  alt={`${activeGalleryTab} after treatment`} 
                  className="w-full h-72 object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-emerald-600/95 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                  Transformed Smile
                </div>
              </div>

            </div>

            {/* Gallery Item Details Copy */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-luxury-gold">Clinical Profile Summary</span>
                <h4 className="font-display font-bold text-slate-800 dark:text-white text-base">
                  {activeGalleryTab} Custom Realignment
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {galleryItems[activeGalleryTab].desc}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shrink-0 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Treatment Duration</span>
                <span className="text-primary-teal dark:text-teal-400 font-bold text-sm">{galleryItems[activeGalleryTab].duration}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LUXURY FULL WIDTH APPOINTMENT CTA */}
      <section className="bg-primary-teal text-white py-16 relative overflow-hidden text-center transition-all">
        {/* Abstract vector shape overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E] to-[#0A4A45]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">Transform your dental health</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-none text-white">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Get early dental screening, correct crowded alignment, or request a complete cosmetic assessment today from Dr. Fiza in Kuwait.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto pt-4">
            <button
              onClick={() => {
                setActiveFormTab('appointment');
                document.getElementById('conversion-hub')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="w-full sm:w-auto px-7 py-3 bg-luxury-gold hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-amber-500/10"
            >
              Book Appointment
            </button>
            <a
              href="https://wa.me/96566391083"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <a
              href="tel:+96566391083"
              className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
            >
              Call Clinic
            </a>
          </div>
        </div>
      </section>

      {/* TREATMENT PROCESS BENTO TIMELINE */}
      <section className="py-20 md:py-24 bg-bg-light dark:bg-[#071111]/40 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">The journey to perfection</span>
            <div className="accent-line mx-auto mt-2.5 mb-4"></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
              Your Guided <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Treatment Process</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-3">
              How we coordinate your aesthetic and structural alignment at Dr. Fiza's Kuwait clinic, step-by-step.
            </p>
          </div>

          {/* Process Timeline Steps (5 steps requested) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left relative z-10">
            
            {[
              { step: "01", name: "Consultation", desc: "A private consultation with Dr. Fiza to map out your general oral health and alignment goals." },
              { step: "02", name: "Digital Exam", desc: "Taking non-invasive 3D intraoral diagnostic scans and high-res low-radiation x-ray models." },
              { step: "03", name: "Personalized Plan", desc: "Reviewing computer simulations showing expected tooth migration pathways and timeline." },
              { step: "04", name: "Treatment", desc: "Fitting ceramic braces, starting clear aligner sets, or placing custom ceramic restorations." },
              { step: "05", name: "Beautiful Smile", desc: "Completing treatment. Releasing you with stunning, symmetrical teeth and lifetime retainers." }
            ].map((proc, index) => {
              return (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm relative group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-3xl font-extrabold text-teal-100 dark:text-teal-950/70 group-hover:text-primary-teal/20 transition-colors">
                        {proc.step}
                      </span>
                      <CheckCircle2 size={16} className="text-luxury-gold group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white mb-2">
                      {proc.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                      {proc.desc}
                    </p>
                  </div>
                  
                  {/* Visual direction caret on large displays */}
                  {index < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-20 bg-white dark:bg-slate-900 p-1 border border-slate-100 dark:border-slate-800 rounded-full shadow-md text-primary-teal">
                      <ChevronRight size={14} />
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section id="reviews" className="py-20 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">Patient Testimonials</span>
            <div className="accent-line mx-auto mt-2.5 mb-4"></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
              Trusted by <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Kuwait's Families</span>
            </h2>
          </div>

          {/* Testimonial Active Slider Case */}
          <div className="relative bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-10 rounded-2xl shadow-md text-left">
            
            {/* Stars Ratings */}
            <div className="flex gap-1 mb-5">
              {[...Array(TESTIMONIALS[testimonialIndex].rating)].map((_, idx) => (
                <Star key={idx} size={15} className="fill-luxury-gold text-luxury-gold" />
              ))}
            </div>

            <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic mb-8">
              "{TESTIMONIALS[testimonialIndex].text}"
            </p>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              
              <div className="flex items-center gap-3">
                <img 
                  src={TESTIMONIALS[testimonialIndex].image} 
                  alt={TESTIMONIALS[testimonialIndex].name} 
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                    {TESTIMONIALS[testimonialIndex].name}
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-primary-teal dark:text-teal-400">
                    Received: {TESTIMONIALS[testimonialIndex].serviceReceived}
                  </span>
                </div>
              </div>

              {/* Slider Toggle Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all text-xs"
                >
                  ←
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all text-xs"
                >
                  →
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CLINICAL FAQ ACCORDIONS */}
      <section id="faq" className="py-20 md:py-24 bg-slate-50 dark:bg-[#071111]/40 border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">Frequently Asked Questions</span>
            <div className="accent-line mx-auto mt-2.5 mb-4"></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
              Answering Your <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Dental Queries</span>
            </h2>
          </div>

          <div className="space-y-3 text-left">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="font-display font-bold text-slate-800 dark:text-white text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <span className={`text-primary-teal dark:text-teal-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <div className={`transition-all duration-300 ${isOpen ? 'max-h-72 opacity-100 border-t border-slate-100 dark:border-slate-800/60' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <p className="p-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT INFORMATION & CONVERSION HUB */}
      <section id="contact" className="py-20 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase block">Get in touch</span>
            <div className="accent-line mx-auto mt-2.5 mb-4"></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tight">
              Connect with Our <span className="text-primary-teal dark:text-teal-400 font-serif italic font-normal">Kuwait Clinic</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact Coordinates & Google Map (Left Column) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-left">
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Dr. Fiza Clinic</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Situated in the heart of Kuwait, providing world-class dentistry.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-primary-teal dark:text-teal-400 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Clinic Location</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                        MedC, Shaab Al Bahari, Kuwait
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-primary-teal dark:text-teal-400 shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Call Phone Support</span>
                      <a href="tel:+96566391083" className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white hover:text-primary-teal hover:underline">
                        +965 6639 1083
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-primary-teal dark:text-teal-400 shrink-0">
                      <MessageCircle size={16} className="text-emerald-500" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">WhatsApp Triage</span>
                      <a href="https://wa.me/96566391083" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                        +965 6639 1083 (Message Now)
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-primary-teal dark:text-teal-400 shrink-0">
                      <Instagram size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Instagram Handle</span>
                      <a href="https://www.instagram.com/drfiza.orthodontist/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white hover:text-primary-teal hover:underline">
                        @drfiza.orthodontist
                      </a>
                    </div>
                  </div>

                </div>

                {/* Business Hours List */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">Clinical Operating Hours</span>
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between"><span>Saturday - Wednesday</span><span className="font-semibold">9:00 AM - 9:00 PM</span></div>
                    <div className="flex justify-between"><span>Thursday</span><span className="font-semibold">9:00 AM - 5:00 PM</span></div>
                    <div className="flex justify-between text-red-500"><span>Friday (Emergency Only)</span><span className="font-bold">Prioritizing WhatsApp</span></div>
                  </div>
                </div>
              </div>

              {/* Google Maps Responsive Frame */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64 shadow-md mt-4 relative bg-slate-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m4!1m3!1d11128.790578508212!2d48.0264!3d29.3512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9ca88f25ea8d%3A0xe21f088fb9863456!2sAl%20Shaab%20Al%20Bahri%2C%20Kuwait!5e0!3m2!1sen!2skw!4v1700000000000!5m2!1sen!2skw" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Dr. Fiza Dental Clinic MedC Shaab Kuwait"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

            {/* Conversion Hub (Right Column) */}
            <div id="conversion-hub" className="lg:col-span-6 flex flex-col">
              
              {/* Form Category selection Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1.5 rounded-2xl mb-4 shadow-sm">
                <button
                  onClick={() => setActiveFormTab('appointment')}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFormTab === 'appointment'
                      ? 'bg-primary-teal text-white shadow-sm font-extrabold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Book Slot
                </button>
                <button
                  onClick={() => setActiveFormTab('assessment')}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFormTab === 'assessment'
                      ? 'bg-primary-teal text-white shadow-sm font-extrabold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Smile Scan
                </button>
                <button
                  onClick={() => setActiveFormTab('message')}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFormTab === 'message'
                      ? 'bg-primary-teal text-white shadow-sm font-extrabold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Message
                </button>
              </div>

              {/* Toggle Forms based on active selection */}
              {activeFormTab === 'appointment' && (
                <AppointmentForm 
                  defaultService={selectedServiceForBooking}
                  onSuccess={(data) => {
                    console.log('Appt success:', data);
                  }} 
                />
              )}

              {activeFormTab === 'assessment' && (
                <SmileForm 
                  onSuccess={(data) => {
                    console.log('Smile success:', data);
                  }} 
                />
              )}

              {activeFormTab === 'message' && (
                <ContactForm 
                  onSuccess={() => {
                    console.log('Message success');
                  }} 
                />
              )}

            </div>

          </div>

        </div>
      </section>

      {/* INSTAGRAM GRID FEED */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 text-center transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">@drfiza.orthodontist</span>
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white">Instagram Integration</h3>
            </div>
            <a 
              href="https://www.instagram.com/drfiza.orthodontist/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-primary-teal hover:border-primary-teal flex items-center gap-1.5 shadow-sm"
            >
              <Instagram size={14} className="text-luxury-gold" />
              Follow Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=200", title: "Orthodontics" },
              { img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=200", title: "MedC Studio" },
              { img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=200", title: "Modern Tech" },
              { img: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=200", title: "Confidence" },
              { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200", title: "Perfect Alignment" },
              { img: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=200", title: "Dr. Fiza" }
            ].map((feed, idx) => (
              <a 
                key={idx} 
                href="https://www.instagram.com/drfiza.orthodontist/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative rounded-xl overflow-hidden group aspect-square bg-slate-200 border border-slate-200 dark:border-slate-800"
              >
                <img 
                  src={feed.img} 
                  alt={feed.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Instagram size={20} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#051C1A] text-slate-300 py-16 transition-all border-t border-teal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Logo Brand summary Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary-teal border border-teal-700 overflow-hidden">
                <span className="text-white font-display font-bold text-base">DF</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Dr. Fiza Clinic</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Luxury orthodontics and premium aesthetic dental care at MedC Shaab Al Bahari, Kuwait. Setting the benchmark for beautiful smile transformations.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="https://www.instagram.com/drfiza.orthodontist/" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors"><Instagram size={17} /></a>
              <a href="https://www.threads.com/@drfiza.orthodontist" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors" title="Threads"><Smile size={17} /></a>
              <a href="https://wa.me/96566391083" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors"><MessageCircle size={17} /></a>
            </div>
          </div>

          {/* Core Categories Links Column */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase font-bold tracking-widest text-luxury-gold">Specialty Services</h5>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => { setSelectedCategory('Orthodontics'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left hover:text-white transition-colors">Orthodontics & Braces</button>
              <button onClick={() => { setSelectedCategory('Cosmetic Dentistry'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left hover:text-white transition-colors">Veneers & Whitening</button>
              <button onClick={() => { setSelectedCategory('Comprehensive Care'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left hover:text-white transition-colors">Children & Family Dentistry</button>
              <button onClick={() => { setSelectedCategory('Emergency & Specialized'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left hover:text-white transition-colors">Emergency Triage</button>
            </div>
          </div>

          {/* Quick Anchor Links Column */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase font-bold tracking-widest text-luxury-gold">Quick Navigation</h5>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left hover:text-white transition-colors">Home Landing</button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors">Meet Dr. Fiza</button>
              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors">Smile Transformations</button>
              <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors">Clinic FAQs</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-white transition-colors">Contact Hub</button>
            </div>
          </div>

          {/* Local Coordinates Column */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase font-bold tracking-widest text-luxury-gold">Clinic Location</h5>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>MedC, Shaab Al Bahari, Kuwait</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-luxury-gold shrink-0" />
                <a href="tel:+96566391083" className="hover:text-white">+965 6639 1083</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-luxury-gold shrink-0" />
                <span className="truncate">drfiza.orthodontist@outlook.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Legal copyrights segment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 mt-10 border-t border-teal-950/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} Dr. Fiza. All Rights Reserved. Designed for Kuwait.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING ACTIONS BAR (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 items-end">
        
        {/* Floating WhatsApp Action */}
        <a 
          href="https://wa.me/96566391083" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group relative focus:outline-none"
          title="WhatsApp Dr. Fiza"
        >
          <MessageCircle size={24} className="fill-white/10 group-hover:scale-110 transition-transform" />
          <span className="absolute right-15 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all">
            WhatsApp Triage
          </span>
        </a>

        {/* Floating Call Action */}
        <a 
          href="tel:+96566391083" 
          className="w-13 h-13 rounded-full bg-primary-teal hover:bg-teal-700 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group relative focus:outline-none"
          title="Call Dr. Fiza Clinic"
        >
          <Phone size={21} className="group-hover:scale-110 transition-transform" />
          <span className="absolute right-15 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all">
            Call Hub
          </span>
        </a>

        {/* Back to Top Toggle Action */}
        {showBackToTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-bold"
            title="Scroll To Top"
          >
            ▲
          </button>
        )}

      </div>

      {/* PERSISTENT FLOATING STICKY BOOKING BUTTON (Bottom Left - mobile friendly) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button 
          onClick={() => document.getElementById('conversion-hub')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="bg-luxury-gold hover:bg-amber-600 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center gap-2"
        >
          <Calendar size={14} />
          Book Slot Online
        </button>
      </div>

    </div>
  );
}
