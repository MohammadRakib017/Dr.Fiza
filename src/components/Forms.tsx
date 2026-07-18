import { useState, ChangeEvent, FormEvent } from 'react';
import { Calendar, Clock, CheckCircle2, AlertTriangle, ChevronRight, Send, PhoneCall, Sparkles, MessageSquare } from 'lucide-react';
import { SERVICES } from '../data';

interface AppointmentFormProps {
  onSuccess: (data: any) => void;
  defaultService?: string;
}

export function AppointmentForm({ onSuccess, defaultService = "" }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || 'Clear Aligners',
    date: '',
    time: '09:00 AM',
    preferredContact: 'WhatsApp',
    notes: ''
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Grouped and sorted service names
  const serviceOptions = SERVICES.map(s => s.name).sort();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) return 'Please provide a valid email address.';
    if (!formData.phone.trim()) return 'A phone number is required so we can contact you.';
    return '';
  };

  const validateStep2 = () => {
    if (!formData.date) return 'Please choose a preferred appointment date.';
    if (!formData.time) return 'Please choose a preferred time slot.';
    return '';
  };

  const handleNextStep = () => {
    let err = '';
    if (step === 1) err = validateStep1();

    if (err) {
      setError(err);
    } else {
      setStep(prev => prev + 1);
      setError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalErr = validateStep2();
    if (finalErr) {
      setError(finalErr);
      return;
    }

    setIsSubmitted(true);
    const existing = JSON.parse(localStorage.getItem('fiza_appointments') || '[]');
    const newAppointment = {
      id: 'FZ-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('fiza_appointments', JSON.stringify([newAppointment, ...existing]));
    
    setTimeout(() => {
      onSuccess(newAppointment);
    }, 400);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[450px] shadow-xl">
        <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
          <CheckCircle2 size={36} className="animate-bounce" />
        </div>
        <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-2">Request Logged Successfully</h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-sm text-sm mb-6 leading-relaxed">
          Thank you, <strong className="text-teal-700 dark:text-teal-400">{formData.name}</strong>. Our clinical coordinators will contact you via <strong className="text-teal-700 dark:text-teal-400">{formData.preferredContact}</strong> shortly at <strong className="text-teal-700 dark:text-teal-400">{formData.phone}</strong> to confirm your slot on <strong className="text-teal-700 dark:text-teal-400">{formData.date}</strong>.
        </p>
        <div className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-5 text-left text-xs text-slate-600 dark:text-slate-400 space-y-3 max-w-md">
          <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Treatment Specialty</span>
            <span className="text-slate-800 dark:text-white font-medium">{formData.service}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Requested Schedule</span>
            <span className="text-slate-800 dark:text-white">{formData.date} at {formData.time}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Communication Mode</span>
            <span className="text-slate-800 dark:text-white font-semibold">{formData.preferredContact}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Clinic Status</span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Awaiting Confirmation
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: 'Clear Aligners',
              date: '',
              time: '09:00 AM',
              preferredContact: 'WhatsApp',
              notes: ''
            });
            setStep(1);
            setIsSubmitted(false);
          }}
          className="mt-8 text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold underline cursor-pointer"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div id="appointment-form-inner" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
      {/* Steps Indicator */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-primary-teal text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}`}>1</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Details</span>
        </div>
        <div className="flex-1 mx-4 h-[1px] bg-slate-100 dark:bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-primary-teal text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}`}>2</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Appointment Setup</span>
        </div>
      </div>

      {error && (
        <div className="mb-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 flex items-start gap-3 text-xs text-red-600 dark:text-red-300">
          <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-left">
              <h4 className="font-display font-bold text-slate-800 dark:text-white text-lg">Contact Information</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                Enter your details to coordinate your luxury consultation. We treat all medical records with absolute confidentiality.
              </p>
            </div>
            
            <div className="space-y-1 text-left">
              <label htmlFor="appt-name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name *</label>
              <input
                id="appt-name"
                name="name"
                type="text"
                placeholder="e.g. Sarah Al-Sabah"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-1">
                <label htmlFor="appt-email" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address *</label>
                <input
                  id="appt-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="appt-phone" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Phone Number *</label>
                <input
                  id="appt-phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +965 6639 1083"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Preferred Contact Channel *</label>
              <div className="grid grid-cols-3 gap-3">
                {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, preferredContact: method.split(' ')[0] as any }))}
                    className={`py-2 px-3 border rounded-xl text-xs font-medium transition-all ${
                      (formData.preferredContact === method || (formData.preferredContact === 'WhatsApp' && method === 'WhatsApp') || (formData.preferredContact === 'Phone' && method === 'Phone Call'))
                        ? 'border-primary-teal bg-teal-50/50 dark:bg-teal-950/20 text-primary-teal font-semibold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="w-full mt-4 bg-primary-teal hover:bg-teal-700 text-white py-3 px-4 rounded-xl transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-700/15"
            >
              Next: Select Service & Time <ChevronRight size={14} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-bold text-slate-800 dark:text-white text-lg">Appointment Settings</h4>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-primary-teal font-semibold hover:underline"
              >
                Change Details
              </button>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="appt-service" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Select Treatment Specialty</label>
              <select
                id="appt-service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
              >
                {serviceOptions.map((service, index) => (
                  <option key={index} value={service} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-white">
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="appt-date" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Preferred Date</label>
                <div className="relative">
                  <input
                    id="appt-date"
                    name="date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
                    required
                  />
                  <Calendar size={16} className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="appt-time" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Preferred Arrival Slot</label>
                <div className="relative">
                  <select
                    id="appt-time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
                  >
                    <option value="09:00 AM">09:00 AM (Morning Consult)</option>
                    <option value="11:00 AM">11:00 AM (Mid-Morning)</option>
                    <option value="01:00 PM">01:00 PM (Early Afternoon)</option>
                    <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
                    <option value="07:00 PM">07:00 PM (Evening Special)</option>
                  </select>
                  <Clock size={16} className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="appt-notes" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Additional Clinic Notes / Smile Goals (Optional)</label>
              <textarea
                id="appt-notes"
                name="notes"
                rows={3}
                placeholder="Mention any dental sensitivities, concerns, previous orthodontic work, or special comfort requests..."
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none resize-none"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl transition-all font-semibold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-700"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 bg-luxury-gold hover:bg-amber-600 text-white py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
              >
                Submit Booking <Send size={13} />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// --- SMILE ASSESSMENT / ASSESSMENT INQUIRY FORM ---
interface SmileFormProps {
  onSuccess: (data: any) => void;
}

export function SmileForm({ onSuccess }: SmileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Clear Aligners',
    description: '',
    preferredContact: 'WhatsApp'
  });

  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all core contact fields.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please tell us briefly about your current smile goals or teeth concerns.');
      return;
    }

    setIsSubmitted(true);
    const existing = JSON.parse(localStorage.getItem('fiza_assessments') || '[]');
    const newAssessment = {
      id: 'SA-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('fiza_assessments', JSON.stringify([newAssessment, ...existing]));

    setTimeout(() => {
      onSuccess(newAssessment);
    }, 400);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xl">
        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-5">
          <Sparkles size={32} className="animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-2">Assessment Request Submitted</h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-sm text-sm mb-6 leading-relaxed">
          Thank you, <strong className="text-primary-teal dark:text-teal-400">{formData.name}</strong>. Dr. Fiza's alignment coordinators are reviewing your smile characteristics and will reach out via <strong className="text-primary-teal dark:text-teal-400">{formData.preferredContact}</strong> with a tailored preliminary advice plan.
        </p>
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-left rounded-xl p-4 text-xs text-slate-600 dark:text-slate-400 w-full max-w-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Selected Specialty:</span>
            <span className="text-slate-800 dark:text-white font-semibold">{formData.serviceInterest}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Assessment Status:</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">Under Clinical Review</span>
          </div>
        </div>
        <button 
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              serviceInterest: 'Clear Aligners',
              description: '',
              preferredContact: 'WhatsApp'
            });
            setIsSubmitted(false);
          }}
          className="mt-6 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white underline cursor-pointer"
        >
          Request Another Assessment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-left">
      <div>
        <h4 className="font-display font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
          <Sparkles size={18} className="text-luxury-gold" />
          Virtual Smile Assessment
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
          Tell us about your teeth alignment or aesthetic goals. Receive preliminary, personalized orthodontic insight directly from Dr. Fiza.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-xl p-3 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="smile-name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name *</label>
        <input
          id="smile-name"
          name="name"
          type="text"
          placeholder="e.g. Abdullah Al-Fadhli"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="smile-email" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address *</label>
          <input
            id="smile-email"
            name="email"
            type="email"
            placeholder="abdullah@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="smile-phone" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Phone Number (WhatsApp) *</label>
          <input
            id="smile-phone"
            name="phone"
            type="tel"
            placeholder="e.g. +965 6639 1083"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="smile-service" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Interests *</label>
          <select
            id="smile-service"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
          >
            <option value="Clear Aligners">Clear Aligners / Invisalign</option>
            <option value="Braces">Braces (Ceramic or Metal)</option>
            <option value="Dental Veneers">Dental Veneers</option>
            <option value="Teeth Whitening">Teeth Whitening</option>
            <option value="Smile Makeovers">Full Smile Makeover</option>
            <option value="Dental Implants">Dental Implants</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="smile-contact" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Contact Channel</label>
          <select
            id="smile-contact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
          >
            <option value="WhatsApp">WhatsApp (Fastest)</option>
            <option value="Phone">Direct Phone Call</option>
            <option value="Email">Email Response</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="smile-desc" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Describe Your Ideal Smile Goals *</label>
        <textarea
          id="smile-desc"
          name="description"
          rows={3}
          placeholder="Briefly describe your goals (e.g., closing space between front teeth, correcting overcrowding, whitening persistent stains)..."
          value={formData.description}
          onChange={handleInputChange}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none resize-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-teal hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-700/15"
      >
        <Sparkles size={14} className="text-luxury-gold shrink-0" />
        Generate Smile Assessment
      </button>
    </form>
  );
}

// --- GENERAL CONTACT US FORM ---
interface ContactFormProps {
  onSuccess: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      onSuccess();
    }, 400);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[350px] shadow-xl">
        <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/20 border border-teal-500/20 flex items-center justify-center text-teal-600 mb-4 animate-pulse">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="font-display font-medium text-lg text-slate-800 dark:text-white mb-2">Message Sent</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm text-xs mb-6 leading-relaxed">
          Your inquiry has been logged securely. Dr. Fiza's dental team in Kuwait will review your message and reply via email within 12-24 hours.
        </p>
        <button 
          onClick={() => {
            setFormData({ name: '', email: '', phone: '', message: '' });
            setIsSubmitted(false);
          }}
          className="text-xs text-primary-teal font-semibold hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-xl p-3 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="contact-name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Your Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-email" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Your Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Phone Number (Optional)</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="e.g. +965 6639 1083"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-message" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Write Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="How can Dr. Fiza assist your dental health today? Tell us more..."
          value={formData.message}
          onChange={handleInputChange}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal transition-all outline-none resize-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-teal hover:bg-teal-700 text-white font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-700/15"
      >
        <MessageSquare size={14} />
        Send Message
      </button>
    </form>
  );
}
