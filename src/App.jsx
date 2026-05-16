import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Calendar, Users, Bell, FileText, Settings, LogOut, Plus, Search,
  Filter, Clock, MapPin, User, Mail, Phone, ChevronRight, X, Check, AlertCircle,
  Camera, Video, ExternalLink, MessageSquare, BarChart3, ChevronDown, Send, Menu,
  Building2, GraduationCap, Hammer, Briefcase, ShieldCheck, UserCog, ClipboardList,
  Moon, Sun, Edit, Smartphone, Download
} from 'lucide-react';


import { ROLES, CURRENT_USERS, DEPARTMENTS, WORKFORCE, INITIAL_SESSIONS, INITIAL_REQUESTS } from './data.js';

// ============================================================================
// HELPERS
// ============================================================================

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateShort = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const getModeIcon = (mode) => {
  if (mode === 'online') return <Video className="w-3.5 h-3.5" />;
  if (mode === 'offline') return <MapPin className="w-3.5 h-3.5" />;
  return <ExternalLink className="w-3.5 h-3.5" />;
};

const getModeLabel = (mode) => {
  if (mode === 'online') return 'Online';
  if (mode === 'offline') return 'Offline';
  return 'Third-Party';
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const Logo = ({ small = false, dark = false }) => (
  <div className="flex items-center gap-3">
    <div className={`${small ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-2 ${dark ? 'ring-white/10' : 'ring-slate-200'}`}>
      <img src="/ultratech.jpg" alt="Ultratech Logo" className="w-full h-full object-cover" />
    </div>
    {!small && (
      <div>
        <div className={`text-[15px] font-bold leading-tight tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>UltraTech</div>
        <div className={`text-[10px] uppercase tracking-widest font-semibold ${dark ? 'text-slate-400' : 'text-slate-400'}`}>Rawan Training</div>
      </div>
    )}
  </div>
);

const Badge = ({ children, color = 'slate' }) => {
  const colors = {
    teal: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200/80',
    blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/80',
    indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/80',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/80',
    orange: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200/80',
    slate: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/80',
    green: 'bg-green-50 text-green-700 ring-1 ring-green-200/80',
    red: 'bg-red-50 text-red-700 ring-1 ring-red-200/80',
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${colors[color]}`}>{children}</span>;
};

// Predefined role style map to avoid dynamic Tailwind classes (ensures classes are present in source)
const roleStyles = {
  teal: {
    softBg: 'bg-teal-500/20',
    text: 'text-teal-400',
    avatarGradient: 'from-teal-500 to-teal-700',
    avatarGradient2: 'from-teal-400 to-teal-600',
    ring: 'ring-teal-100'
  },
  blue: {
    softBg: 'bg-blue-500/20',
    text: 'text-blue-400',
    avatarGradient: 'from-blue-500 to-blue-700',
    avatarGradient2: 'from-blue-400 to-blue-600',
    ring: 'ring-blue-100'
  },
  indigo: {
    softBg: 'bg-indigo-500/20',
    text: 'text-indigo-400',
    avatarGradient: 'from-indigo-500 to-indigo-700',
    avatarGradient2: 'from-indigo-400 to-indigo-600',
    ring: 'ring-indigo-100'
  },
  amber: {
    softBg: 'bg-amber-500/20',
    text: 'text-amber-400',
    avatarGradient: 'from-amber-500 to-amber-700',
    avatarGradient2: 'from-amber-400 to-amber-600',
    ring: 'ring-amber-100'
  },
  slate: {
    softBg: 'bg-slate-500/20',
    text: 'text-slate-400',
    avatarGradient: 'from-slate-500 to-slate-700',
    avatarGradient2: 'from-slate-400 to-slate-600',
    ring: 'ring-slate-100'
  },
  orange: {
    softBg: 'bg-orange-500/20',
    text: 'text-orange-400',
    avatarGradient: 'from-orange-500 to-orange-700',
    avatarGradient2: 'from-orange-400 to-orange-600',
    ring: 'ring-orange-100'
  }
};

const StatCard = ({ label, value, sub, accent = false }) => (
  <div className={`p-5 rounded-xl border relative overflow-hidden group transition-all hover:-translate-y-0.5 hover:shadow-lg ${
    accent
      ? 'bg-gradient-to-br from-teal-600 to-teal-700 border-teal-600 shadow-md shadow-teal-500/20'
      : 'bg-white border-slate-200 shadow-sm'
  }`}>
    <div className={`text-[10px] uppercase tracking-widest font-semibold mb-3 ${accent ? 'text-teal-100' : 'text-slate-400'}`}>{label}</div>
    <div className={`text-4xl font-extrabold tracking-tight leading-none ${accent ? 'text-white' : 'text-slate-900'}`}>{value}</div>
    {sub && <div className={`text-xs mt-2.5 font-medium ${accent ? 'text-teal-100/80' : 'text-slate-400'}`}>{sub}</div>}
    {accent && (
      <>
        <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -right-2 -top-6 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />
      </>
    )}
  </div>
);

// ============================================================================
// SCHEDULE SESSION MODAL (Hero feature)
// ============================================================================

const ScheduleSessionModal = ({ onClose, onSchedule }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '', mode: 'offline', department: '', date: '', time: '', duration: 60,
    venue: '', meetingLink: '', instructor: '', instructorDept: '', instructorDesignation: '',
    aim: ''
  });
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [filterDept, setFilterDept] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const filteredWorkforce = useMemo(() => {
    return WORKFORCE.filter(w => {
      if (filterDept !== 'all' && w.dept !== filterDept) return false;
      if (filterType !== 'all' && w.type !== filterType) return false;
      if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.empId.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filterDept, filterType, search]);

  const toggleParticipant = (id) => {
    setSelectedParticipants(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const selectAllFiltered = () => {
    const ids = filteredWorkforce.map(w => w.id);
    setSelectedParticipants(prev => [...new Set([...prev, ...ids])]);
  };

  const canProceedStep1 = form.title && form.date && form.time && form.aim &&
    (form.mode === 'offline' ? form.venue : form.mode === 'online' ? form.meetingLink : form.meetingLink);

  const handleSchedule = () => {
    const newSession = {
      id: Date.now(),
      ...form,
      participants: selectedParticipants,
      status: 'scheduled',
      attendance: null
    };
    onSchedule(newSession, selectedParticipants);
  };

  const labourCount = selectedParticipants.filter(id => WORKFORCE.find(w => w.id === id)?.type === 'labour').length;
  const employeeCount = selectedParticipants.length - labourCount;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-teal-700/30 flex items-center justify-between bg-gradient-to-r from-slate-900 via-teal-900 to-teal-800">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Schedule New Training Session</h2>
            <p className="text-[12px] text-teal-300/80 mt-0.5 font-medium">Step {step} of 3 — {step === 1 ? 'Session Details' : step === 2 ? 'Select Participants' : 'Review & Confirm'}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200">
          <div className="flex gap-1">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= step ? 'bg-teal-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Session Title</label>
                <input
                  type="text" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Fire Safety Refresher Training"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Training Mode</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { id: 'offline', label: 'Offline', icon: MapPin, desc: 'Physical venue' },
                    { id: 'online', label: 'Online', icon: Video, desc: 'Virtual meeting' },
                    { id: 'third_party', label: 'Third-Party', icon: ExternalLink, desc: 'External course' },
                  ].map(m => {
                    const Icon = m.icon;
                    const selected = form.mode === m.id;
                    return (
                      <button
                        key={m.id} onClick={() => setForm({ ...form, mode: m.id })}
                        className={`p-3 rounded-lg border-2 text-left transition ${form.mode === m.id ? 'border-teal-600 bg-teal-50 dark:bg-slate-800/60' : 'border-slate-200 hover:border-slate-300 bg-white dark:bg-slate-800'}`}
                      >
                        <Icon
                          className="w-4 h-4 mb-1.5"
                          style={{ color: selected ? '#c2410c' : '#374151' }}
                        />
                        <div
                          className="text-sm font-semibold"
                          style={{ color: selected ? '#111827' : '#111827' }}
                        >
                          {m.label}
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: '#4b5563' }}>
                          {m.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Time</label>
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Duration (minutes)</label>
                  <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Target Department</label>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none">
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {(form.mode === 'offline') && (
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Venue</label>
                  <input type="text" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="e.g., Training Hall A, Admin Block" className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              )}

              {(form.mode === 'online' || form.mode === 'third_party') && (
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">{form.mode === 'online' ? 'Meeting Link' : 'Course URL'}</label>
                  <input type="url" value={form.meetingLink} onChange={(e) => setForm({ ...form, meetingLink: e.target.value })} placeholder="https://..." className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Instructor Name</label>
                  <input type="text" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="Full name" className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Department</label>
                  <input type="text" value={form.instructorDept} onChange={(e) => setForm({ ...form, instructorDept: e.target.value })} placeholder="e.g., Safety & Training" className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Designation</label>
                  <input type="text" value={form.instructorDesignation} onChange={(e) => setForm({ ...form, instructorDesignation: e.target.value })} placeholder="e.g., Senior Trainer" className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Aim & Objectives</label>
                <textarea value={form.aim} onChange={(e) => setForm({ ...form, aim: e.target.value })} rows={3} placeholder="What will participants learn? What is the goal of this session?" className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none resize-none" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Select Participants</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Choose employees and labours from the SAP-synced workforce directory</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="teal">{selectedParticipants.length} selected</Badge>
                  {employeeCount > 0 && <Badge color="slate">{employeeCount} employees</Badge>}
                  {labourCount > 0 && <Badge color="orange">{labourCount} labours</Badge>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or employee ID..." className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none">
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none">
                  <option value="all">All Types</option>
                  <option value="employee">Employees</option>
                  <option value="labour">Labours</option>
                </select>
                <button onClick={selectAllFiltered} className="px-3 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition">
                  Select All ({filteredWorkforce.length})
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 grid grid-cols-12 gap-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Name</div>
                    <div className="col-span-2">Emp ID</div>
                    <div className="col-span-3">Department</div>
                    <div className="col-span-2">Designation</div>
                    <div className="col-span-1">Type</div>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {filteredWorkforce.map(w => {
                      const sel = selectedParticipants.includes(w.id);
                      return (
                        <div key={w.id} onClick={() => toggleParticipant(w.id)}
                          className={`px-4 py-3 grid grid-cols-12 gap-3 items-center text-sm cursor-pointer border-b border-slate-100 last:border-b-0 transition ${sel ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                          <div className="col-span-1">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${sel ? 'bg-teal-600 border-teal-600' : 'border-slate-300'}`}>
                              {sel && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>
                          </div>
                          <div className="col-span-3 font-medium text-slate-900">{w.name}</div>
                          <div className="col-span-2 text-slate-600 font-mono text-[12px]">{w.empId}</div>
                          <div className="col-span-3 text-slate-600">{w.dept}</div>
                          <div className="col-span-2 text-slate-600 text-[13px]">{w.designation}</div>
                          <div className="col-span-1">
                            <Badge color={w.type === 'labour' ? 'orange' : 'slate'}>{w.type === 'labour' ? 'Labour' : 'Emp'}</Badge>
                          </div>
                        </div>
                      );
                    })}
                    {filteredWorkforce.length === 0 && (
                      <div className="py-12 text-center text-sm text-slate-500">No matching workforce records</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {getModeIcon(form.mode)}
                  </div>
                  <div className="flex-1">
                    <Badge color="teal">{getModeLabel(form.mode)}</Badge>
                    <h3 className="text-lg font-bold text-slate-900 mt-1.5">{form.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{form.aim}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Schedule</div>
                  <div className="text-sm text-slate-900 font-medium">{formatDate(form.date)} at {form.time}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Duration: {form.duration} minutes</div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">{form.mode === 'offline' ? 'Venue' : 'Link'}</div>
                  <div className="text-sm text-slate-900 font-medium truncate">{form.mode === 'offline' ? form.venue : form.meetingLink}</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Instructor</div>
                <div className="text-sm text-slate-900 font-medium">{form.instructor}</div>
                <div className="text-xs text-slate-500 mt-0.5">{form.instructorDesignation} — {form.instructorDept}</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Participants</div>
                  <div className="flex gap-2">
                    <Badge color="teal">{selectedParticipants.length} total</Badge>
                    {employeeCount > 0 && <Badge color="slate">{employeeCount} emp</Badge>}
                    {labourCount > 0 && <Badge color="orange">{labourCount} labours</Badge>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {selectedParticipants.map(id => {
                    const w = WORKFORCE.find(p => p.id === id);
                    return w ? <span key={id} className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 text-[12px] rounded">{w.name}</span> : null;
                  })}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-amber-900">Notifications will be triggered automatically</div>
                    <ul className="text-xs text-amber-800 mt-1.5 space-y-1">
                      <li>• Immediate notification to all {selectedParticipants.length} participants (Email + SMS)</li>
                      <li>• 24-hour reminder on {form.date && formatDate(form.date)}</li>
                      <li>• 2-hour final reminder before session starts</li>
                      {labourCount > 0 && <li>• {labourCount} labour participants will receive SMS-only notifications</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button onClick={step === 1 ? onClose : () => setStep(step - 1)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <div className="flex gap-2">
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !canProceedStep1) || (step === 2 && selectedParticipants.length === 0)}
                className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            ) : (
              <button onClick={handleSchedule} className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition flex items-center gap-2">
                <Send className="w-4 h-4" /> Schedule & Send Notifications
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NOTIFICATION TOAST
// ============================================================================

const NotificationLog = ({ log, onClose }) => (
  <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Notifications Sent</h2>
          <p className="text-[12px] text-teal-100 mt-0.5">{log.length} messages dispatched via Email & SMS gateway</p>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-2">
        {log.map((entry, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-3.5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center">
                  {entry.channel === 'email' ? <Mail className="w-3.5 h-3.5 text-teal-700" /> : <Phone className="w-3.5 h-3.5 text-teal-700" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{entry.recipient}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{entry.channel === 'email' ? entry.email : entry.phone}</div>
                </div>
              </div>
              <Badge color="green"><Check className="w-3 h-3" /> Delivered</Badge>
            </div>
            <div className="text-[12px] text-slate-600 bg-slate-50 px-3 py-2 rounded border border-slate-100">
              {entry.message}
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[12px] text-slate-600 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5" />
        Reminders will auto-trigger 24h and 2h before session start time.
      </div>
    </div>
  </div>
);

// ============================================================================
// SESSION DETAIL PANEL
// ============================================================================

const SessionDetailPanel = ({ session, onClose, role, onRequest }) => {
  if (!session) return null;
  const participants = session.participants.map(id => WORKFORCE.find(w => w.id === id)).filter(Boolean);
  const labourCount = participants.filter(p => p.type === 'labour').length;
  const employeeCount = participants.length - labourCount;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge color="teal">{getModeLabel(session.mode)}</Badge>
              {session.status === 'completed' && <Badge color="green">Completed</Badge>}
              {session.status === 'scheduled' && <Badge color="blue">Scheduled</Badge>}
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">{session.title}</h2>
          </div>
          <div className="flex gap-2">
            {['super_admin', 'hr'].includes(role) && session.status === 'scheduled' && (
              <button className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-700 transition flex items-center gap-1 text-sm font-medium">
                <Edit className="w-4 h-4" /> <span className="hidden sm:inline">Edit</span>
              </button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-700 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Aim & Objectives</div>
            <p className="text-sm text-slate-700 leading-relaxed">{session.aim}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1"><Calendar className="w-3 h-3" /> Date & Time</div>
              <div className="text-sm font-semibold text-slate-900">{formatDate(session.date)}</div>
              <div className="text-xs text-slate-600">{session.time} • {session.duration} min</div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{session.mode === 'offline' ? <MapPin className="w-3 h-3" /> : <Video className="w-3 h-3" />} {session.mode === 'offline' ? 'Venue' : 'Link'}</div>
              <div className="text-sm font-semibold text-slate-900 truncate">{session.mode === 'offline' ? session.venue : session.meetingLink}</div>
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-3.5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2"><GraduationCap className="w-3 h-3" /> Instructor</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm">
                {session.instructor.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{session.instructor}</div>
                <div className="text-xs text-slate-600">{session.instructorDesignation} • {session.instructorDept}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Participants ({participants.length})</div>
              <div className="flex gap-1.5">
                {employeeCount > 0 && <Badge color="slate">{employeeCount} emp</Badge>}
                {labourCount > 0 && <Badge color="orange">{labourCount} labours</Badge>}
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
              {participants.map(p => (
                <div key={p.id} className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 last:border-b-0">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.empId} • {p.designation}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {['super_admin', 'hr'].includes(role) && session.status === 'scheduled' && (
                      <div className="relative group">
                        <button className="text-[10px] uppercase px-2 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded border border-teal-200 transition font-bold tracking-wider">
                          Notify
                        </button>
                        <div className="absolute right-0 mt-1 hidden group-hover:flex flex-col bg-white border border-slate-200 shadow-lg rounded py-1 z-10 w-24">
                          <button onClick={() => alert(`Email sent to ${p.name}`)} className="text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium">
                            <Mail className="w-3 h-3"/> Email
                          </button>
                          <button onClick={() => alert(`SMS sent to ${p.name}`)} className="text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium">
                            <Smartphone className="w-3 h-3"/> SMS
                          </button>
                        </div>
                      </div>
                    )}
                    <Badge color={p.type === 'labour' ? 'orange' : 'slate'}>{p.type === 'labour' ? 'Labour' : 'Emp'}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {session.mode === 'offline' && session.status === 'scheduled' && (role === 'instructor' || role === 'super_admin') && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Camera className="w-4 h-4 text-amber-700" />
                <div className="text-sm font-semibold text-amber-900">Attendance Capture (Offline)</div>
              </div>
              <p className="text-xs text-amber-800">On the day of the session, the instructor can upload group photos. Face recognition will auto-match participants against registered profiles.</p>
            </div>
          )}

          {session.status === 'scheduled' && (role === 'employee' || role === 'labour') && (
            <div className="pt-2 flex gap-3">
              <button onClick={() => onRequest(session, 'unavailability')} className="flex-1 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-sm rounded-lg border border-red-200 transition">
                Request Unavailability
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// REQUEST MODAL
// ============================================================================

const RequestModal = ({ session, type, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{type === 'unavailability' ? 'Request Unavailability' : 'Join Request'}</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700">
            <strong>Session:</strong> {session.title}<br />
            <strong>Date:</strong> {formatDate(session.date)}
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Reason</label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="Provide a reason for this request..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none" />
          </div>
        </div>
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition">Cancel</button>
          <button onClick={() => onSubmit(reason)} disabled={!reason.trim()} className="px-4 py-1.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition disabled:opacity-50">Submit Request</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// REPORT MODAL
// ============================================================================

const ReportModal = ({ session, onClose }) => {
  if (!session) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge color="green">Post-Training Report</Badge>
              <Badge color="slate">{formatDate(session.date)}</Badge>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">{session.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Instructor</div>
              <div className="text-sm font-semibold text-slate-900">{session.instructor}</div>
              <div className="text-xs text-slate-600">{session.instructorDesignation}</div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Attendance</div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-green-700">{session.attendance?.present || 0} Present</span>
                <span className="text-sm font-semibold text-red-700">{session.attendance?.absent || 0} Absent</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Training Aim</div>
            <p className="text-sm text-slate-700 leading-relaxed border border-slate-200 rounded-lg p-3.5">{session.aim}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <FileText className="w-5 h-5 text-amber-700 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-amber-900 mb-1">Detailed Report Generation</div>
              <p className="text-xs text-amber-800 leading-relaxed">This is a summary view. The full downloadable report functionality (including individual scores and feedback) is scheduled for future implementation.</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition">Close</button>
          <button onClick={() => alert('Download feature coming soon!')} className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition shadow-sm">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [currentRole, setCurrentRole] = useState('super_admin');
  const [activeView, setActiveView] = useState('dashboard');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSession, setRequestSession] = useState(null);
  const [requestType, setRequestType] = useState('unavailability');
  const [notifLog, setNotifLog] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved !== null ? saved === 'dark' : false;
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const user = CURRENT_USERS[currentRole];
  const role = ROLES[Object.keys(ROLES).find(k => ROLES[k].id === currentRole)];

  const handleScheduleSession = (newSession, participantIds) => {
    setSessions([newSession, ...sessions]);
    const log = [];
    participantIds.forEach(pid => {
      const p = WORKFORCE.find(w => w.id === pid);
      if (!p) return;
      const msg = `Training Alert: You are scheduled for "${newSession.title}" on ${formatDate(newSession.date)} at ${newSession.time}. ${newSession.mode === 'offline' ? `Venue: ${newSession.venue}` : `Link: ${newSession.meetingLink}`}. Trainer: ${newSession.instructor}.`;
      if (p.email !== '-') log.push({ recipient: p.name, channel: 'email', email: p.email, message: msg });
      log.push({ recipient: p.name, channel: 'sms', phone: p.phone, message: msg });
    });
    setShowScheduleModal(false);
    setNotifLog(log);
  };

  // Filter sessions based on role
  const visibleSessions = useMemo(() => {
    if (currentRole === 'employee' || currentRole === 'labour') {
      const userId = WORKFORCE.find(w => w.empId === user.empId)?.id;
      return sessions.filter(s => s.participants.includes(userId));
    }
    if (currentRole === 'instructor') {
      return sessions.filter(s => s.instructor === user.name);
    }
    if (currentRole === 'hod' || currentRole === 'hr') {
      return sessions.filter(s => s.department === user.dept || s.department === 'all');
    }
    return sessions;
  }, [sessions, currentRole, user]);

  const upcomingSessions = visibleSessions.filter(s => s.status === 'scheduled');
  const completedSessions = visibleSessions.filter(s => s.status === 'completed');

  const stats = {
    total: visibleSessions.length,
    upcoming: upcomingSessions.length,
    completed: completedSessions.length,
    participants: [...new Set(visibleSessions.flatMap(s => s.participants))].length
  };

  // Role-specific menu items
  const menuItems = useMemo(() => {
    const base = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }];
    if (['super_admin', 'hr'].includes(currentRole)) {
      base.push(
        { id: 'sessions', label: 'All Sessions', icon: Calendar },
        { id: 'requests', label: 'Requests', icon: ClipboardList },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'reports', label: 'Reports', icon: FileText }
      );
    } else if (currentRole === 'hod') {
      base.push(
        { id: 'sessions', label: 'Department Sessions', icon: Calendar },
        { id: 'requests', label: 'Approvals', icon: ClipboardList },
        { id: 'reports', label: 'Reports', icon: FileText }
      );
    } else if (currentRole === 'instructor') {
      base.push(
        { id: 'sessions', label: 'My Sessions', icon: Calendar },
        { id: 'attendance', label: 'Attendance', icon: Camera }
      );
    } else {
      base.push(
        { id: 'sessions', label: 'My Trainings', icon: Calendar },
        { id: 'requests', label: 'My Requests', icon: ClipboardList }
      );
    }
    return base;
  }, [currentRole]);

  const canSchedule = ['super_admin', 'hr'].includes(currentRole);

  return (
    <div className="min-h-screen bg-slate-100/60 flex overflow-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" }}>
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar — hardcoded dark colors so they stay dark in both light & dark theme */}
      <aside
        className={`w-64 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#0f172a', borderRight: '1px solid #1e293b' }}
      >
        {/* Logo area with orange→teal accent strip */}
        <div className="px-5 py-5 relative" style={{ borderBottom: '1px solid #1e293b' }}>
          <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'linear-gradient(to bottom, #f97316, #0d9488)' }} />
          <Logo dark />
        </div>

        {/* Role switcher */}
        <div className="p-3" style={{ borderBottom: '1px solid #1e293b' }}>
          <div className="text-[10px] uppercase tracking-widest font-semibold px-3 mb-2" style={{ color: '#475569' }}>Demo Mode</div>
          <button onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-all"
            style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#334155'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1e293b'}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg ${roleStyles[role.color]?.softBg || 'bg-slate-500/20'} flex items-center justify-center`}>
                <role.icon className={`w-3.5 h-3.5 ${roleStyles[role.color]?.text || 'text-slate-400'}`} />
              </div>
              <div className="text-left">
                <div className="text-[12px] font-semibold leading-tight" style={{ color: '#f1f5f9' }}>{role.name}</div>
                <div className="text-[10px]" style={{ color: '#64748b' }}>Switch role</div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${roleSwitcherOpen ? 'rotate-180' : ''}`} style={{ color: '#64748b' }} />
          </button>

          {roleSwitcherOpen && (
            <div className="mt-2 rounded-lg shadow-2xl overflow-hidden" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              {Object.values(ROLES).map(r => {
                const RIcon = r.icon;
                const active = currentRole === r.id;
                return (
                  <button key={r.id} onClick={() => { setCurrentRole(r.id); setActiveView('dashboard'); setRoleSwitcherOpen(false); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all`}
                    style={{ backgroundColor: active ? 'rgba(13,148,136,0.15)' : 'transparent' }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#334155'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <div className={`w-6 h-6 rounded-md ${roleStyles[r.color]?.softBg || 'bg-slate-500/20'} flex items-center justify-center`}>
                      <RIcon className={`w-3 h-3 ${roleStyles[r.color]?.text || 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[12px] font-semibold" style={{ color: active ? '#5eead4' : '#e2e8f0' }}>{r.name}</div>
                      <div className="text-[10px]" style={{ color: active ? '#2dd4bf' : '#64748b' }}>{r.label}</div>
                    </div>
                    {active && <Check className="w-3.5 h-3.5" style={{ color: '#2dd4bf' }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-widest font-semibold px-3 mb-2 mt-1" style={{ color: '#475569' }}>Menu</div>
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveView(item.id); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all"
                style={{
                  backgroundColor: active ? '#0d9488' : 'transparent',
                  color: active ? '#ffffff' : '#94a3b8',
                  boxShadow: active ? '0 2px 8px rgba(13,148,136,0.3)' : 'none',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#f1f5f9'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? '#ffffff' : '#64748b' }} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom user card */}
        <div className="p-3" style={{ borderTop: '1px solid #1e293b' }}>
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${roleStyles[role.color]?.avatarGradient || 'from-slate-500 to-slate-700'} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold truncate" style={{ color: '#f1f5f9' }}>{user.name}</div>
              <div className="text-[10px] truncate" style={{ color: '#64748b' }}>{user.designation}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 shadow-sm px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-400 hover:bg-slate-100 rounded-lg md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-[15px] font-bold text-slate-900 tracking-tight">
                {activeView === 'dashboard' && 'Dashboard'}
                {activeView === 'sessions' && (currentRole === 'employee' || currentRole === 'labour' ? 'My Trainings' : currentRole === 'instructor' ? 'My Sessions' : currentRole === 'hod' ? 'Department Sessions' : 'All Sessions')}
                {activeView === 'workforce' && 'Workforce Directory'}
                {activeView === 'notifications' && 'Notifications'}
                {activeView === 'reports' && 'Reports'}
                {activeView === 'attendance' && 'Attendance Capture'}
                {activeView === 'requests' && (['employee', 'labour'].includes(currentRole) ? 'My Requests' : 'Pending Approvals')}
              </h1>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block tracking-wide">UltraTech Cement — Rawan Cement Works</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition">
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            {canSchedule && (
              <button onClick={() => setShowScheduleModal(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-md shadow-teal-500/25 flex items-center gap-1.5 whitespace-nowrap">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Schedule Session</span>
                <span className="sm:hidden">Schedule</span>
              </button>
            )}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 ml-1">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleStyles[role.color]?.avatarGradient2 || 'from-slate-400 to-slate-600'} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ${roleStyles[role.color]?.ring || 'ring-slate-100'}`}>
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="hidden sm:block">
                <div className="text-[13px] font-semibold text-slate-900 leading-tight">{user.name}</div>
                <div className="text-[11px] text-slate-400 font-medium">{user.designation}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Sessions" value={stats.total} sub="Visible to your role" accent />
            <StatCard label="Upcoming" value={stats.upcoming} sub="Scheduled sessions" />
            <StatCard label="Completed" value={stats.completed} sub="Completed sessions" />
          </div>

          {activeView === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Upcoming Sessions</h2>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{upcomingSessions.length} scheduled</span>
                  </div>

                  <div className="space-y-2.5">
                    {visibleSessions.map(s => (
                      <div key={s.id}
                        className="flex items-center gap-3 p-3.5 border border-slate-100 rounded-xl bg-white hover:border-teal-200 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer group"
                        onClick={() => setSelectedSession(s)}>
                        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-teal-500 to-teal-700 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-slate-900 leading-tight truncate">{s.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{formatDate(s.date)} · {s.time} · {getModeLabel(s.mode)}</div>
                        </div>
                        <div className="text-right hidden sm:block flex-shrink-0">
                          <div className="text-[12px] font-semibold text-slate-700">{s.instructor}</div>
                          <div className="text-[11px] text-slate-400">{s.instructorDesignation}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 flex-shrink-0 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                  <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4">Workforce</h3>
                  <div className="space-y-3">
                    {WORKFORCE.slice(0, 6).map(w => (
                      <div key={w.id} className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-slate-900 truncate">{w.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{w.designation} · {w.dept}</div>
                        </div>
                        <Badge color={w.type === 'labour' ? 'orange' : 'slate'}>{w.type === 'labour' ? 'Labour' : 'Emp'}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                  <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-3">Notifications</h3>
                  <p className="text-[12px] text-slate-400 font-medium">{notifLog ? `${notifLog.length} messages sent` : 'No notifications sent yet'}</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'sessions' && (
            <div>
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4">All Sessions</h2>
                <div className="space-y-2.5">
                  {visibleSessions.map(s => (
                    <div key={s.id}
                      className="flex items-center gap-3 p-3.5 border border-slate-100 rounded-xl bg-white hover:border-teal-200 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer group"
                      onClick={() => setSelectedSession(s)}>
                      <div className={`w-1 h-10 rounded-full flex-shrink-0 ${s.status === 'completed' ? 'bg-gradient-to-b from-slate-400 to-slate-500' : 'bg-gradient-to-b from-orange-500 to-orange-700'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-slate-900 truncate">{s.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{formatDate(s.date)} · {s.time}</div>
                      </div>
                      <Badge color={s.status === 'completed' ? 'slate' : 'teal'}>{getModeLabel(s.mode)}</Badge>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 flex-shrink-0 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'requests' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Request Tracker</h2>
                <Badge color="blue">{requests.length} total</Badge>
              </div>
              <div className="divide-y divide-slate-100">
                {requests.map(req => {
                  const reqSession = sessions.find(s => s.id === req.sessionId);
                  const reqUser = WORKFORCE.find(w => w.id === req.userId);
                  if (!reqSession || !reqUser) return null;

                  // Filter for user role
                  if (['employee', 'labour'].includes(currentRole) && reqUser.empId !== user.empId) return null;
                  if (currentRole === 'hod' && reqUser.dept !== user.dept) return null;

                  return (
                    <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge color={req.type === 'unavailability' ? 'red' : 'green'}>
                            {req.type === 'unavailability' ? 'Unavailability' : 'Join Request'}
                          </Badge>
                          <span className="text-xs text-slate-500 font-medium">{formatDate(req.date)}</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">{reqSession.title}</div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          Requested by <strong>{reqUser.name}</strong> ({reqUser.designation})
                        </div>
                        <div className="text-sm text-slate-700 mt-2 bg-slate-50 p-2 rounded border border-slate-100">
                          "{req.reason}"
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <div className="text-xs text-slate-600 flex justify-between">
                          <span>HoD Approval:</span>
                          <span className={`font-semibold ${req.deptHeadApproval === 'approved' ? 'text-green-600' : req.deptHeadApproval === 'rejected' ? 'text-red-600' : 'text-amber-600'}`}>{req.deptHeadApproval.toUpperCase()}</span>
                        </div>
                        <div className="text-xs text-slate-600 flex justify-between">
                          <span>Admin Approval:</span>
                          <span className={`font-semibold ${req.adminApproval === 'approved' ? 'text-green-600' : req.adminApproval === 'rejected' ? 'text-red-600' : 'text-amber-600'}`}>{req.adminApproval.toUpperCase()}</span>
                        </div>

                        {currentRole === 'hod' && req.deptHeadApproval === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => setRequests(prev => prev.map(r => r.id === req.id ? { ...r, deptHeadApproval: 'approved' } : r))} className="flex-1 py-1.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded hover:bg-teal-100">Approve</button>
                            <button onClick={() => setRequests(prev => prev.map(r => r.id === req.id ? { ...r, deptHeadApproval: 'rejected', status: 'rejected' } : r))} className="flex-1 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded hover:bg-red-100">Reject</button>
                          </div>
                        )}
                        {['super_admin', 'hr'].includes(currentRole) && req.deptHeadApproval === 'approved' && req.adminApproval === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => setRequests(prev => prev.map(r => r.id === req.id ? { ...r, adminApproval: 'approved', status: 'approved' } : r))} className="flex-1 py-1.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded hover:bg-teal-100">Finalize</button>
                            <button onClick={() => setRequests(prev => prev.map(r => r.id === req.id ? { ...r, adminApproval: 'rejected', status: 'rejected' } : r))} className="flex-1 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded hover:bg-red-100">Reject</button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {requests.filter(req => {
                  const reqUser = WORKFORCE.find(w => w.id === req.userId);
                  if (!reqUser) return false;
                  if (['employee', 'labour'].includes(currentRole)) return reqUser.empId === user.empId;
                  if (currentRole === 'hod') return reqUser.dept === user.dept;
                  return true;
                }).length === 0 && (
                    <div className="p-8 text-center text-sm text-slate-500">No requests found.</div>
                  )}
              </div>
            </div>
          )}

          {activeView === 'reports' && (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Post-Training Reports</h2>
                <Badge color="green">{completedSessions.length} generated</Badge>
              </div>
              <div className="p-4 space-y-4">
                {completedSessions.map(s => (
                  <div key={s.id} className="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge color="green">Completed</Badge>
                        <span className="text-[12px] text-slate-500 font-medium">{formatDate(s.date)}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                      <div className="text-[13px] text-slate-600 mt-1">Instructor: {s.instructor}</div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="text-[11px] font-medium px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">
                          Total Scheduled: {s.participants.length}
                        </div>
                        {s.attendance && (
                          <>
                            <div className="text-[11px] font-medium px-2 py-1 bg-green-50 border border-green-200 rounded text-green-700">
                              Present: {s.attendance.present}
                            </div>
                            <div className="text-[11px] font-medium px-2 py-1 bg-red-50 border border-red-200 rounded text-red-700">
                              Absent: {s.attendance.absent}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <button onClick={() => setSelectedReport(s)} className="w-full sm:w-auto px-4 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:border-teal-300 border border-teal-200 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition shadow-sm">
                        <FileText className="w-4 h-4" /> View Report
                      </button>
                    </div>
                  </div>
                ))}
                {completedSessions.length === 0 && (
                  <div className="py-8 text-center text-sm text-slate-500">No completed sessions found for report generation.</div>
                )}
              </div>
            </div>
          )}

          {showScheduleModal && <ScheduleSessionModal onClose={() => setShowScheduleModal(false)} onSchedule={handleScheduleSession} />}
          {notifLog && <NotificationLog log={notifLog} onClose={() => setNotifLog(null)} />}
          {selectedSession && (
            <SessionDetailPanel
              session={selectedSession}
              onClose={() => setSelectedSession(null)}
              role={currentRole}
              onRequest={(s, type) => {
                setRequestSession(s);
                setRequestType(type);
                setShowRequestModal(true);
                setSelectedSession(null);
              }}
            />
          )}
          {showRequestModal && (
            <RequestModal
              session={requestSession}
              type={requestType}
              onClose={() => setShowRequestModal(false)}
              onSubmit={(reason) => {
                setRequests([{
                  id: Date.now(),
                  type: requestType,
                  userId: WORKFORCE.find(w => w.empId === user.empId)?.id,
                  sessionId: requestSession.id,
                  reason,
                  deptHeadApproval: currentRole === 'hod' ? 'approved' : 'pending',
                  adminApproval: 'pending',
                  status: 'pending',
                  date: new Date().toISOString()
                }, ...requests]);
                setShowRequestModal(false);
                alert(`${requestType === 'unavailability' ? 'Unavailability' : 'Join'} request submitted.`);
              }}
            />
          )}
          {selectedReport && (
            <ReportModal
              session={selectedReport}
              onClose={() => setSelectedReport(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
