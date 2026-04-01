import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Search, 
  Filter, 
  Plus, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  Eye,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Post {
  id: number;
  platform: string;
  time: string;
  status: string;
  caption: string;
  image?: string;
  color: string;
}

const mockPosts: Post[] = [
  { id: 1, platform: 'instagram', time: '09:30 AM', status: 'published', caption: 'Summer vibes are here! ☀️ #summer #vibes', image: 'https://picsum.photos/seed/post1/400/400', color: 'bg-purple-500' },
  { id: 2, platform: 'facebook', time: '11:00 AM', status: 'scheduled', caption: 'Join our upcoming webinar on digital marketing.', image: 'https://picsum.photos/seed/post2/400/400', color: 'bg-blue-600' },
  { id: 3, platform: 'twitter', time: '02:15 PM', status: 'draft', caption: 'Quick tip for the day: Always test your links!', color: 'bg-sky-400' },
  { id: 4, platform: 'linkedin', time: '04:00 PM', status: 'failed', caption: 'We are hiring! Check out our careers page.', image: 'https://picsum.photos/seed/post4/400/400', color: 'bg-blue-800' },
  { id: 5, platform: 'instagram', time: '06:30 PM', status: 'scheduled', caption: 'New product launch tomorrow! 🚀', image: 'https://picsum.photos/seed/post5/400/400', color: 'bg-purple-500' },
  { id: 6, platform: 'facebook', time: '08:00 AM', status: 'published', caption: 'Customer success story: How AdNova helped scaling.', image: 'https://picsum.photos/seed/post6/400/400', color: 'bg-blue-600' },
];

interface PostsModuleProps {
  onCreatePost: () => void;
  isClient?: boolean;
}

export const PostsModule: React.FC<PostsModuleProps> = ({ onCreatePost, isClient = false }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPosts = mockPosts.filter(p => 
    (p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || p.platform.includes(searchQuery.toLowerCase())) &&
    (filterStatus === 'all' || p.status === filterStatus) &&
    (!isClient || p.status === 'published' || p.status === 'scheduled')
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'published': return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' };
      case 'scheduled': return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' };
      case 'failed': return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' };
      case 'draft': return { icon: FileEdit, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' };
      default: return { icon: CheckCircle2, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-100' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Posts</h2>
          <p className="text-sm text-slate-500">Manage and monitor all your social media content.</p>
        </div>
        {!isClient && (
          <button 
            onClick={onCreatePost}
            className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white font-bold rounded-2xl shadow-lg shadow-brand/20 hover:opacity-90 transition-all"
          >
            <Plus size={20} /> Create New Post
          </button>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:border-brand/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 md:w-40 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:border-brand/20 transition-all outline-none appearance-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="failed">Failed</option>
          </select>
          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-brand' : 'text-slate-400'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-brand' : 'text-slate-400'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => {
              const statusStyle = getStatusStyles(post.status);
              const StatusIcon = statusStyle.icon;
              return (
                <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  {post.image ? (
                    <div className="h-48 w-full bg-slate-100 relative">
                      <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                        {post.platform === 'instagram' && <Instagram size={14} className="text-purple-500" />}
                        {post.platform === 'facebook' && <Facebook size={14} className="text-blue-600" />}
                        {post.platform === 'twitter' && <Twitter size={14} className="text-sky-400" />}
                        {post.platform === 'linkedin' && <Linkedin size={14} className="text-blue-800" />}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-slate-50 flex items-center justify-center relative">
                      <FileEdit size={48} className="text-slate-200" />
                      <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                        {post.platform === 'instagram' && <Instagram size={14} className="text-purple-500" />}
                        {post.platform === 'facebook' && <Facebook size={14} className="text-blue-600" />}
                        {post.platform === 'twitter' && <Twitter size={14} className="text-sky-400" />}
                        {post.platform === 'linkedin' && <Linkedin size={14} className="text-blue-800" />}
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}>
                        <StatusIcon size={10} />
                        {post.status}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{post.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                          <Eye size={16} />
                        </button>
                        {!isClient && (
                          <>
                            <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                              <FileEdit size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Schedule</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPosts.map((post) => {
                    const statusStyle = getStatusStyles(post.status);
                    const StatusIcon = statusStyle.icon;
                    return (
                      <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                              {post.image ? (
                                <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                  <FileEdit size={20} />
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-medium text-slate-700 line-clamp-1 max-w-[200px]">{post.caption}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {post.platform === 'instagram' && <Instagram size={16} className="text-purple-500" />}
                            {post.platform === 'facebook' && <Facebook size={16} className="text-blue-600" />}
                            {post.platform === 'twitter' && <Twitter size={16} className="text-sky-400" />}
                            {post.platform === 'linkedin' && <Linkedin size={16} className="text-blue-800" />}
                            <span className="text-xs font-bold text-slate-600 capitalize">{post.platform}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}>
                            <StatusIcon size={10} />
                            {post.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{post.time}</span>
                            <span className="text-[10px] text-slate-400">Today</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                              <Eye size={16} />
                            </button>
                            {!isClient && (
                              <>
                                <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                                  <FileEdit size={16} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                  <Trash2 size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
