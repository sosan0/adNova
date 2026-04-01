import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const campaigns = [
  {
    id: '1',
    name: 'Summer Collection 2024',
    client: 'EcoStyle Fashion',
    status: 'Active',
    platforms: ['instagram', 'facebook'],
    progress: 65,
    reach: '125K',
    budget: '$5,000',
    spent: '$3,250',
    endDate: 'Aug 15, 2024'
  },
  {
    id: '2',
    name: 'Tech Innovators Summit',
    client: 'Future Systems',
    status: 'Scheduled',
    platforms: ['linkedin', 'twitter'],
    progress: 0,
    reach: '0',
    budget: '$12,000',
    spent: '$0',
    endDate: 'Sep 20, 2024'
  },
  {
    id: '3',
    name: 'Organic Food Drive',
    client: 'Green Earth',
    status: 'Draft',
    platforms: ['instagram', 'facebook', 'twitter'],
    progress: 15,
    reach: '12K',
    budget: '$2,500',
    spent: '$450',
    endDate: 'Oct 05, 2024'
  },
  {
    id: '4',
    name: 'Winter Gear Pre-launch',
    client: 'EcoStyle Fashion',
    status: 'Completed',
    platforms: ['instagram', 'facebook', 'linkedin'],
    progress: 100,
    reach: '450K',
    budget: '$8,000',
    spent: '$7,950',
    endDate: 'Dec 30, 2023'
  }
];

export const CampaignsModule: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-500">Manage and track your marketing initiatives.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand/20 hover:opacity-90 transition-opacity">
          <Plus size={18} /> Create New Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-brand/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <select className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Draft</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {campaigns.map((campaign, i) => (
          <motion.div 
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-brand transition-colors">{campaign.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{campaign.client}</p>
                  </div>
                </div>
                <div className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-600' :
                  campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-600' :
                  campaign.status === 'Draft' ? 'bg-slate-100 text-slate-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {campaign.status === 'Active' && <TrendingUp size={12} />}
                  {campaign.status === 'Scheduled' && <Clock size={12} />}
                  {campaign.status === 'Draft' && <AlertCircle size={12} />}
                  {campaign.status === 'Completed' && <CheckCircle2 size={12} />}
                  {campaign.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reach</p>
                  <p className="text-sm font-bold text-slate-900">{campaign.reach}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Budget</p>
                  <p className="text-sm font-bold text-slate-900">{campaign.budget}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Spent</p>
                  <p className="text-sm font-bold text-slate-900">{campaign.spent}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Campaign Progress</span>
                  <span className="text-brand">{campaign.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand rounded-full transition-all duration-1000" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {campaign.platforms.map((p) => (
                      <div key={p} className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
                        {p === 'instagram' && <Instagram size={14} className="text-purple-500" />}
                        {p === 'facebook' && <Facebook size={14} className="text-blue-600" />}
                        {p === 'twitter' && <Twitter size={14} className="text-sky-400" />}
                        {p === 'linkedin' && <Linkedin size={14} className="text-blue-800" />}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Platforms</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">{campaign.endDate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
