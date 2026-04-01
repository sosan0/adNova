import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Copy, 
  Trash2, 
  FileEdit, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Zap,
  Layout,
  MessageSquare,
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  tags: string[];
  usageCount: number;
}

const mockTemplates: Template[] = [
  { id: 1, title: 'Product Launch Announcement', description: 'Perfect for introducing a new product or feature with excitement.', category: 'Marketing', content: 'Excited to announce our new [Product Name]! 🚀 Check out the link in bio for early access. #NewArrivals #Innovation', tags: ['launch', 'new'], usageCount: 124 },
  { id: 2, title: 'Customer Testimonial', description: 'Showcase what your customers are saying about your brand.', category: 'Social Proof', content: 'See what our customers are saying: "[Testimonial Content]" - [Customer Name] #CustomerSuccess #Testimonial', tags: ['review', 'success'], usageCount: 89 },
  { id: 3, title: 'Behind the Scenes', description: 'Give your audience a glimpse into your company culture.', category: 'Engagement', content: 'Ever wondered how we [Process]? Here is a sneak peek behind the scenes! 🎥 #BehindTheScenes #CompanyCulture', tags: ['bts', 'culture'], usageCount: 56 },
  { id: 4, title: 'Flash Sale Alert', description: 'Urgent and high-energy template for limited-time offers.', category: 'Sales', content: 'FLASH SALE! ⚡️ Get [Percentage]% off all items for the next 24 hours only. Use code: [Code] #FlashSale #Discount', tags: ['sale', 'offer'], usageCount: 210 },
  { id: 5, title: 'Weekly Tip', description: 'Provide value to your audience with educational content.', category: 'Education', content: 'Weekly Tip: [Tip Content] 💡 Did you know? [Fact] #WeeklyTip #Education #Learning', tags: ['tip', 'education'], usageCount: 78 },
];

interface TemplatesModuleProps {
  onUseTemplate: (template: Template) => void;
}

export const TemplatesModule: React.FC<TemplatesModuleProps> = ({ onUseTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Marketing', 'Social Proof', 'Engagement', 'Sales', 'Education'];

  const filteredTemplates = mockTemplates.filter(t => 
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeCategory === 'All' || t.category === activeCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Content Templates</h2>
          <p className="text-sm text-slate-500">Save time with pre-defined content structures for every occasion.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white font-bold rounded-2xl shadow-lg shadow-brand/20 hover:opacity-90 transition-all">
          <Plus size={20} /> Create Template
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search templates..." 
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div 
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all group relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                  <Layout size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                  <Zap size={10} />
                  {template.usageCount} uses
                </div>
              </div>

              <h3 className="font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">{template.title}</h3>
              <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                {template.description}
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6 relative group/content">
                <p className="text-[11px] text-slate-600 line-clamp-3 italic leading-relaxed">
                  "{template.content}"
                </p>
                <button 
                  onClick={() => navigator.clipboard.writeText(template.content)}
                  className="absolute top-2 right-2 p-1.5 bg-white text-slate-400 hover:text-brand rounded-lg shadow-sm opacity-0 group-hover/content:opacity-100 transition-all"
                  title="Copy content"
                >
                  <Copy size={12} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">#{tag}</span>
                  ))}
                </div>
                <button 
                  onClick={() => onUseTemplate(template)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-brand transition-all"
                >
                  Use Template <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No templates found</h3>
          <p className="text-sm text-slate-500 max-w-xs mt-2">Try adjusting your search or category filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};
