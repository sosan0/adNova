import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MoreHorizontal,
  Check,
  AlertTriangle,
  FileEdit,
  X,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CalendarProps {
  onCreatePost?: (platforms: string[]) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onCreatePost }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook', 'twitter', 'linkedin']);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: number | null, end: number | null }>({ start: null, end: null });
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [newPostPlatforms, setNewPostPlatforms] = useState<string[]>(['instagram']);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // Mock dates for grid

  const platforms = [
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-purple-500', bg: 'bg-purple-50', activeBg: 'bg-purple-500' },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50', activeBg: 'bg-blue-600' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-50', activeBg: 'bg-sky-400' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-800', bg: 'bg-blue-50', activeBg: 'bg-blue-800' },
  ];

  const [posts, setPosts] = useState([
    { 
      id: 1,
      day: 15, 
      time: '09:30 AM', 
      platform: 'instagram', 
      color: 'bg-purple-500', 
      status: 'published',
      caption: 'Unveiling our new summer collection! ☀️ #SummerVibes #Fashion',
      image: 'https://picsum.photos/seed/summer/200/200'
    },
    { 
      id: 2,
      day: 15, 
      time: '11:00 AM', 
      platform: 'facebook', 
      color: 'bg-blue-600', 
      status: 'draft',
      caption: 'Join us for our upcoming store opening event! 🎊',
      image: 'https://picsum.photos/seed/store/200/200'
    },
    { 
      id: 3,
      day: 16, 
      time: '10:00 AM', 
      platform: 'twitter', 
      color: 'bg-sky-400', 
      status: 'scheduled',
      caption: 'Tech tips of the week: How to optimize your workflow. 💻 #TechTips',
      image: 'https://picsum.photos/seed/tech/200/200'
    },
    { 
      id: 4,
      day: 17, 
      time: '02:15 PM', 
      platform: 'twitter', 
      color: 'bg-sky-400', 
      status: 'published',
      caption: 'Breaking news: Our latest product is now available! 🚀',
      image: 'https://picsum.photos/seed/launch/200/200'
    },
    { 
      id: 5,
      day: 18, 
      time: '04:30 PM', 
      platform: 'instagram', 
      color: 'bg-purple-500', 
      status: 'failed',
      caption: 'Behind the scenes at our latest photoshoot. 📸',
      image: 'https://picsum.photos/seed/bts/200/200'
    },
    { 
      id: 6,
      day: 20, 
      time: '10:00 AM', 
      platform: 'linkedin', 
      color: 'bg-blue-800', 
      status: 'published',
      caption: 'We are hiring! Join our growing team of innovators. 🤝',
      image: 'https://picsum.photos/seed/hiring/200/200'
    },
    { 
      id: 7,
      day: 22, 
      time: '01:00 PM', 
      platform: 'facebook', 
      color: 'bg-blue-600', 
      status: 'scheduled',
      caption: 'Customer success story: How we helped EcoStyle grow. 📈',
      image: 'https://picsum.photos/seed/success/200/200'
    },
    { 
      id: 8,
      day: 24, 
      time: '10:00 AM', 
      platform: 'instagram', 
      color: 'bg-purple-500', 
      status: 'scheduled',
      caption: 'New product alert! 🚨 Stay tuned for tomorrow.',
      image: 'https://picsum.photos/seed/alert/200/200'
    },
    { 
      id: 9,
      day: 25, 
      time: '11:30 AM', 
      platform: 'twitter', 
      color: 'bg-sky-400', 
      status: 'draft',
      caption: 'Quick tip: Always test your links before posting! 🔗',
      image: 'https://picsum.photos/seed/tip/200/200'
    },
    { 
      id: 10,
      day: 28, 
      time: '05:00 PM', 
      platform: 'linkedin', 
      color: 'bg-blue-800', 
      status: 'scheduled',
      caption: 'Sharing our latest insights on AI in marketing. 🤖 #AI #Marketing',
      image: 'https://picsum.photos/seed/ai/200/200'
    }
  ]);

  const gaps = [
    { day: 16, platform: 'instagram', label: 'Instagram' },
    { day: 18, platform: 'facebook', label: 'Facebook' },
  ];

  const handlePlatformToggle = (id: string) => {
    setNewPostPlatforms(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(p => p !== id) : prev) : [...prev, id]
    );
  };

  const handleContinueToWizard = () => {
    setIsPlatformModalOpen(false);
    if (onCreatePost) {
      onCreatePost(newPostPlatforms);
    }
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 w-64"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-all ${
                showFilters || dateRange.start || dateRange.end
                  ? 'bg-brand/10 border-brand text-brand' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter size={16} /> 
              {dateRange.start && dateRange.end ? `Dec ${dateRange.start} - ${dateRange.end}` : 'Advanced Filters'}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-slate-900">Date Range (Dec 2024)</h4>
                    <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Start Day</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="31"
                          value={dateRange.start || ''}
                          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value ? parseInt(e.target.value) : null }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">End Day</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="31"
                          value={dateRange.end || ''}
                          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value ? parseInt(e.target.value) : null }))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
                          placeholder="31"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => setDateRange({ start: null, end: null })}
                        className="flex-1 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => setShowFilters(false)}
                        className="flex-1 py-2 bg-brand-gradient text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Apply Range
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><ChevronLeft size={20} /></button>
          <span className="text-sm font-bold text-slate-900 px-2">December 2024</span>
          <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><ChevronRight size={20} /></button>
        </div>

        <button 
          onClick={() => setIsPlatformModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} /> Create New Post
        </button>
      </div>

      {/* Platform Multi-select Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Filter Platforms:</span>
        {platforms.map(p => {
          const isActive = selectedPlatforms.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                isActive 
                  ? `${p.activeBg} text-white border-transparent shadow-md shadow-${p.id}/20` 
                  : `bg-white text-slate-500 border-slate-200 hover:border-slate-300`
              }`}
            >
              <p.icon size={14} />
              {p.label}
              {isActive && <Check size={12} className="ml-1" />}
            </button>
          );
        })}
        <button 
          onClick={() => setSelectedPlatforms(platforms.map(p => p.id))}
          className="text-xs font-bold text-brand-dark hover:text-brand transition-colors ml-2"
        >
          Select All
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md relative">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {days.map(day => (
            <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[140px]">
          {dates.map((date, i) => {
            const isCurrentMonth = date > 0 && date <= 31;
            
            // Filter by platform AND date range
            const isInRange = !dateRange.start || !dateRange.end || (date >= dateRange.start && date <= dateRange.end);
            
            const dayPosts = posts.filter(p => p.day === date && selectedPlatforms.includes(p.platform) && isInRange);
            const dayGaps = gaps.filter(g => g.day === date && selectedPlatforms.includes(g.platform) && isInRange);
            
            const isToday = date === 15;
            const hasDrafts = dayPosts.some(p => p.status === 'draft');

            return (
              <div 
                key={i} 
                className={`p-2 border-r border-b border-slate-50 relative group hover:bg-slate-50/50 transition-all ${!isCurrentMonth ? 'bg-slate-50/30' : ''} ${isToday ? 'bg-brand/5' : ''} ${hasDrafts && !isToday ? 'bg-orange-50/40' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full transition-colors ${
                    isToday 
                      ? 'bg-brand-gradient text-white shadow-sm' 
                      : isCurrentMonth ? 'text-slate-900' : 'text-slate-300'
                  }`}>
                    {date > 0 ? date : date + 31}
                  </span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setIsPlatformModalOpen(true)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-brand transition-all"
                      title="Create post for this day"
                    >
                      <Plus size={14} />
                    </button>
                    {hasDrafts && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-100 border border-orange-200 text-orange-700 rounded-md text-[8px] font-black uppercase tracking-tighter animate-pulse shadow-sm" title="Contains draft posts">
                        <FileEdit size={10} />
                        Draft
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 space-y-1.5">
                  {dayPosts.map((p, idx) => {
                    const getStatusStyles = (status: string) => {
                      switch (status) {
                        case 'published': return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' };
                        case 'scheduled': return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' };
                        case 'failed': return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' };
                        case 'draft': return { icon: FileEdit, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' };
                        default: return { icon: CheckCircle2, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-100' };
                      }
                    };

                    const statusStyle = getStatusStyles(p.status);
                    const StatusIcon = statusStyle.icon;

                    return (
                      <div key={idx} className="relative group/post">
                        <div 
                          onClick={() => setEditingPost(p)}
                          className={`flex items-center gap-1.5 p-1.5 bg-white border ${statusStyle.border} rounded-lg shadow-sm hover:border-brand/30 hover:shadow-md transition-all cursor-pointer`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${p.color}`}></div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[9px] font-bold text-slate-700 leading-tight">{p.time}</span>
                            <div className={`flex items-center gap-0.5 text-[7px] font-black uppercase tracking-tighter ${statusStyle.color}`}>
                              <StatusIcon size={8} />
                              {p.status}
                            </div>
                          </div>
                          <div className="ml-auto flex items-center gap-1">
                            {p.platform === 'instagram' && <Instagram size={10} className="text-purple-500" />}
                            {p.platform === 'facebook' && <Facebook size={10} className="text-blue-600" />}
                            {p.platform === 'twitter' && <Twitter size={10} className="text-sky-400" />}
                            {p.platform === 'linkedin' && <Linkedin size={10} className="text-blue-800" />}
                          </div>
                        </div>

                        {/* Hover Preview Tooltip */}
                        <AnimatePresence>
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            whileHover={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover/post:opacity-100 group-hover/post:visible transition-all z-[60] pointer-events-none overflow-hidden"
                          >
                            {p.image && (
                              <div className="h-28 w-full bg-slate-100 relative">
                                <img src={p.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-2.5">
                                <div className={`w-2 h-2 rounded-full ${p.color} ring-4 ring-${p.platform}/10`}></div>
                                <span className="text-[10px] font-bold text-slate-900">{p.time}</span>
                                <span className={`ml-auto text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${statusStyle.bg} ${statusStyle.color} border ${statusStyle.border}`}>
                                  {p.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed italic font-medium">
                                "{p.caption}"
                              </p>
                            </div>
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45"></div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {dayGaps.map((g, idx) => (
                    <div key={idx} className="bg-orange-50 border border-orange-100 px-2 py-1 rounded-lg text-[9px] font-bold text-orange-700 uppercase tracking-tight flex items-center gap-1">
                      <AlertTriangle size={8} />
                      {g.label} Gap
                    </div>
                  ))}
                </div>

                <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-brand transition-all">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlatformModalOpen(true)}
          className="absolute bottom-6 right-6 w-14 h-14 bg-brand-gradient text-white rounded-full shadow-2xl flex items-center justify-center z-30 hover:shadow-brand/40 transition-shadow"
          title="Create New Post"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      {/* Platform Selection Modal */}
      <AnimatePresence>
        {isPlatformModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shadow-sm">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Select Platforms</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Where should this post go?</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPlatformModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {platforms.map((p) => {
                    const isSelected = newPostPlatforms.includes(p.id);
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handlePlatformToggle(p.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                          isSelected 
                            ? `border-brand bg-brand/5` 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? p.activeBg + ' text-white' : p.bg + ' ' + p.color} shadow-sm transition-all`}>
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold text-sm ${isSelected ? 'text-brand' : 'text-slate-700'}`}>{p.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Connect your audience</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'bg-brand border-brand text-white' : 'border-slate-200'
                        }`}>
                          {isSelected && <Check size={14} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleContinueToWizard}
                    className="w-full py-4 bg-brand-gradient text-white font-bold rounded-2xl shadow-lg shadow-brand/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Wizard <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Post?</h3>
              <p className="text-sm text-slate-500 mb-8">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (editingPost) {
                      setPosts(prev => prev.filter(p => p.id !== editingPost.id));
                      setEditingPost(null);
                      setShowDeleteConfirm(false);
                    }
                  }}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Post Modal */}
      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingPost.color} text-white shadow-lg`}>
                    {editingPost.platform === 'instagram' && <Instagram size={20} />}
                    {editingPost.platform === 'facebook' && <Facebook size={20} />}
                    {editingPost.platform === 'twitter' && <Twitter size={20} />}
                    {editingPost.platform === 'linkedin' && <Linkedin size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Edit Post</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{editingPost.platform} • {editingPost.status}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingPost(null)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Caption</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 min-h-[120px] resize-none"
                    value={editingPost.caption}
                    onChange={(e) => setEditingPost({ ...editingPost, caption: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Schedule Time</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
                      value={editingPost.time}
                      onChange={(e) => setEditingPost({ ...editingPost, time: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                    <select 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 appearance-none"
                      value={editingPost.status}
                      onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                {editingPost.image && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Media Preview</label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                      <img src={editingPost.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">Replace Image</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-red-500 text-sm font-bold hover:bg-red-50 rounded-xl transition-colors"
                >
                  Delete Post
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setEditingPost(null)}
                    className="px-6 py-2 text-slate-500 text-sm font-bold hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setPosts(prev => prev.map(p => p.id === editingPost.id ? editingPost : p));
                      setEditingPost(null);
                    }}
                    className="px-8 py-2 bg-brand-gradient text-white text-sm font-bold rounded-xl shadow-lg shadow-brand/20 hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
