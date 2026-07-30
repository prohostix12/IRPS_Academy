"use client";

import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { University, Program } from '../../types';
import { 
  Building2, 
  BookOpen, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Mail, 
  MailOpen,
  Phone, 
  Calendar, 
  User, 
  Search, 
  Filter, 
  CheckCircle2, 
  X,
  Lock,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';

interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  campus: string;
  message: string;
  createdAt: string;
  status: string;
}

export default function AdminPage() {
  const { universities, programs, refreshData, loading: dataLoading } = useData();

  // Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Navigation State
  const [activeSection, setActiveSection] = useState<'universities' | 'programs' | 'inquiries'>('universities');

  // Contact Inquiries State
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [searchInquiryQuery, setSearchInquiryQuery] = useState('');
  const [filterInquiryType, setFilterInquiryType] = useState('All');
  const [filterInquiryCampus, setFilterInquiryCampus] = useState('All');
  const [inquiryTab, setInquiryTab] = useState<'unread' | 'read'>('unread');

  // Universities Form Modal State
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [editingUni, setEditingUni] = useState<University | null>(null);
  const [uniForm, setUniForm] = useState({
    name: '',
    code: '',
    tagline: '',
    location: '',
    established: '1900',
    type: 'Public State',
    ranking: '',
    acceptanceRate: '',
    totalStudents: '',
    campusSize: '',
    image: '',
    logo: '',
    gallery: '',
    description: '',
    topPrograms: '',
    tuitionRange: '',
    features: '',
    contactEmail: ''
  });
  const [uniFormError, setUniFormError] = useState<string | null>(null);
  const [isUniSubmitting, setIsUniSubmitting] = useState(false);

  // Programs Form Modal State
  const [isProgModalOpen, setIsProgModalOpen] = useState(false);
  const [editingProg, setEditingProg] = useState<Program | null>(null);
  const [progForm, setProgForm] = useState({
    title: '',
    universityId: '',
    degreeLevel: 'PhD',
    category: 'Engineering & Tech',
    duration: '',
    credits: '120',
    tuitionPerYear: '15000',
    applicationDeadline: '',
    format: 'Full-time On Campus',
    description: '',
    curriculumHighlights: '',
    careerOutcomes: '',
    prerequisites: '',
    featured: false
  });
  const [progFormError, setProgFormError] = useState<string | null>(null);
  const [isProgSubmitting, setIsProgSubmitting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // 1. Check Auth Status
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        const data = await res.json();
        setIsAdmin(true);
        setAdminUsername(data.username);
        // Load inquiries if auth checks out
        fetchInquiries();
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 2. Fetch Contact Inquiries
  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/admin/contacts');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setInquiriesLoading(false);
    }
  };

  // 3. Admin Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      setIsAdmin(true);
      setAdminUsername(loginForm.username);
      showToast('Logged in successfully!');
      fetchInquiries();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid username or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 4. Admin Logout Submit
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAdmin(false);
      setAdminUsername('');
      showToast('Logged out successfully.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 5. Create / Update University
  const handleUniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUniFormError(null);
    setIsUniSubmitting(true);

    const payload = {
      ...uniForm,
      established: Number(uniForm.established),
      gallery: uniForm.gallery.split(',').map(s => s.trim()).filter(Boolean),
      topPrograms: uniForm.topPrograms.split(',').map(s => s.trim()).filter(Boolean),
      features: uniForm.features.split(',').map(s => s.trim()).filter(Boolean),
      id: editingUni ? editingUni.id : undefined
    };

    try {
      const method = editingUni ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/universities', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save university.');
      }

      await refreshData();
      setIsUniModalOpen(false);
      showToast(editingUni ? 'University updated successfully!' : 'University added successfully!');
      resetUniForm();
    } catch (err: any) {
      setUniFormError(err.message || 'An error occurred.');
    } finally {
      setIsUniSubmitting(false);
    }
  };

  // Delete University
  const handleUniDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university? This will also delete all associated programs.')) return;

    try {
      const res = await fetch(`/api/admin/universities/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete university.');
      }

      await refreshData();
      showToast('University deleted successfully.');
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    }
  };

  // 6. Create / Update Program
  const handleProgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgFormError(null);
    setIsProgSubmitting(true);

    // Find the university name
    const selectedUniObj = universities.find(u => u.id === progForm.universityId);
    if (!selectedUniObj) {
      setProgFormError('Please select a valid university.');
      setIsProgSubmitting(false);
      return;
    }

    const payload = {
      ...progForm,
      universityName: selectedUniObj.name,
      credits: Number(progForm.credits),
      tuitionPerYear: Number(progForm.tuitionPerYear),
      curriculumHighlights: progForm.curriculumHighlights.split(',').map(s => s.trim()).filter(Boolean),
      careerOutcomes: progForm.careerOutcomes.split(',').map(s => s.trim()).filter(Boolean),
      id: editingProg ? editingProg.id : undefined
    };

    try {
      const method = editingProg ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/programs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save program.');
      }

      await refreshData();
      setIsProgModalOpen(false);
      showToast(editingProg ? 'Program updated successfully!' : 'Program added successfully!');
      resetProgForm();
    } catch (err: any) {
      setProgFormError(err.message || 'An error occurred.');
    } finally {
      setIsProgSubmitting(false);
    }
  };

  // Delete Program
  const handleProgDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const res = await fetch(`/api/admin/programs/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete program.');
      }

      await refreshData();
      showToast('Program deleted successfully.');
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    }
  };

  // Helper Form Resets
  const resetUniForm = () => {
    setUniForm({
      name: '',
      code: '',
      tagline: '',
      location: '',
      established: '1900',
      type: 'Public State',
      ranking: '',
      acceptanceRate: '',
      totalStudents: '',
      campusSize: '',
      image: '',
      logo: '',
      gallery: '',
      description: '',
      topPrograms: '',
      tuitionRange: '',
      features: '',
      contactEmail: ''
    });
    setEditingUni(null);
    setUniFormError(null);
  };

  const resetProgForm = () => {
    setProgForm({
      title: '',
      universityId: universities[0]?.id || '',
      degreeLevel: 'PhD',
      category: 'Engineering & Tech',
      duration: '',
      credits: '120',
      tuitionPerYear: '15000',
      applicationDeadline: '',
      format: 'Full-time On Campus',
      description: '',
      curriculumHighlights: '',
      careerOutcomes: '',
      prerequisites: '',
      featured: false
    });
    setEditingProg(null);
    setProgFormError(null);
  };

  const openEditUniModal = (uni: University) => {
    setEditingUni(uni);
    setUniForm({
      name: uni.name,
      code: uni.code,
      tagline: uni.tagline,
      location: uni.location,
      established: String(uni.established),
      type: uni.type,
      ranking: uni.ranking,
      acceptanceRate: uni.acceptanceRate,
      totalStudents: uni.totalStudents,
      campusSize: uni.campusSize,
      image: uni.image,
      logo: uni.logo || '',
      gallery: uni.gallery.join(', '),
      description: uni.description,
      topPrograms: uni.topPrograms.join(', '),
      tuitionRange: uni.tuitionRange,
      features: uni.features.join(', '),
      contactEmail: uni.contactEmail
    });
    setIsUniModalOpen(true);
  };

  const openEditProgModal = (prog: Program) => {
    setEditingProg(prog);
    setProgForm({
      title: prog.title,
      universityId: prog.universityId,
      degreeLevel: prog.degreeLevel,
      category: prog.category,
      duration: prog.duration,
      credits: String(prog.credits),
      tuitionPerYear: String(prog.tuitionPerYear),
      applicationDeadline: prog.applicationDeadline,
      format: prog.format,
      description: prog.description,
      curriculumHighlights: prog.curriculumHighlights.join(', '),
      careerOutcomes: prog.careerOutcomes.join(', '),
      prerequisites: prog.prerequisites,
      featured: prog.featured || false
    });
    setIsProgModalOpen(true);
  };

  // Inquiry Filter & Search
  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      i.name.toLowerCase().includes(searchInquiryQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchInquiryQuery.toLowerCase()) ||
      (i.phone && i.phone.toLowerCase().includes(searchInquiryQuery.toLowerCase())) ||
      i.message.toLowerCase().includes(searchInquiryQuery.toLowerCase());
    
    const matchesType = filterInquiryType === 'All' || i.inquiryType === filterInquiryType;
    const matchesCampus = filterInquiryCampus === 'All' || i.campus.toLowerCase().includes(filterInquiryCampus.toLowerCase());
    const matchesTab = inquiryTab === 'read' ? i.status === 'read' : (i.status !== 'read');

    return matchesSearch && matchesType && matchesCampus && matchesTab;
  });

  const handleToggleInquiryStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update inquiry status.');
      }

      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      showToast(newStatus === 'read' ? 'Inquiry marked as read.' : 'Inquiry marked as unread.');
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    }
  };

  // If initial auth check is not complete, show loading screen
  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center font-sans">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-[#00296b] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-neutral-600">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle light leak decoration */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#e8c47a] to-amber-300 text-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black font-serif text-white tracking-tight">Admin Portal</h2>
            <p className="text-xs text-slate-400">Please sign in to access management panels.</p>
          </div>

          {loginError && (
            <div className="bg-red-950/40 border border-red-500/30 p-3.5 rounded-2xl text-xs text-red-300 font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                required
                placeholder="Enter admin username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-slate-750 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-slate-750 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-amber-400 to-[#e8c47a] hover:from-amber-500 hover:to-amber-400 text-slate-900 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ShieldCheck className="w-4 h-4 text-slate-900" />
              )}
              <span>{isLoggingIn ? 'Verifying...' : 'Authenticate'}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">← Back to Main Website</a>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-850 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-400/30 flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-amber-300 rounded-xl flex items-center justify-center text-slate-900">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-black text-base text-white tracking-wide">IRPS Panel</h1>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Administrator</span>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="px-6 py-3 bg-slate-850 border-b border-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-xs text-slate-300 font-medium">Session: <strong className="text-white">{adminUsername}</strong></span>
        </div>

        {/* Sidebar Navigation Tabs */}
        <nav className="p-4 flex-grow space-y-1">
          <button
            onClick={() => setActiveSection('universities')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeSection === 'universities'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building2 className="w-4.5 h-4.5" />
            <span>Universities</span>
            <span className="ml-auto bg-slate-850 text-slate-400 text-[10px] px-2 py-0.5 rounded-md font-bold">{universities.length}</span>
          </button>

          <button
            onClick={() => setActiveSection('programs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeSection === 'programs'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span>Programs</span>
            <span className="ml-auto bg-slate-850 text-slate-400 text-[10px] px-2 py-0.5 rounded-md font-bold">{programs.length}</span>
          </button>

          <button
            onClick={() => setActiveSection('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeSection === 'inquiries'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span>Contact Inquiries</span>
            <span className="ml-auto bg-slate-850 text-slate-400 text-[10px] px-2 py-0.5 rounded-md font-bold">{inquiries.length}</span>
          </button>
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-red-950/40 hover:text-red-300 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Panel</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col p-6 md:p-8 space-y-6 overflow-y-auto max-h-screen">
        
        {/* Dashboard Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight capitalize">
              {activeSection === 'universities' ? 'Universities Network' : activeSection === 'programs' ? 'Accredited Programs' : 'Student Contact Messages'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {activeSection === 'universities' 
                ? 'Register and update accredited university campuses globally.' 
                : activeSection === 'programs' 
                ? 'Manage active degree programs, tuition costs, and admission requirements.' 
                : 'View inquiries, callback requests, and questions sent by prospective students.'}
            </p>
          </div>

          {activeSection === 'universities' && (
            <button
              onClick={() => { resetUniForm(); setIsUniModalOpen(true); }}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>Add University</span>
            </button>
          )}

          {activeSection === 'programs' && (
            <button
              disabled={universities.length === 0}
              onClick={() => { resetProgForm(); setIsProgModalOpen(true); }}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>Add Program</span>
            </button>
          )}
        </div>

        {/* -------------------- UNIVERSITIES VIEW -------------------- */}
        {activeSection === 'universities' && (
          <div className="space-y-4">
            {dataLoading ? (
              <div className="py-20 text-center text-slate-500 text-sm">Loading records...</div>
            ) : universities.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl text-slate-500">
                No universities registered yet. Click "Add University" to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {universities.map(uni => (
                  <div key={uni.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 shadow-lg relative">
                    <img 
                      src={uni.image} 
                      alt={uni.name} 
                      className="w-full sm:w-36 h-28 object-cover rounded-2xl bg-slate-850 shrink-0 border border-slate-800"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=300&q=80' }}
                    />
                    <div className="flex-grow space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          {uni.logo ? (
                            <img 
                              src={uni.logo} 
                              alt={`${uni.name} Logo`} 
                              className="w-10 h-10 rounded-xl object-cover bg-slate-850 p-0.5 shrink-0 border border-slate-800" 
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-850 flex items-center justify-center shrink-0 border border-slate-800 text-slate-400 font-bold text-[10px]">
                              {uni.code.substring(0, 3)}
                            </div>
                          )}
                          <div>
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{uni.code}</span>
                            <h3 className="font-bold font-serif text-lg text-white leading-tight">{uni.name}</h3>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditUniModal(uni)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleUniDelete(uni.id)}
                            className="p-2 bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 italic line-clamp-1">"{uni.tagline}"</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 border-t border-slate-850/60 text-[10px] text-slate-400">
                        <div><strong>Location:</strong> {uni.location}</div>
                        <div><strong>Established:</strong> {uni.established}</div>
                        <div><strong>Type:</strong> {uni.type}</div>
                        <div><strong>Ranking:</strong> {uni.ranking}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------- PROGRAMS VIEW -------------------- */}
        {activeSection === 'programs' && (
          <div className="space-y-4">
            {dataLoading ? (
              <div className="py-20 text-center text-slate-500 text-sm">Loading records...</div>
            ) : programs.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl text-slate-500">
                No programs registered yet. Click "Add Program" to get started.
              </div>
            ) : (
              <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-850 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                      <th className="p-4">Title</th>
                      <th className="p-4">University</th>
                      <th className="p-4">Degree & Category</th>
                      <th className="p-4">Duration & Cost</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/65">
                    {programs.map(prog => (
                      <tr key={prog.id} className="hover:bg-slate-850/30 transition-colors">
                        <td className="p-4">
                          <strong className="text-white text-sm block">{prog.title}</strong>
                          <span className="text-[10px] text-slate-400">ID: {prog.id}</span>
                        </td>
                        <td className="p-4 text-slate-300 font-medium">
                          {prog.universityName}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <span className="inline-block bg-slate-850 text-slate-300 font-semibold px-2 py-0.5 rounded-full text-[9px]">
                            {prog.degreeLevel}
                          </span>
                          <span className="block text-[10px] text-slate-400">{prog.category}</span>
                        </td>
                        <td className="p-4 space-y-0.5">
                          <span className="block text-slate-300">{prog.duration}</span>
                          <span className="block font-bold text-amber-400">${prog.tuitionPerYear.toLocaleString()} / year</span>
                        </td>
                        <td className="p-4">
                          {prog.featured ? (
                            <span className="text-emerald-400 bg-emerald-500/10 font-bold px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider border border-emerald-500/20">Yes</span>
                          ) : (
                            <span className="text-slate-500">No</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditProgModal(prog)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleProgDelete(prog.id)}
                              className="p-2 bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* -------------------- CONTACT INQUIRIES VIEW -------------------- */}
        {activeSection === 'inquiries' && (
          <div className="space-y-4">
            
            {/* Sub-tabs for Unread / Read inquiries */}
            <div className="flex border-b border-slate-800 gap-6 mb-2">
              <button
                onClick={() => setInquiryTab('unread')}
                className={`pb-3 text-sm font-bold relative transition-all duration-300 cursor-pointer ${
                  inquiryTab === 'unread'
                    ? 'text-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Unread Inquiries</span>
                <span className="ml-2 bg-slate-850 text-slate-350 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {inquiries.filter(i => i.status !== 'read').length}
                </span>
                {inquiryTab === 'unread' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 rounded-full animate-fadeIn"></span>
                )}
              </button>

              <button
                onClick={() => setInquiryTab('read')}
                className={`pb-3 text-sm font-bold relative transition-all duration-300 cursor-pointer ${
                  inquiryTab === 'read'
                    ? 'text-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Read Inquiries</span>
                <span className="ml-2 bg-slate-850 text-slate-350 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {inquiries.filter(i => i.status === 'read').length}
                </span>
                {inquiryTab === 'read' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 rounded-full animate-fadeIn"></span>
                )}
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-col lg:flex-row gap-4 items-center justify-between shadow-md">
              <div className="w-full lg:w-1/3 relative">
                <input
                  type="text"
                  placeholder="Search inquiries (name, email, phone, message)..."
                  value={searchInquiryQuery}
                  onChange={(e) => setSearchInquiryQuery(e.target.value)}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-1.5 bg-slate-850 px-3 py-1.5 rounded-xl border border-slate-700">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={filterInquiryType}
                    onChange={(e) => setFilterInquiryType(e.target.value)}
                    className="bg-transparent border-none text-[11px] font-bold text-white outline-none cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900">All Categories</option>
                    <option value="Admissions Inquiry" className="bg-slate-900">Admissions</option>
                    <option value="Scholarships & Financial Aid" className="bg-slate-900">Scholarships & Aid</option>
                    <option value="International Visa (F-1) Support" className="bg-slate-900">Visa Support</option>
                    <option value="Campus Visit Request" className="bg-slate-900">Campus Visits</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-850 px-3 py-1.5 rounded-xl border border-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={filterInquiryCampus}
                    onChange={(e) => setFilterInquiryCampus(e.target.value)}
                    className="bg-transparent border-none text-[11px] font-bold text-white outline-none cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900">All Campuses</option>
                    <option value="Heritage State University" className="bg-slate-900">Heritage HSU</option>
                    <option value="Veritas Institute" className="bg-slate-900">Veritas VIT</option>
                    <option value="St. Jude Health" className="bg-slate-900">St. Jude SJCHS</option>
                    <option value="Global Business" className="bg-slate-900">Global GBEA</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inquiries Content */}
            {inquiriesLoading ? (
              <div className="py-20 text-center text-slate-500 text-sm">Loading user inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl text-slate-500">
                No matching inquiries found in the database.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map(inq => (
                  <div key={inq.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-serif font-bold text-base text-white">{inq.name}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-amber-400" /> {inq.email}</span>
                          {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> {inq.phone}</span>}
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-400" /> {new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-start sm:items-center gap-4 mt-2 sm:mt-0">
                        <div className="flex flex-col items-end gap-1">
                          <span className="bg-slate-850 text-slate-200 font-bold px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider border border-slate-700">
                            {inq.inquiryType}
                          </span>
                          <span className="text-[10px] text-amber-400/90 font-medium">Campus: {inq.campus}</span>
                        </div>

                        <button
                          onClick={() => handleToggleInquiryStatus(inq.id, inq.status)}
                          className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                            inq.status === 'read'
                              ? 'bg-slate-800 border-slate-750 text-slate-400 hover:bg-slate-750 hover:text-white'
                              : 'bg-amber-400/10 border-amber-400/20 hover:bg-amber-400/20 text-amber-400 hover:border-amber-400/40'
                          }`}
                          title={inq.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          {inq.status === 'read' ? (
                            <>
                              <MailOpen className="w-3.5 h-3.5" />
                              <span>Mark Unread</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-350 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-850">
                      {inq.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* -------------------- UNIVERSITIES MODAL FORM -------------------- */}
      {isUniModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-lg font-black font-serif text-white">
                {editingUni ? 'Edit University Campus' : 'Add New University Campus'}
              </h3>
              <button 
                onClick={() => { setIsUniModalOpen(false); resetUniForm(); }} 
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uniFormError && (
              <div className="bg-red-950/40 border border-red-500/30 p-3 rounded-xl text-xs text-red-300">
                {uniFormError}
              </div>
            )}

            <form onSubmit={handleUniSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">University Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heritage State University"
                    value={uniForm.name}
                    onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Campus Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HSU-MAIN"
                    value={uniForm.code}
                    onChange={(e) => setUniForm({ ...uniForm, code: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Tagline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Centuries of Academic Distinction & Research Excellence"
                  value={uniForm.tagline}
                  onChange={(e) => setUniForm({ ...uniForm, tagline: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cambridge, MA, USA"
                    value={uniForm.location}
                    onChange={(e) => setUniForm({ ...uniForm, location: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Established Year</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1888"
                    value={uniForm.established}
                    onChange={(e) => setUniForm({ ...uniForm, established: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Institution Type</label>
                  <select
                    value={uniForm.type}
                    onChange={(e) => setUniForm({ ...uniForm, type: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="Public State">Public State</option>
                    <option value="Private Ivy">Private Ivy</option>
                    <option value="Institute of Technology">Institute of Technology</option>
                    <option value="Specialized College">Specialized College</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Ranking</label>
                  <input
                    type="text"
                    placeholder="e.g. #12 National"
                    value={uniForm.ranking}
                    onChange={(e) => setUniForm({ ...uniForm, ranking: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Acceptance Rate</label>
                  <input
                    type="text"
                    placeholder="e.g. 18%"
                    value={uniForm.acceptanceRate}
                    onChange={(e) => setUniForm({ ...uniForm, acceptanceRate: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Total Students</label>
                  <input
                    type="text"
                    placeholder="e.g. 28,500+"
                    value={uniForm.totalStudents}
                    onChange={(e) => setUniForm({ ...uniForm, totalStudents: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Campus Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 350 Acres"
                    value={uniForm.campusSize}
                    onChange={(e) => setUniForm({ ...uniForm, campusSize: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Hero Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={uniForm.image}
                    onChange={(e) => setUniForm({ ...uniForm, image: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">University Logo URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/logo.png"
                    value={uniForm.logo}
                    onChange={(e) => setUniForm({ ...uniForm, logo: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Admissions Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="admissions@heritage.edu"
                    value={uniForm.contactEmail}
                    onChange={(e) => setUniForm({ ...uniForm, contactEmail: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Gallery Image URLs (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="https://image1.jpg, https://image2.jpg"
                  value={uniForm.gallery}
                  onChange={(e) => setUniForm({ ...uniForm, gallery: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Top Programs Preview (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="B.Sc Computer Science, MBA Strategy"
                  value={uniForm.topPrograms}
                  onChange={(e) => setUniForm({ ...uniForm, topPrograms: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Tuition Range</label>
                  <input
                    type="text"
                    placeholder="e.g. $14,500 - $32,000 / year"
                    value={uniForm.tuitionRange}
                    onChange={(e) => setUniForm({ ...uniForm, tuitionRange: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Campus Features (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="R1 Research Facility, 100% Need-Based Aid"
                    value={uniForm.features}
                    onChange={(e) => setUniForm({ ...uniForm, features: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the campus, student body, architecture, etc..."
                  value={uniForm.description}
                  onChange={(e) => setUniForm({ ...uniForm, description: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={isUniSubmitting}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUniSubmitting ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                )}
                <span>{isUniSubmitting ? 'Saving...' : editingUni ? 'Update University Campus' : 'Create University Campus'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- PROGRAMS MODAL FORM -------------------- */}
      {isProgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-lg font-black font-serif text-white">
                {editingProg ? 'Edit Degree Program' : 'Add New Degree Program'}
              </h3>
              <button 
                onClick={() => { setIsProgModalOpen(false); resetProgForm(); }} 
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {progFormError && (
              <div className="bg-red-950/40 border border-red-500/30 p-3 rounded-xl text-xs text-red-300">
                {progFormError}
              </div>
            )}

            <form onSubmit={handleProgSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Program Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.S. Artificial Intelligence"
                    value={progForm.title}
                    onChange={(e) => setProgForm({ ...progForm, title: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Parent University Campus *</label>
                  <select
                    value={progForm.universityId}
                    onChange={(e) => setProgForm({ ...progForm, universityId: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    {universities.map(u => (
                      <option key={u.id} value={u.id} className="bg-slate-900">{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Degree Level</label>
                  <select
                    value={progForm.degreeLevel}
                    onChange={(e) => setProgForm({ ...progForm, degreeLevel: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="PhD">PhD</option>
                    <option value="EdD">EdD</option>
                    <option value="DBA">DBA</option>
                    <option value="EngD">EngD</option>
                    <option value="DSc / ScD">DSc / ScD</option>
                    <option value="DPhil">DPhil</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Subject Category</label>
                  <select
                    value={progForm.category}
                    onChange={(e) => setProgForm({ ...progForm, category: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="Engineering & Tech">Engineering & Tech</option>
                    <option value="Business & Management">Business & Management</option>
                    <option value="Medicine & Health">Medicine & Health</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                    <option value="Law & Public Policy">Law & Public Policy</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Study Format</label>
                  <select
                    value={progForm.format}
                    onChange={(e) => setProgForm({ ...progForm, format: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="Full-time On Campus">Full-time On Campus</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online Distance">Online Distance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Duration Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Years (4 Semesters)"
                    value={progForm.duration}
                    onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Credits Required</label>
                  <input
                    type="number"
                    placeholder="e.g. 120"
                    value={progForm.credits}
                    onChange={(e) => setProgForm({ ...progForm, credits: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase tracking-wide">Tuition Per Year ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 24000"
                    value={progForm.tuitionPerYear}
                    onChange={(e) => setProgForm({ ...progForm, tuitionPerYear: e.target.value })}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Application Deadline Info</label>
                <input
                  type="text"
                  placeholder="e.g. Dec 15, 2026 / Regular Jan 15, 2027"
                  value={progForm.applicationDeadline}
                  onChange={(e) => setProgForm({ ...progForm, applicationDeadline: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Academic Prerequisites</label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor's in CS, Applied Math. MCAT 512+..."
                  value={progForm.prerequisites}
                  onChange={(e) => setProgForm({ ...progForm, prerequisites: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Curriculum Highlights (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Deep Learning, Cloud DevOps, Cryptography"
                  value={progForm.curriculumHighlights}
                  onChange={(e) => setProgForm({ ...progForm, curriculumHighlights: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Career Outcomes (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="AI Research Scientist, Software Architect"
                  value={progForm.careerOutcomes}
                  onChange={(e) => setProgForm({ ...progForm, careerOutcomes: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase tracking-wide">Program Description</label>
                <textarea
                  rows={4}
                  placeholder="Provide a detailed overview of what is taught and studied in this degree..."
                  value={progForm.description}
                  onChange={(e) => setProgForm({ ...progForm, description: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-850 rounded-xl border border-slate-700">
                <input
                  type="checkbox"
                  id="prog-featured"
                  checked={progForm.featured}
                  onChange={(e) => setProgForm({ ...progForm, featured: e.target.checked })}
                  className="w-4 h-4 text-amber-500 rounded bg-slate-800 border-slate-700 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="prog-featured" className="font-bold text-slate-300 cursor-pointer select-none">
                  Feature this program on the landing page preview
                </label>
              </div>

              <button
                type="submit"
                disabled={isProgSubmitting}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProgSubmitting ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                )}
                <span>{isProgSubmitting ? 'Saving...' : editingProg ? 'Update Degree Program' : 'Create Degree Program'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
