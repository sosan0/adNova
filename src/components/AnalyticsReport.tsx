import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MessageCircle, 
  Share2, 
  Download,
  Calendar as CalendarIcon,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Target,
  Globe,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  { name: 'Instagram', value: 45, color: '#8b5cf6' },
  { name: 'Facebook', value: 25, color: '#2563eb' },
  { name: 'Twitter', value: 15, color: '#38bdf8' },
  { name: 'LinkedIn', value: 15, color: '#1e40af' },
];

const demographicData = [
  { name: '18-24', value: 20 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 25 },
  { name: '45+', value: 10 },
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#22c55e' },
  { name: 'Neutral', value: 25, color: '#94a3b8' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const heatMapData = [
  { day: 'Mon', '00:00': 10, '04:00': 5, '08:00': 45, '12:00': 80, '16:00': 60, '20:00': 30 },
  { day: 'Tue', '00:00': 15, '04:00': 8, '08:00': 50, '12:00': 85, '16:00': 65, '20:00': 35 },
  { day: 'Wed', '00:00': 12, '04:00': 6, '08:00': 48, '12:00': 90, '16:00': 70, '20:00': 40 },
  { day: 'Thu', '00:00': 18, '04:00': 10, '08:00': 55, '12:00': 88, '16:00': 75, '20:00': 45 },
  { day: 'Fri', '00:00': 20, '04:00': 12, '08:00': 60, '12:00': 95, '16:00': 80, '20:00': 50 },
  { day: 'Sat', '00:00': 25, '04:00': 15, '08:00': 40, '12:00': 70, '16:00': 85, '20:00': 60 },
  { day: 'Sun', '00:00': 22, '04:00': 14, '08:00': 35, '12:00': 65, '16:00': 75, '20:00': 55 },
];

export const AnalyticsReport: React.FC = () => {
  const [chartData, setChartData] = useState(data);
  const [liveStats, setLiveStats] = useState({
    reach: '1.2M',
    engagement: '45.8K',
    followers: '82.4K',
    conversion: '3.2%'
  });
  const [isLive, setIsLive] = useState(false);
  
  // Filter States
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [platform, setPlatform] = useState('All Platforms');
  const [campaign, setCampaign] = useState('All Campaigns');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const platforms = [
    { id: 'All Platforms', icon: Globe },
    { id: 'Instagram', icon: InstagramIcon },
    { id: 'Facebook', icon: FacebookIcon },
    { id: 'Twitter', icon: TwitterIcon },
    { id: 'LinkedIn', icon: LinkedinIcon },
  ];

  const campaigns = [
    'All Campaigns',
    'Summer Collection 2024',
    'Tech Innovators Summit',
    'Organic Food Drive',
    'Winter Gear Pre-launch'
  ];

  const dateRanges = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'Year to Date',
    'Custom Range'
  ];

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('Connected to analytics stream');
      setIsLive(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'ANALYTICS_UPDATE') {
          const { reach, engagement, timestamp, stats } = message.data;
          
          setChartData(prev => {
            const newData = [...prev.slice(1), { name: timestamp, reach, engagement }];
            return newData;
          });

          setLiveStats(stats);
        }
      } catch (err) {
        console.error('Error parsing analytics update:', err);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from analytics stream');
      setIsLive(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">Performance Analytics</h1>
              {isLive && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100 shrink-0">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                  Live
                </div>
              )}
            </div>
            <p className="text-xs md:text-sm text-slate-500">Real-time insights across all your social channels.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand/20 hover:opacity-90 transition-opacity">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* Granular Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Filters</span>
          </div>

          {/* Date Range Filter */}
          <div className="relative group">
            <button 
              onClick={() => setShowFilterMenu(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <CalendarIcon size={16} className="text-brand" />
              {dateRange}
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
              {dateRanges.map(range => (
                <button 
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${dateRange === range ? 'bg-brand/10 text-brand font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              {platforms.find(p => p.id === platform)?.icon && React.createElement(platforms.find(p => p.id === platform)!.icon, { size: 16, className: "text-brand" })}
              {platform}
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
              {platforms.map(p => (
                <button 
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${platform === p.id ? 'bg-brand/10 text-brand font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <p.icon size={14} />
                  {p.id}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <Target size={16} className="text-brand" />
              {campaign}
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
              {campaigns.map(c => (
                <button 
                  key={c}
                  onClick={() => setCampaign(c)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${campaign === c ? 'bg-brand/10 text-brand font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              setDateRange('Last 30 Days');
              setPlatform('All Platforms');
              setCampaign('All Campaigns');
            }}
            className="ml-auto text-xs font-bold text-slate-400 hover:text-brand transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Reach', value: liveStats.reach, change: '+12.5%', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Engagements', value: liveStats.engagement, change: '+8.2%', icon: MessageCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Followers', value: liveStats.followers, change: '+15.1%', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Conversion', value: liveStats.conversion, change: '-1.4%', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50', negative: true },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.negative ? 'text-red-500' : 'text-green-500'}`}>
                {stat.negative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="font-bold text-slate-900">Reach vs Engagement</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand rounded-full"></div>
                <span className="text-[10px] font-medium text-slate-500 uppercase">Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-[10px] font-medium text-slate-500 uppercase">Engagement</span>
              </div>
            </div>
          </div>
          <div className="h-[250px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f27d26" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f27d26" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="reach" stroke="#f27d26" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" dataKey="engagement" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorEngage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-8">Platform Distribution</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-slate-900">100%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {platformData.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }}></div>
                  <span className="text-xs font-medium text-slate-600">{platform.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{platform.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Best Time to Post */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Best Time to Post</h3>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Peak activity hours</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand/20 rounded"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Low</span>
              <div className="w-3 h-3 bg-brand rounded"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">High</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'].map(time => (
                  <div key={time} className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-tighter">{time}</div>
                ))}
              </div>
              <div className="space-y-2">
                {heatMapData.map(row => (
                  <div key={row.day} className="flex items-center gap-2">
                    <div className="w-8 text-[10px] font-bold text-slate-500 uppercase">{row.day}</div>
                    <div className="flex-1 grid grid-cols-6 gap-2">
                      {Object.entries(row).filter(([key]) => key !== 'day').map(([time, value]) => (
                        <div 
                          key={time} 
                          className="h-8 rounded-lg transition-all hover:scale-105 cursor-pointer"
                          style={{ 
                            backgroundColor: `rgba(242, 125, 38, ${(value as number) / 100})`,
                            border: (value as number) > 80 ? '2px solid #f27d26' : 'none'
                          }}
                          title={`${row.day} at ${time}: ${value}% activity`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment & Demographics */}
        <div className="space-y-8">
          {/* Sentiment Analysis */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Sentiment Analysis</h3>
            <div className="space-y-4">
              {sentimentData.map(item => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">{item.name}</span>
                    <span className="font-bold text-slate-900">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Demographics */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Audience Age</h3>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#f27d26" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Top Performing Posts</h3>
          <button className="text-xs font-bold text-brand hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Content</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reach</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engagement</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { title: 'Summer Collection Launch', platform: 'Instagram', reach: '45.2K', engagement: '12.4%', status: 'Viral' },
                { title: 'New Store Opening', platform: 'Facebook', reach: '32.1K', engagement: '8.2%', status: 'High' },
                { title: 'Customer Success Story', platform: 'LinkedIn', reach: '12.5K', engagement: '15.1%', status: 'Steady' },
                { title: 'Weekly Tech Tips', platform: 'Twitter', reach: '8.4K', engagement: '4.2%', status: 'Normal' },
              ].map((post, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                        <img src={`https://picsum.photos/seed/post${i}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600">{post.platform}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{post.reach}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{post.engagement}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.status === 'Viral' ? 'bg-orange-100 text-orange-600' :
                      post.status === 'High' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
