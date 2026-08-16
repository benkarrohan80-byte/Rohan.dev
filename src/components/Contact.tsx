import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, Phone, Send, CheckCircle, ArrowUpRight, Search, FileText, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { addInquiry, getInquiries, deleteInquiry, updateInquiryStatus, syncInquiriesWithServer } from '../utils/inquiryStorage';
import { Inquiry } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Business Website',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [trackQuery, setTrackQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackedInquiries, setTrackedInquiries] = useState<Inquiry[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenCreateWebsite = () => {
      setActiveTab('submit');
      setSubmitted(false);
      const formCard = document.getElementById('contact-form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Automatically focus the name input field after scroll
        setTimeout(() => {
          document.getElementById('name')?.focus();
        }, 500);
      }
    };

    const handleSelectPricingPlan = (e: any) => {
      const { planName, price } = e.detail || {};
      setActiveTab('submit');
      setSubmitted(false);
      if (planName) {
        const fullServiceName = `${planName} (${price})`;
        setFormData(prev => ({
          ...prev,
          service: fullServiceName,
          message: `Hi Rohan, I want to book the ${planName} package starting at ${price}. Please share details and payment steps!`
        }));
      }
      const formCard = document.getElementById('contact-form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          document.getElementById('name')?.focus();
        }, 500);
      }
    };

    window.addEventListener('open-create-website', handleOpenCreateWebsite);
    window.addEventListener('select-pricing-plan', handleSelectPricingPlan);
    return () => {
      window.removeEventListener('open-create-website', handleOpenCreateWebsite);
      window.removeEventListener('select-pricing-plan', handleSelectPricingPlan);
    };
  }, []);

  const handleTrackSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    
    setIsSearching(true);
    // Fetch latest from server to ensure admin updates (like 'rejected') reflect here
    const allInquiries = await syncInquiriesWithServer();
    const queryLower = trackQuery.trim().toLowerCase();
    const queryClean = queryLower.replace(/[^a-zA-Z0-9]/g, '');

    const matched = allInquiries.filter((inq) => {
      // Compare email
      const emailMatch = inq.email.trim().toLowerCase() === queryLower;
      
      // Compare phone (normalize both for dynamic, resilient matching)
      const phoneClean = inq.phone ? inq.phone.replace(/[^a-zA-Z0-9]/g, '') : '';
      const phoneMatch = phoneClean && queryClean && (phoneClean.includes(queryClean) || queryClean.includes(phoneClean));
      
      return emailMatch || phoneMatch;
    });

    setTrackedInquiries(matched);
    setHasSearched(true);
    setCancelConfirmId(null);
    setIsSearching(false);
  };

  const handleCancelRequest = (id: string) => {
    setCancelConfirmId(id);
  };

  const confirmCancelRequest = () => {
    if (!cancelConfirmId) return;
    updateInquiryStatus(cancelConfirmId, 'cancelled');
    setTrackedInquiries(prev => prev ? prev.map(inq => inq.id === cancelConfirmId ? { ...inq, status: 'cancelled' as any } : inq) : null);
    setCancelConfirmId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    
    // Save to localStorage database
    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    });

    // Simulate server delivery feel with custom response
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Business Website',
        message: ''
      });
    }, 1000);
  };

  const servicesList = [
    'Complete Website Package (₹2,599)',
    'Complete Website Package (₹4,999)',
    'Business Website',
    'Website Redesign',
    'Custom Website Feature'
  ];

  // Rohan's business details
  const whatsappNumber = '918317246684'; // Exact user phone number
  const prefilledText = encodeURIComponent('Hi Rohan! I saw your Web Developer Portfolio and would like to talk about building a modern website for my business.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledText}`;
  const rohanEmail = 'rohantraders8421@gmail.com'; // User's email

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Big high-impact Call To Action box */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-16 relative overflow-hidden" id="cta-billboard">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-white/10 mb-4">
              Let's Collaborate
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Need a Website for Your Business?<br className="hidden sm:inline" /> Let's Work Together.
            </h2>
            <p className="text-indigo-100 max-w-xl mb-6 text-sm sm:text-base">
              Get an agency-quality, responsive website designed specifically to attract customers for your business. Delivered in under 7 days.
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Call or Message:</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+918317246684"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-indigo-700 font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95 text-sm"
                >
                  <Phone size={18} className="text-indigo-600" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95 text-sm"
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp Message</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={`mailto:${rohanEmail}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 text-white font-bold rounded-xl border border-white/20 transition-all duration-200 text-sm"
                >
                  <Mail size={18} />
                  <span>Email Rohan</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form and Contact Detail Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Details (Grid col 1-5) */}
          <div className="lg:col-span-5 space-y-8" id="contact-details">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                Contact Information
              </h3>
              <p className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Get In Touch Today
              </p>
              <div className="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3" />
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Have questions regarding website pricing, design revisions, timelines, or domain mapping? Send a quick message or click the WhatsApp button to chat instantly.
            </p>

            <div className="space-y-4">
              {/* Email details */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold uppercase">Email</span>
                  <a href={`mailto:${rohanEmail}`} className="text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-colors break-all">
                    {rohanEmail}
                  </a>
                </div>
              </div>

              {/* Call or Message details */}
              <div className="flex flex-col gap-3.5 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold uppercase">Phone / Contact</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold text-sm tracking-wide">
                      +91 83172 46684
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <a
                    href="tel:+918317246684"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 transition-colors text-center"
                  >
                    <Phone size={14} />
                    <span>Call Directly</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 transition-colors text-center"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card (Grid col 6-12) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl scroll-mt-28" id="contact-form-card">
            
            {/* Elegant Tab Headers */}
            <div className="flex border-b border-slate-100 dark:border-slate-800/80 mb-6 pb-0.5">
              <button
                onClick={() => {
                  setActiveTab('submit');
                  setSubmitted(false);
                }}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'submit'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <MessageSquare size={16} />
                <span>Submit Request</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('track');
                  setHasSearched(false);
                  setTrackedInquiries(null);
                }}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'track'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <Search size={16} />
                <span>Track Request</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'submit' ? (
                !submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    autoComplete="off"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                          Name <span className="text-indigo-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="client_name_nofill"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                          required
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                        />
                      </div>

                      {/* Email address */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                          Email Address <span className="text-indigo-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="client_email_nofill"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                          required
                          placeholder="xyz@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* WhatsApp number / Phone */}
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                          Phone Number <span className="text-indigo-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="client_phone_nofill"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                          required
                          placeholder="xxxxxxx321"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                        />
                      </div>

                      {/* Service Type drop */}
                      <div className="space-y-1.5">
                        <label htmlFor="service" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                          Required Service
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                        >
                          {servicesList.map((srv) => (
                            <option key={srv} value={srv}>
                              {srv}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                     {/* Message details */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        Describe Your Project (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Describe....."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit buttons */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Project Request</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                      Request Sent Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                      Thank you! Your project request has been received. Rohan will reach back to you at your provided email or phone number in under 12 hours.
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                      <button
                        onClick={() => {
                          setTrackQuery(formData.email || '');
                          setActiveTab('track');
                          setHasSearched(false);
                        }}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
                      >
                        Track Status
                      </button>
                    </div>
                  </motion.div>
                )
              ) : (
                /* Track Request tab render */
                <motion.div
                  key="track-requests-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <h4 className="text-base font-bold text-slate-950 dark:text-white">Track Your Project Request</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Enter the email address or phone number you used during submission to view all previous project requests and their current review status.
                    </p>
                  </div>

                  <form onSubmit={handleTrackSearch} className="flex gap-2.5" autoComplete="off">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Search size={15} />
                      </span>
                      <input
                        type="text"
                        name="track_query_nofill"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        required
                        placeholder="Enter email or phone number..."
                        value={trackQuery}
                        onChange={(e) => setTrackQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/70 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5 active:scale-95 disabled:active:scale-100 flex-shrink-0"
                    >
                      {isSearching ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
                      <span>{isSearching ? 'Searching...' : 'Search'}</span>
                    </button>
                  </form>

                  <AnimatePresence mode="wait">
                    {hasSearched && (
                      <motion.div
                        key="search-results-list"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        {trackedInquiries && trackedInquiries.length > 0 ? (
                          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              Found {trackedInquiries.length} request(s) matching your search query:
                            </p>
                            {trackedInquiries.map((inq) => {
                              let statusLabel = '';
                              let statusColor = '';
                              let statusDesc = '';

                              switch (inq.status) {
                                case 'new':
                                  statusLabel = 'New / Received';
                                  statusColor = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/30';
                                  statusDesc = "Rohan has received your request and is currently analyzing the scope. He will reach out shortly.";
                                  break;
                                case 'contacted':
                                  statusLabel = 'In Contact';
                                  statusColor = 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/30';
                                  statusDesc = 'Rohan has initiated discussion regarding your project details or replied to your email.';
                                  break;
                                case 'archived':
                                  statusLabel = 'Completed';
                                  statusColor = 'bg-slate-50 text-slate-700 dark:bg-slate-950/40 dark:text-slate-400 border-slate-200/50 dark:border-slate-800/30';
                                  statusDesc = 'The discussion for this project has been cataloged or successfully concluded.';
                                  break;
                                case 'rejected':
                                  statusLabel = 'Declined';
                                  statusColor = 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/30';
                                  statusDesc = 'This request cannot be fulfilled at this time. Feel free to contact on WhatsApp directly.';
                                  break;
                                case 'cancelled':
                                  statusLabel = 'Cancelled';
                                  statusColor = 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-300/50 dark:border-slate-700/50';
                                  statusDesc = 'You have cancelled this request.';
                                  break;
                                default:
                                  statusLabel = 'Pending';
                                  statusColor = 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30';
                                  statusDesc = 'Under active status queue review.';
                              }

                              return (
                                <div
                                  key={inq.id}
                                  className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800/60 text-left space-y-3 shadow-sm"
                                >
                                  <div className="flex flex-wrap justify-between items-start gap-2">
                                    <div>
                                      <h5 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <FileText size={14} className="text-indigo-500" />
                                        <span>{inq.service}</span>
                                      </h5>
                                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                                        Submitted: {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                                          day: 'numeric',
                                          month: 'short',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </span>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                                      {statusLabel}
                                    </span>
                                  </div>

                                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5 font-bold">Your Description:</strong>
                                    <p className="line-clamp-3 whitespace-pre-wrap">{inq.message}</p>
                                  </div>

                                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 bg-indigo-50/30 dark:bg-indigo-950/10 p-2.5 rounded-xl border border-indigo-100/30 dark:border-indigo-950/20">
                                    <Clock size={13} className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <span>
                                      <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Status Detail:</strong> {statusDesc}
                                    </span>
                                  </div>

                                  {/* Cancel Request Section (Only for new or pending requests) */}
                                  {inq.status === 'new' && (
                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 mt-3 flex justify-end">
                                      {cancelConfirmId === inq.id ? (
                                        <div className="flex items-center gap-2 w-full justify-end">
                                          <span className="text-xs text-rose-500 dark:text-rose-400 font-bold mr-2">Cancel this request?</span>
                                          <button
                                            onClick={() => setCancelConfirmId(null)}
                                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                          >
                                            No
                                          </button>
                                          <button
                                            onClick={confirmCancelRequest}
                                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                          >
                                            Yes, Cancel
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => handleCancelRequest(inq.id)}
                                          className="px-3 py-1.5 bg-slate-200/50 hover:bg-rose-100 dark:bg-slate-800/50 dark:hover:bg-rose-500/20 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                                        >
                                          <AlertCircle size={13} />
                                          <span>Cancel Request</span>
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
                            <AlertCircle size={22} className="text-slate-400 mx-auto animate-bounce" />
                            <h5 className="text-sm font-bold text-slate-800 dark:text-slate-300">No Inquiries Found</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                              We couldn't find any requests submitted with the contact detail <span className="text-indigo-600 dark:text-indigo-400 font-bold">{trackQuery}</span>.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
