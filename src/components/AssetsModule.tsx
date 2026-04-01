import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Grid, 
  List, 
  Filter, 
  Upload, 
  FolderPlus, 
  MoreVertical, 
  Download, 
  Trash2, 
  ExternalLink,
  Image as ImageIcon,
  Video,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Asset {
  id: number;
  name: string;
  type: 'image' | 'video' | 'file';
  size: string;
  date: string;
  url: string;
  category: string;
}

const mockAssets: Asset[] = [
  { id: 1, name: 'Summer Campaign Header.jpg', type: 'image', size: '2.4 MB', date: 'Mar 28, 2026', url: 'https://picsum.photos/seed/asset1/400/400', category: 'Campaigns' },
  { id: 2, name: 'Product Demo Video.mp4', type: 'video', size: '15.8 MB', date: 'Mar 25, 2026', url: 'https://picsum.photos/seed/asset2/400/400', category: 'Product' },
  { id: 3, name: 'Brand Guidelines.pdf', type: 'file', size: '1.2 MB', date: 'Mar 20, 2026', url: '', category: 'Brand' },
  { id: 4, name: 'Instagram Story Template.png', type: 'image', size: '1.1 MB', date: 'Mar 18, 2026', url: 'https://picsum.photos/seed/asset4/400/400', category: 'Templates' },
  { id: 5, name: 'Client Testimonial.jpg', type: 'image', size: '800 KB', date: 'Mar 15, 2026', url: 'https://picsum.photos/seed/asset5/400/400', category: 'Social' },
  { id: 6, name: 'Webinar Recording.mp4', type: 'video', size: '45.2 MB', date: 'Mar 10, 2026', url: 'https://picsum.photos/seed/asset6/400/400', category: 'Events' },
];

export const AssetsModule: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Campaigns', 'Product', 'Brand', 'Templates', 'Social', 'Events'];

  const filteredAssets = mockAssets.filter(asset => 
    (asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeCategory === 'All' || asset.category === activeCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Asset Library</h2>
          <p className="text-sm text-slate-500">Manage your media, documents, and creative assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <FolderPlus size={18} /> New Folder
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-gradient text-white font-bold rounded-xl shadow-lg shadow-brand/20 hover:opacity-90 transition-all">
            <Upload size={18} /> Upload Asset
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:border-brand/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-brand text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              {cat}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
          <div className="bg-slate-100 p-1 rounded-xl flex shrink-0">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-brand' : 'text-slate-400'}`}
            >
              <Grid size={18} />
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  ) : asset.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Video size={40} className="text-white/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                      <FileText size={48} className="text-slate-200" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                      <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white text-slate-900 text-[10px] font-bold rounded-lg hover:bg-brand hover:text-white transition-all">
                        Preview
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-all">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-slate-900 truncate mb-1">{asset.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{asset.size}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{asset.category}</span>
                  </div>
                </div>
              </div>
            ))}
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
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Added</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {asset.type === 'image' ? (
                              <img src={asset.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : asset.type === 'video' ? (
                              <Video size={16} className="text-slate-400" />
                            ) : (
                              <FileText size={16} className="text-slate-400" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{asset.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{asset.size}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase tracking-widest">{asset.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{asset.date}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                            <Download size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
