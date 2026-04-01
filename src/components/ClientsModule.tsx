import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Globe, 
  Mail, 
  Phone, 
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

const clients = [
  {
    id: '1',
    name: 'EcoStyle Fashion',
    industry: 'Fashion & Apparel',
    status: 'Active',
    platforms: ['instagram', 'facebook', 'twitter'],
    contact: 'Sarah Jenkins',
    email: 'sarah@ecostyle.com',
    website: 'ecostyle.com',
    campaigns: 3,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Future Systems',
    industry: 'Technology',
    status: 'Active',
    platforms: ['linkedin', 'twitter'],
    contact: 'David Chen',
    email: 'd.chen@futuresys.io',
    website: 'futuresys.io',
    campaigns: 1,
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Green Earth',
    industry: 'Non-Profit',
    status: 'Onboarding',
    platforms: ['instagram', 'facebook', 'twitter', 'linkedin'],
    contact: 'Elena Rodriguez',
    email: 'elena@greenearth.org',
    website: 'greenearth.org',
    campaigns: 0,
    lastActive: '3 days ago'
  },
  {
    id: '4',
    name: 'Urban Eats',
    industry: 'Food & Beverage',
    status: 'Inactive',
    platforms: ['instagram', 'facebook'],
    contact: 'Marcus Thorne',
    email: 'marcus@urbaneats.com',
    website: 'urbaneats.com',
    campaigns: 5,
    lastActive: '2 weeks ago'
  }
];

export const ClientsModule: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-slate-500">Manage your agency clients and their social accounts.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand/20 hover:opacity-90 transition-opacity">
          <Plus size={18} /> Add New Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-brand/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <select className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none">
            <option>All Industries</option>
            <option>Fashion</option>
            <option>Technology</option>
            <option>Non-Profit</option>
            <option>Food & Beverage</option>
          </select>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {clients.map((client, i) => (
          <motion.div 
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                    <img src={`https://picsum.photos/seed/client${i}/200/200`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-brand transition-colors flex items-center gap-2">
                      {client.name}
                      <ExternalLink size={14} className="text-slate-300 group-hover:text-brand" />
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{client.industry}</p>
                  </div>
                </div>
                <div className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  client.status === 'Active' ? 'bg-green-100 text-green-600' :
                  client.status === 'Onboarding' ? 'bg-blue-100 text-blue-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {client.status === 'Active' && <CheckCircle2 size={12} />}
                  {client.status === 'Onboarding' && <Clock size={12} />}
                  {client.status === 'Inactive' && <AlertCircle size={12} />}
                  {client.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={14} />
                    <span className="text-xs font-medium">{client.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail size={14} />
                    <span className="text-xs font-medium truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Globe size={14} />
                    <span className="text-xs font-medium">{client.website}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <p className="text-2xl font-bold text-slate-900">{client.campaigns}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Campaigns</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {client.platforms.map((p) => (
                      <div key={p} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-brand transition-colors">
                        {p === 'instagram' && <Instagram size={14} />}
                        {p === 'facebook' && <Facebook size={14} />}
                        {p === 'twitter' && <Twitter size={14} />}
                        {p === 'linkedin' && <Linkedin size={14} />}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Channels</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 sm:flex-none p-2 text-slate-400 hover:text-brand hover:bg-brand/10 rounded-lg transition-all flex justify-center">
                    <Settings size={18} />
                  </button>
                  <button className="flex-[2] sm:flex-none px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-brand transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
