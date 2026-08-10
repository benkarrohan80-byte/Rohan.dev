import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, KeyRound, X, Database, Search, Filter, Phone, Mail, 
  Trash2, Archive, CheckCircle2, Download, AlertTriangle, 
  RefreshCcw, UserPlus, ShieldAlert, Sparkles, Plus, Check 
} from 'lucide-react';
import { Inquiry } from '../types';
import { 
  getInquiries, 
  updateInquiryStatus, 
  deleteInquiry, 
  addInquiry,
  syncInquiriesWithServer
} from '../utils/inquiryStorage';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [currentUsername, setCurrentUsername] = useState('Rohan8421');
  const [currentPassword, setCurrentPassword] = useState('#rohan321');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Custom confirmation dialog states (fixes iframe dialog restriction bugs)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [credentialsSuccessMsg, setCredentialsSuccessMsg] = useState('');

  // Dashboard & inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'contacted' | 'archived' | 'rejected' | 'cancelled'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Load custom passcode from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('rohan_admin_username');
    if (savedUser) {
      setCurrentUsername(savedUser);
    }
    const savedPass = localStorage.getItem('rohan_admin_password');
    if (savedPass) {
      setCurrentPassword(savedPass);
    }
    
    // First read what is in local storage immediately
    setInquiries(getInquiries());
    
    // Then async sync with the backend database
    syncInquiriesWithServer().then((syncedInquiries) => {
      setInquiries(syncedInquiries);
    });
  }, []);

  // Handle Login Submission
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === currentUsername && password === currentPassword) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect username or password. Please try again!');
    }
  };

  // Change credentials
  const handlePasscodeChangeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    localStorage.setItem('rohan_admin_password', newPassword);
    setCurrentPassword(newPassword);
    if (newUsername.trim()) {
      localStorage.setItem('rohan_admin_username', newUsername);
      setCurrentUsername(newUsername);
    }
    setNewUsername('');
    setNewPassword('');
    setShowPasswordChange(false);
    setCredentialsSuccessMsg('Security credentials updated successfully!');
    setTimeout(() => setCredentialsSuccessMsg(''), 4000);
  };

  // Helper to auto-fill demo credentials
  const handleAutoFillDemo = () => {
    setUsername('Rohan8421');
    setPassword('#rohan321');
  };

  // Status Change handler
  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    const inquiry = inquiries.find(inq => inq.id === id);
    if (inquiry && inquiry.status === 'cancelled') {
      return; // Do not allow admin to change status of a cancelled request
    }

    const updated = updateInquiryStatus(id, status);
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  // Delete Inquiry handlers
  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    const updated = deleteInquiry(deleteTargetId);
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === deleteTargetId) {
      setSelectedInquiry(null);
    }
    setDeleteTargetId(null);
  };

  // Simulate incoming inquiry for demonstration and validation
  const handleSimulateInquiry = () => {
    const mockNames = ['Vikram Rathore', 'Pooja Hegde', 'Kabir Malhotra', 'Anjali Gupta', 'Suresh Kumar'];
    const mockEmails = ['vikram@rathoregroup.in', 'pooja@hegdedesigns.com', 'kabir@malhotrasol.com', 'anjali.g@startup.co', 'suresh@kumargrocers.com'];
    const mockPhones = ['+91 98765 12345', '+91 99112 23344', '+91 88888 77777', '', '+91 95432 10987'];
    const mockServices = ['Business Website', 'Landing Page', 'Portfolio Website', 'Website Redesign', 'Custom Website Feature'];
    const mockMessages = [
      'Hi Rohan, we require a responsive landing page to launch our premium tea subscription service. Need this within 5 days. Please call or WhatsApp.',
      'We are looking for a highly professional custom website feature to calculate customer shipping rates on our landing page. Do you write clean React code?',
      'Namaste! I would like to build a beautiful agency portfolio for my marketing consultancy. Dark mode design style is preferred. Can you share a quick quote?',
      'We would love to redesign our current business website. It is very slow. Speed optimization and neat layout are our absolute top priority.',
      'Rohan, we need a simple landing page with interactive product showcases for our local store in Indore. Let us chat over WhatsApp!'
    ];

    const randIdx = Math.floor(Math.random() * mockNames.length);
    
    addInquiry({
      name: mockNames[randIdx],
      email: mockEmails[randIdx],
      phone: mockPhones[randIdx],
      service: mockServices[randIdx],
      message: mockMessages[randIdx]
    });

    setInquiries(getInquiries());
  };

  // Clear all inquiries database
  const handleClearAll = () => {
    setShowClearAllConfirm(true);
  };

  const confirmClearAll = () => {
    localStorage.setItem('rohan_portfolio_inquiries', JSON.stringify([]));
    
    // Attempt background sync to wipe server database as well
    fetch('/api/inquiries', {
      method: 'DELETE'
    }).catch(e => console.warn('Could not clear server inquiries', e));

    setInquiries([]);
    setSelectedInquiry(null);
    setShowClearAllConfirm(false);
  };

  // Download inquiries as CSV sheet
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export yet.');
      return;
    }
    
    const headers = ['ID', 'Date Created', 'Name', 'Email', 'Phone', 'Service Category', 'Status', 'Message'];
    const csvRows = [headers.join(',')];

    inquiries.forEach(inq => {
      const row = [
        inq.id,
        new Date(inq.createdAt).toLocaleDateString(),
        `"${inq.name.replace(/"/g, '""')}"`,
        inq.email,
        inq.phone || 'N/A',
        inq.service,
        inq.status.toUpperCase(),
        `"${inq.message.replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rohan_Leads_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get filtered inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.phone && inq.phone.includes(searchQuery));
    
    if (activeTab === 'all') return matchesSearch;
    return inq.status === activeTab && matchesSearch;
  });

  // Calculate stats summary
  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter(i => i.status === 'new').length;
  const contactedLeads = inquiries.filter(i => i.status === 'contacted').length;
  const rejectedLeads = inquiries.filter(i => i.status === 'rejected').length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans"
      id="admin-panel-page"
    >
      
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
            <Database size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500">Rohan.dev Secure Console</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-xl font-extrabold text-white leading-none mt-1">Admin Lead Management</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800/50">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Superadmin Mode</span>
              </span>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-xl text-xs font-bold text-slate-300 border border-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Change security credentials"
              >
                <KeyRound size={13} />
                <span>Change Credentials</span>
              </button>
            </>
          )}
          
          <button 
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 hover:border-slate-700 font-bold text-xs transition-all cursor-pointer bg-slate-950"
            title="Go back to portfolio website"
          >
            <span>Exit to Website</span>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Dynamic Area */}
      {!isAuthenticated ? (
          /* PASSPHRASE AUTHENTICATION SCREEN */
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950/40 relative">
            
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center relative z-10"
            >
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <Lock size={26} />
              </div>
              
              <h2 className="text-xl font-extrabold text-white">Secure Admin Access</h2>
              <p className="text-sm text-slate-400 mt-2 mb-6 max-w-xs mx-auto">
                Please enter your credentials to manage incoming project inquiries and view client details.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label htmlFor="admin-username" className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Username
                  </label>
                  <input
                    type="text"
                    id="admin-username"
                    autoFocus
                    required
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="admin-password" className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="admin-password"
                    required
                    placeholder="••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono font-semibold"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-500 font-semibold flex items-center justify-center gap-1 py-1">
                    <ShieldAlert size={12} />
                    <span>{errorMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer text-sm"
                >
                  Unlock Admin Portal
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* AUTHENTICATED REAL-TIME PANEL LAYOUT */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-900/50">
            
            {/* LEFT COLUMN: Leads list and utilities */}
            <div className="w-full md:w-[420px] border-r border-slate-800 flex flex-col bg-slate-950/20 h-1/2 md:h-full overflow-hidden">
              
              {/* Stats KPIs Panel */}
              <div className="p-4 grid grid-cols-4 gap-2 border-b border-slate-800 bg-slate-950/40 select-none">
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-2 text-center">
                  <span className="block text-xs font-semibold text-slate-400 text-[10px]">Total</span>
                  <span className="text-base font-extrabold text-indigo-400">{totalLeads}</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-2 text-center relative">
                  {newLeads > 0 && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                  )}
                  <span className="block text-xs font-semibold text-slate-400 text-[10px]">New 🔴</span>
                  <span className="text-base font-extrabold text-rose-400">{newLeads}</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-2 text-center">
                  <span className="block text-xs font-semibold text-slate-400 text-[10px]">Worked</span>
                  <span className="text-base font-extrabold text-emerald-400">{contactedLeads}</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-2 text-center">
                  <span className="block text-xs font-semibold text-slate-400 text-[10px]">Rejected</span>
                  <span className="text-base font-extrabold text-amber-500">{rejectedLeads}</span>
                </div>
              </div>

              {/* Search input */}
              <div className="p-3 border-b border-slate-800">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                  <input
                    type="text"
                    placeholder="Search client name, email or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all text-slate-200"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2 text-slate-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Custom Status Tabs */}
              <div className="px-3 pt-2 pb-1 border-b border-slate-800 flex items-center justify-between text-xs select-none">
                <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                  {(['all', 'new', 'contacted', 'archived', 'rejected', 'cancelled'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all uppercase text-[10px] tracking-wider cursor-pointer whitespace-nowrap ${
                        activeTab === tab 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiry list container */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60" id="leads-list">
                {filteredInquiries.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <Database size={24} className="mx-auto opacity-30 mb-2" />
                    <p className="text-xs">No inquiries matching criteria found.</p>
                  </div>
                ) : (
                  filteredInquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <div
                        key={inq.id}
                        onClick={() => setSelectedInquiry(inq)}
                        className={`p-4 text-left cursor-pointer transition-all border-l-4 relative hover:bg-slate-800/40 ${
                          isSelected 
                            ? 'bg-indigo-600/10 border-l-indigo-500' 
                            : inq.status === 'new'
                            ? 'border-l-rose-500 bg-rose-500/5'
                            : inq.status === 'contacted'
                            ? 'border-l-emerald-500'
                            : inq.status === 'rejected'
                            ? 'border-l-amber-600 bg-amber-600/5'
                            : inq.status === 'cancelled'
                            ? 'border-l-slate-500 bg-slate-900/50 opacity-50'
                            : 'border-l-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-sm text-white truncate max-w-[200px]">
                            {inq.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/10">
                            {inq.service}
                          </span>
                          
                          {inq.status === 'new' && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="New Lead" />
                          )}
                          {inq.status === 'contacted' && (
                            <span className="text-[10px] font-bold text-emerald-400">Contacted ✓</span>
                          )}
                          {inq.status === 'rejected' && (
                            <span className="text-[10px] font-bold text-amber-500">Rejected ✗</span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {inq.message}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Utility buttons row */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
                <button
                  onClick={handleSimulateInquiry}
                  className="flex-1 py-1.5 bg-emerald-600/10 border border-emerald-500/20 hover:bg-emerald-600/25 text-emerald-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                  title="Insert realistic demo inquiry"
                >
                  <UserPlus size={13} />
                  <span>Simulate Lead</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/25 text-indigo-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                  title="Download CSV spreadsheet"
                >
                  <Download size={13} />
                  <span>CSV</span>
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600/25 text-rose-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center"
                  title="Wipe database clear"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Inquiry details viewing pane */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
              {showPasswordChange ? (
                /* PASSWORD UPDATE INTERFACE */
                <div className="max-w-md mx-auto my-auto space-y-4 w-full bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <KeyRound size={16} className="text-indigo-400" />
                    <span>Change Admin Credentials</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Set a new username and password to secure your admin panel lead base.
                  </p>
                  
                  <form onSubmit={handlePasscodeChangeSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">
                        New Username
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 text-white border border-slate-800 focus:border-indigo-500 rounded-lg text-sm font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="#newpass123"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 text-white border border-slate-800 focus:border-indigo-500 rounded-lg text-sm font-semibold"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowPasswordChange(false)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition-colors"
                      >
                        Save Credentials
                      </button>
                    </div>
                  </form>
                </div>
              ) : selectedInquiry ? (
                /* ACTIVE SELECTED INQUIRY INFORMATION */
                <div className="space-y-6 text-left h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Header info */}
                    <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          Inquiry #{selectedInquiry.id.slice(-6)}
                        </span>
                        <h2 className="text-xl font-extrabold text-white mt-1">
                          {selectedInquiry.name}
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <span>Received: </span>
                          <span className="font-semibold text-indigo-400">
                            {new Date(selectedInquiry.createdAt).toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        {/* Status badges dropdown/selector */}
                        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap justify-end">
                          {selectedInquiry.status === 'cancelled' ? (
                            <div className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize bg-slate-800/80 text-slate-400 cursor-not-allowed flex items-center gap-2 border border-slate-700/50 select-none">
                              <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                              Cancelled by Customer
                            </div>
                          ) : (
                            (['new', 'contacted', 'archived', 'rejected'] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => handleStatusChange(selectedInquiry.id, st)}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all capitalize cursor-pointer ${
                                  selectedInquiry.status === st
                                    ? st === 'new'
                                      ? 'bg-rose-500 text-white'
                                      : st === 'contacted'
                                      ? 'bg-emerald-500 text-white'
                                      : st === 'rejected'
                                      ? 'bg-amber-600 text-white'
                                      : 'bg-slate-700 text-white'
                                    : 'text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                {st}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Meta values grid */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Email ID</span>
                        <a 
                          href={`mailto:${selectedInquiry.email}`} 
                          className="text-indigo-400 hover:underline text-sm font-semibold mt-1 block truncate"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                      
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">WhatsApp/Phone</span>
                        {selectedInquiry.phone ? (
                          <a 
                            href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-emerald-400 hover:underline text-sm font-semibold mt-1 block truncate"
                          >
                            {selectedInquiry.phone}
                          </a>
                        ) : (
                          <span className="text-slate-500 text-sm mt-1 block">Not Provided</span>
                        )}
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Requested Service</span>
                        <span className="text-white text-sm font-bold mt-1 block">
                          {selectedInquiry.service}
                        </span>
                      </div>
                    </div>

                    {/* Client Message detail body */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Project Description & Scope Message
                      </span>
                      <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800/80 text-sm leading-relaxed whitespace-pre-wrap min-h-[140px]">
                        {selectedInquiry.message}
                      </div>
                    </div>
                  </div>

                  {/* Immediate quick contact workflow action panel */}
                  <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/20 p-4 rounded-2xl border border-slate-800/50">
                    <div className="text-left">
                      <span className="text-xs font-bold text-slate-300 block">Lead Action Workflow</span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Reach out to the prospect instantly to close the deal.</p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                      {selectedInquiry.phone && (
                        <a
                          href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedInquiry.name}! This is Rohan. Thank you for your inquiry about a "${selectedInquiry.service}" on my website. I reviewed your requirements and would love to build this for you.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleStatusChange(selectedInquiry.id, 'contacted')}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/10 cursor-pointer transition-all"
                        >
                          <Phone size={13} fill="currentColor" />
                          <span>WhatsApp Chat</span>
                        </a>
                      )}

                      <a
                        href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Website Proposal: ${selectedInquiry.service}`)}&body=${encodeURIComponent(`Hi ${selectedInquiry.name},\n\nThank you for reaching out through my Portfolio Website. I would love to build your new "${selectedInquiry.service}".\n\n[Your Message here...]\n\nBest regards,\nRohan`)}`}
                        onClick={() => handleStatusChange(selectedInquiry.id, 'contacted')}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer transition-all"
                      >
                        <Mail size={13} />
                        <span>Send Email</span>
                      </a>

                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, 'rejected')}
                        className={`px-3 py-2 ${selectedInquiry.status === 'rejected' ? 'bg-amber-600/25 text-amber-400 border border-amber-500/30' : 'bg-amber-600/10 border border-amber-500/20 text-amber-500 hover:bg-amber-600/25'} rounded-xl text-xs font-bold transition-all cursor-pointer`}
                        title="Mark inquiry as Rejected"
                      >
                        Reject Lead
                      </button>

                      <button
                        onClick={() => handleDelete(selectedInquiry.id)}
                        className="px-3 py-2 bg-rose-600/10 border border-rose-500/15 text-rose-400 hover:bg-rose-600/25 rounded-xl text-xs font-bold transition-all"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* EMPTY SELECTION PLACEHOLDER */
                <div className="my-auto text-center text-slate-500 py-12 max-w-sm mx-auto">
                  <Database size={40} className="mx-auto opacity-20 text-indigo-400 mb-4 animate-bounce-slow" />
                  <h3 className="font-bold text-white text-base">No Inquiry Selected</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Select a client inquiry from the list on the left column to read project scope specifications, change statuses, and contact them instantly.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      {/* SUCCESS TOAST FOR CREDENTIALS UPDATE */}
      <AnimatePresence>
        {credentialsSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/30 text-emerald-400 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <Check className="w-5 h-5 bg-emerald-500/10 p-1 rounded-full text-emerald-400 border border-emerald-500/20" />
            <span className="text-xs font-bold">{credentialsSuccessMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOM OVERLAY MODAL: DELETE CONFIRMATION */}
      <AnimatePresence>
        {deleteTargetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                <Trash2 size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-white">Delete Inquiry Forever?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you absolutely sure you want to delete this client's inquiry? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-rose-600/10"
                >
                  Delete Lead
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOM OVERLAY MODAL: WIPE DATABASE */}
      <AnimatePresence>
        {showClearAllConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-white">Wipe All Leads Database?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This will completely clear your portfolio's entire inquiry lead database. This action is permanent!
                </p>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setShowClearAllConfirm(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearAll}
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-600/10"
                >
                  Clear Database
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
