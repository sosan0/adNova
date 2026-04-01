import React from 'react';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  FileText, 
  Download, 
  ExternalLink,
  CheckCircle2,
  Copy,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

export const BrandHubModule: React.FC = () => {
  const brandColors = [
    { name: 'Brand Orange', hex: '#FF6321', rgb: '255, 99, 33', usage: 'Primary Action' },
    { name: 'Deep Slate', hex: '#0F172A', rgb: '15, 23, 42', usage: 'Headings' },
    { name: 'Soft Gray', hex: '#F8FAFC', rgb: '248, 250, 252', usage: 'Backgrounds' },
    { name: 'Emerald', hex: '#10B981', rgb: '16, 185, 129', usage: 'Success' },
  ];

  const brandFonts = [
    { name: 'Inter', type: 'Sans Serif', usage: 'Body & UI', weight: '400, 500, 600, 700' },
    { name: 'Space Grotesk', type: 'Display', usage: 'Headings', weight: '700, 900' },
  ];

  const brandAssets = [
    { name: 'Primary Logo (Full Color)', format: 'SVG, PNG', size: '1.2 MB', image: 'https://picsum.photos/seed/logo1/200/200' },
    { name: 'Monochrome Logo (White)', format: 'SVG, PNG', size: '1.1 MB', image: 'https://picsum.photos/seed/logo2/200/200' },
    { name: 'Favicon Set', format: 'ICO, PNG', size: '400 KB', image: 'https://picsum.photos/seed/logo3/200/200' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Brand Hub</h2>
          <p className="text-slate-500 font-medium">Your brand assets, guidelines, and visual identity in one place.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <Download size={18} /> Download Brand Kit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Brand Colors */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-50 text-brand rounded-xl flex items-center justify-center">
                <Palette size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Color Palette</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brandColors.map((color) => (
                <div key={color.hex} className="group p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-brand/20 transition-all flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl shadow-inner flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{color.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{color.usage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-slate-500">{color.hex}</span>
                      <button className="p-1 text-slate-300 hover:text-brand transition-colors">
                        <Copy size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Typography */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                <Type size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Typography</h3>
            </div>
            <div className="space-y-6">
              {brandFonts.map((font) => (
                <div key={font.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-2xl font-black text-slate-900" style={{ fontFamily: font.name }}>{font.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{font.type} • {font.usage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-600">{font.weight}</p>
                    <button className="text-[10px] font-bold text-brand uppercase tracking-widest hover:underline mt-1">View Spec</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Assets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Core Assets</h3>
            </div>
            <div className="space-y-4">
              {brandAssets.map((asset) => (
                <div key={asset.name} className="group p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-brand/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                      <img src={asset.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate">{asset.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{asset.format} • {asset.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                      <ExternalLink size={12} /> Preview
                    </button>
                    <button className="flex-1 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-brand/5 rounded-3xl border border-brand/10 text-center">
              <p className="text-xs font-bold text-brand mb-2">Need a custom asset?</p>
              <p className="text-[10px] text-slate-500 font-medium mb-4">Request a new creative asset from your design team.</p>
              <button className="w-full py-3 bg-white text-brand text-xs font-bold rounded-2xl shadow-sm hover:bg-brand hover:text-white transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Request New Asset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Guidelines Summary */}
      <div className="bg-slate-900 p-10 rounded-[48px] text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full -mr-48 -mt-48 blur-3xl transition-all group-hover:scale-110"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <FileText size={24} className="text-brand" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">Brand Voice & Tone</h3>
            <p className="text-white/60 leading-relaxed mb-8">
              Our brand voice is <span className="text-white font-bold">confident, approachable, and innovative</span>. We use clear, direct language that empowers our users while maintaining a professional yet friendly demeanor.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Confident', 'Clear', 'Empowering', 'Modern'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xs font-black text-brand uppercase tracking-widest mb-2">Do's</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Use active voice and positive framing.
                </li>
                <li className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Keep sentences concise and impactful.
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-2">Don'ts</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 text-[10px] font-black">X</div> Avoid overly technical jargon.
                </li>
                <li className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 text-[10px] font-black">X</div> Never use passive or defensive language.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
