import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ChevronRight,
  ExternalLink,
  Download,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Users,
  Target,
  Calendar as CalendarIcon,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const performanceData = [
  { name: 'Week 1', reach: 4000, engagement: 2400 },
  { name: 'Week 2', reach: 3000, engagement: 1398 },
  { name: 'Week 3', reach: 5000, engagement: 9800 },
  { name: 'Week 4', reach: 2780, engagement: 3908 },
];

export const ClientPortalModule: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'approvals' | 'reports'>('overview');

  const approvalItems = [
    { 
      id: 1, 
      title: 'Summer Collection Teaser', 
      platform: 'instagram', 
      type: 'Reel', 
      dueDate: 'Tomorrow', 
      image: 'https://picsum.photos/seed/teaser/400/400',
      caption: 'Get ready for the heat! ☀️ Our Summer Collection drops this Friday. #SummerVibes #NewLaunch'
    },
    { 
      id: 2, 
      title: 'Brand Story: Sustainability', 
      platform: 'linkedin', 
      type: 'Article', 
      dueDate: 'Oct 24', 
      image: 'https://picsum.photos/seed/green/400/400',
      caption: 'At AdNova, we believe in a greener future. Here is how we are changing our packaging...'
    },
  ];

  const recentReports = [
    { id: 1, name: 'September Performance Audit', date: 'Oct 01, 2024', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Q3 Social Strategy Review', date: 'Sep 15, 2024', size: '5.1 MB', type: 'PDF' },
    { id: 3, name: 'Influencer Campaign ROI', date: 'Sep 02, 2024', size: '1.8 MB', type: 'XLSX' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Sosan</h1>
          <p className="text-slate-500 font-medium">Here is what is happening with your brand today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <MessageSquare size={18} /> Chat with Agency
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <CalendarIcon size={18} /> Book Strategy Call
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Approvals</p>
            <h3 className="text-2xl font-black text-slate-900">4 Items</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Campaigns</p>
            <h3 className="text-2xl font-black text-slate-900">2 Live</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Next Post In</p>
            <h3 className="text-2xl font-black text-slate-900">4h 12m</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Approval Queue */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Approval Queue</h3>
                <p className="text-xs text-slate-500 font-medium">Review and approve content for the upcoming week</p>
              </div>
              <button className="text-xs font-bold text-brand uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="p-8 space-y-8">
              {approvalItems.map((item) => (
                <div key={item.id} className="group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-brand/20 transition-all">
                  <div className="md:col-span-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                      <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                        {item.platform === 'instagram' && <Instagram size={12} className="text-purple-500" />}
                        {item.platform === 'linkedin' && <Linkedin size={12} className="text-blue-800" />}
                        {item.type}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due for review: <span className="text-brand">{item.dueDate}</span></p>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 italic">
                      "{item.caption}"
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2 active:scale-95">
                        <ThumbsDown size={14} /> Request Changes
                      </button>
                      <button className="flex-1 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 active:scale-95">
                        <ThumbsUp size={14} /> Approve Post
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900">Performance Summary</h3>
                <p className="text-xs text-slate-500 font-medium">Monthly growth and engagement overview</p>
              </div>
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 focus:outline-none">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorReachClient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#FF6321" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorReachClient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">New Followers</p>
                <h4 className="text-xl font-black text-slate-900">+1,240</h4>
                <span className="text-[10px] font-bold text-emerald-500">+12% vs last month</span>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Engagement</p>
                <h4 className="text-xl font-black text-slate-900">4.8%</h4>
                <span className="text-[10px] font-bold text-emerald-500">+0.5% vs last month</span>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Conversions</p>
                <h4 className="text-xl font-black text-slate-900">312</h4>
                <span className="text-[10px] font-bold text-rose-500">-2% vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Deliverables / Reports */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Deliverables</h3>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand/20 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand shadow-sm transition-colors">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">{report.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{report.date} • {report.size}</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              View All Reports <ChevronRight size={16} />
            </button>
          </div>

          {/* Agency Team */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Your Team</h3>
            <div className="space-y-6">
              {[
                { name: 'Alex Rivera', role: 'Account Manager', image: 'https://i.pravatar.cc/150?u=alex' },
                { name: 'Sarah Chen', role: 'Creative Director', image: 'https://i.pravatar.cc/150?u=sarah' },
                { name: 'Marcus Bell', role: 'Ads Specialist', image: 'https://i.pravatar.cc/150?u=marcus' },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100">
                    <img src={member.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{member.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                  <button className="ml-auto p-2 text-slate-300 hover:text-brand transition-colors">
                    <MessageSquare size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Current Balance</p>
              <h3 className="text-3xl font-black mb-6">$2,450.00</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Next Invoice</span>
                  <span className="font-bold">Nov 01, 2024</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Subscription</span>
                  <span className="font-bold">Pro Agency Plan</span>
                </div>
              </div>
              <button className="w-full py-3 bg-brand text-white text-xs font-bold rounded-2xl hover:bg-brand/90 transition-all active:scale-95">
                Manage Billing
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
