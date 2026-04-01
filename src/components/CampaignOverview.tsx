import React from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Target,
  ChevronRight,
  Send,
  Play,
  Edit2,
  Trash2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar as CalendarIcon,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', reach: 4000, engagement: 2400 },
  { name: 'Tue', reach: 3000, engagement: 1398 },
  { name: 'Wed', reach: 2000, engagement: 9800 },
  { name: 'Thu', reach: 2780, engagement: 3908 },
  { name: 'Fri', reach: 1890, engagement: 4800 },
  { name: 'Sat', reach: 2390, engagement: 3800 },
  { name: 'Sun', reach: 3490, engagement: 4300 },
];

const platformData = [
  { name: 'Instagram', value: 45, color: '#A855F7' },
  { name: 'Facebook', value: 25, color: '#2563EB' },
  { name: 'Twitter', value: 20, color: '#38BDF8' },
  { name: 'LinkedIn', value: 10, color: '#1E40AF' },
];

export const CampaignOverview: React.FC = () => {
  const metrics = [
    { label: 'Content Progress', value: '2/89', sub: 'Published', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+12%', isUp: true },
    { label: 'Engagement', value: '2.8k', sub: 'Interactions', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50', trend: '+5.4%', isUp: true },
    { label: 'Total Reach', value: '12k', sub: 'People', icon: Eye, color: 'text-orange-500', bg: 'bg-orange-50', trend: '-2.1%', isUp: false },
    { label: 'Conversion', value: '3.2%', sub: 'Rate', icon: Target, color: 'text-brand', bg: 'bg-brand/10', trend: '+0.8%', isUp: true },
  ];

  const upcomingPosts = [
    { id: 1, platform: 'instagram', time: 'Today, 4:00 PM', title: 'Summer Collection Teaser', image: 'https://picsum.photos/seed/teaser/100/100' },
    { id: 2, platform: 'twitter', time: 'Tomorrow, 10:00 AM', title: 'Early Access Announcement', image: 'https://picsum.photos/seed/early/100/100' },
    { id: 3, platform: 'facebook', time: 'Tomorrow, 2:00 PM', title: 'Customer Spotlight: Sarah J.', image: 'https://picsum.photos/seed/sarah/100/100' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <span>Campaigns</span>
            <ChevronRight size={10} />
            <span className="text-brand">Summer Launch 2024</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Summer Collection Launch</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-200 shrink-0">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
              Draft Mode
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Edit2 size={14} /> Edit Campaign
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-brand-gradient rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-brand/20 active:scale-95">
            <Send size={14} /> Submit for Approval
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Stats Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <motion.div 
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 ${m.bg} opacity-20 rounded-bl-[40px] -mr-4 -mt-4 transition-all group-hover:scale-150`}></div>
                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-xl ${m.bg} ${m.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <m.icon size={20} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-black text-slate-900">{m.value}</h3>
                    <div className={`flex items-center text-[10px] font-bold ${m.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {m.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {m.trend}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-4 md:p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Campaign Performance</h3>
                <p className="text-xs text-slate-500 font-medium">Reach vs Engagement over the last 7 days</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand rounded-full"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reach</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Engagement</span>
                </div>
              </div>
            </div>
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
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
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#FF6321" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorReach)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#e2e8f0" 
                    strokeWidth={2}
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Platform Distribution</h3>
              <div className="space-y-6">
                {platformData.map((p) => (
                  <div key={p.name} className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-500">{p.name}</span>
                      <span className="text-slate-900">{p.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${p.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: p.color }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-6 md:p-8 rounded-[32px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:scale-150"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp size={24} className="text-brand" />
                </div>
                <h3 className="text-2xl font-black mb-2">AI Insights</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-8 flex-1">
                  Your engagement on <span className="text-white font-bold">Instagram</span> is 24% higher than average. Consider increasing your posting frequency there for the next 48 hours.
                </p>
                <button className="w-full py-3 bg-white text-slate-900 text-xs font-bold rounded-2xl hover:bg-brand hover:text-white transition-all active:scale-95">
                  View Full Analysis
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-900">Campaign Health</h3>
              <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-slate-100 flex items-center justify-center text-[10px] font-black text-emerald-500">
                82%
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Assets Ready</p>
                  <p className="text-[10px] text-slate-500 font-medium">89/89 pieces approved</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Scheduling</p>
                  <p className="text-[10px] text-slate-500 font-medium">12 posts pending time slots</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Content */}
          <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-900">Upcoming Content</h3>
              <button className="text-[10px] font-bold text-brand uppercase tracking-widest hover:underline">View Calendar</button>
            </div>
            <div className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="group flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {post.platform === 'instagram' && <Instagram size={12} className="text-purple-500" />}
                      {post.platform === 'twitter' && <Twitter size={12} className="text-sky-400" />}
                      {post.platform === 'facebook' && <Facebook size={12} className="text-blue-600" />}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.time}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate group-hover:text-brand transition-colors">{post.title}</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold rounded-2xl hover:border-brand hover:text-brand transition-all flex items-center justify-center gap-2">
              <Plus size={16} /> Schedule New Post
            </button>
          </div>

          {/* Team Activity */}
          <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { user: 'Alex M.', action: 'approved', target: 'Summer Teaser', time: '2m ago' },
                { user: 'Sarah K.', action: 'commented on', target: 'Product Story', time: '15m ago' },
                { user: 'System', action: 'scheduled', target: 'Weekly Update', time: '1h ago' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-[10px] font-black text-slate-400">
                    {activity.user[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-600 leading-tight">
                      <span className="font-black text-slate-900">{activity.user}</span> {activity.action} <span className="font-bold text-slate-900">{activity.target}</span>
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
