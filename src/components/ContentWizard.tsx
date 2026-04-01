import React, { useState } from 'react';
import { 
  Upload, 
  Cloud, 
  Check, 
  Sparkles, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Calendar as CalendarIcon,
  Clock,
  Globe,
  ChevronRight,
  ChevronLeft,
  Plus,
  Send,
  Loader2,
  Copy,
  Wand2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface ContentWizardProps {
  initialPlatforms?: string[];
}

export const ContentWizard: React.FC<ContentWizardProps> = ({ initialPlatforms = [] }) => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    initialPlatforms.length > 0 ? initialPlatforms : ['instagram', 'facebook', 'twitter', 'linkedin']
  );
  const [activePlatform, setActivePlatform] = useState<string>(
    initialPlatforms.length > 0 ? initialPlatforms[0] : 'instagram'
  );
  const [caption, setCaption] = useState("Excited to announce our new Summer Collection! ☀️✨ Check out the link in bio for early access. #SummerVibes #NewArrivals");
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);
  const [isOptimizingCaption, setIsOptimizingCaption] = useState(false);
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);
  const [contentScore, setContentScore] = useState(72);

  const steps = [
    { id: 1, label: 'Content Creation' },
    { id: 2, label: 'Platform Customization' },
    { id: 3, label: 'Review & Schedule' },
  ];

  const handleSuggestHashtags = async () => {
    if (!caption) return;
    setIsGeneratingHashtags(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Suggest 10 relevant and trending social media hashtags for this caption: "${caption}". Return only the hashtags separated by spaces.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["hashtags"]
          }
        }
      });
      
      const data = JSON.parse(response.text);
      setSuggestedHashtags(data.hashtags);
      setContentScore(Math.min(100, contentScore + 5));
    } catch (error) {
      console.error("Error suggesting hashtags:", error);
    } finally {
      setIsGeneratingHashtags(false);
    }
  };

  const handleOptimizeCaption = async () => {
    if (!caption) return;
    setIsOptimizingCaption(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Optimize this social media caption for better engagement and clarity: "${caption}". Keep the same tone but make it more impactful. Return only the optimized caption.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              optimizedCaption: { type: Type.STRING }
            },
            required: ["optimizedCaption"]
          }
        }
      });
      
      const data = JSON.parse(response.text);
      setCaption(data.optimizedCaption);
      setContentScore(Math.min(100, contentScore + 15));
    } catch (error) {
      console.error("Error optimizing caption:", error);
    } finally {
      setIsOptimizingCaption(false);
    }
  };

  const addHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption(prev => `${prev} ${tag}`);
    }
  };

  const renderAIAssistant = () => (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-brand" size={20} />
        <h3 className="font-bold text-slate-900">AI Assistant</h3>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 uppercase">Content Score</span>
          <span className="text-sm font-bold text-brand">{contentScore}/100</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${contentScore}%` }}
            className="h-full bg-brand rounded-full transition-all duration-500"
          ></motion.div>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleSuggestHashtags}
          disabled={isGeneratingHashtags}
          className="w-full py-2.5 bg-brand-gradient text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGeneratingHashtags ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Suggest Hashtags
        </button>
        <button 
          onClick={handleOptimizeCaption}
          disabled={isOptimizingCaption}
          className="w-full py-2.5 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 border border-slate-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isOptimizingCaption ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          Optimize Caption
        </button>
      </div>

      <AnimatePresence>
        {suggestedHashtags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggested Hashtags</p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(suggestedHashtags.join(' '));
                }}
                className="text-slate-400 hover:text-brand transition-colors"
                title="Copy all"
              >
                <Copy size={12} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => addHashtag(tag)}
                  className="px-2 py-1 bg-brand/5 text-brand text-[10px] font-bold rounded-lg border border-brand/10 hover:bg-brand/10 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>
          <p className="text-sm font-medium text-slate-900 mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-500">PNG, JPG, MP4 or GIF (max. 800x400px)</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-xl relative overflow-hidden group">
              <img 
                src={`https://picsum.photos/seed/social${i}/400/400`} 
                alt="Upload" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 w-6 h-6 bg-brand text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {i}
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="text-white text-xs font-medium underline">Remove</button>
              </div>
            </div>
          ))}
          <button className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand transition-all">
            <Plus size={24} />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {['Google Drive', 'Dropbox', 'iCloud', 'Canva'].map(cloud => (
            <button key={cloud} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Cloud size={16} /> {cloud}
            </button>
          ))}
        </div>
      </div>

      {renderAIAssistant()}
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {selectedPlatforms.map((p) => (
              <button 
                key={p} 
                onClick={() => setActivePlatform(p)}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activePlatform === p 
                    ? 'text-brand border-brand bg-white' 
                    : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100/50'
                }`}
              >
                {p === 'instagram' && <Instagram size={14} className={activePlatform === p ? "text-purple-500" : "text-slate-400"} />}
                {p === 'facebook' && <Facebook size={14} className={activePlatform === p ? "text-blue-600" : "text-slate-400"} />}
                {p === 'twitter' && <Twitter size={14} className={activePlatform === p ? "text-sky-400" : "text-slate-400"} />}
                {p === 'linkedin' && <Linkedin size={14} className={activePlatform === p ? "text-blue-800" : "text-slate-400"} />}
                {p}
              </button>
            ))}
          </div>
          <div className="p-4">
            <textarea 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full h-48 p-4 text-sm text-slate-700 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
              placeholder="Write your caption here..."
            />
            <div className="flex items-center justify-between mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span>Characters: {caption.length}/2200</span>
              <span>Hashtags: {caption.split('#').length - 1}/30</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 flex items-center justify-center">
          <div className="w-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-3 flex items-center gap-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div>
                <p className="text-xs font-bold">yourbrand</p>
                <p className="text-[10px] text-slate-500">New York, NY</p>
              </div>
            </div>
            <img 
              src="https://picsum.photos/seed/social1/600/600" 
              alt="Preview" 
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-3">
                {activePlatform === 'instagram' && <Instagram size={20} className="text-slate-700" />}
                {activePlatform === 'facebook' && <Facebook size={20} className="text-blue-600" />}
                {activePlatform === 'twitter' && <Twitter size={20} className="text-sky-400" />}
                {activePlatform === 'linkedin' && <Linkedin size={20} className="text-blue-800" />}
                <div className="w-5 h-5 border-2 border-slate-700 rounded-full"></div>
                <Send size={20} className="text-slate-700" />
              </div>
              <p className="text-xs font-bold">15,000 likes</p>
              <p className="text-xs text-slate-800 leading-relaxed">
                <span className="font-bold mr-1">yourbrand</span>
                {caption}
              </p>
            </div>
          </div>
        </div>
      </div>

      {renderAIAssistant()}
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-6">Schedule Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-between p-4 border-2 border-brand bg-brand/5 rounded-2xl text-left">
              <div>
                <p className="text-sm font-bold text-brand">Optimal Time</p>
                <p className="text-xs text-slate-500">AI-powered best engagement</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            </button>
            <button className="flex items-center justify-between p-4 border-2 border-slate-100 bg-white rounded-2xl text-left hover:border-slate-200 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-700">Custom Schedule</p>
                <p className="text-xs text-slate-500">Select your own time & date</p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Timezone</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand/20">
                  <option>Asia/Calcutta (GMT+5:30)</option>
                  <option>UTC (GMT+0:00)</option>
                  <option>America/New_York (GMT-5:00)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value="Dec 15, 2024" readOnly className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value="09:30 AM" readOnly className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit">
        <h3 className="font-bold text-slate-900 mb-4">Calendar Preview</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
            <div key={`${d}-${idx}`} className="text-[10px] font-bold text-slate-400 text-center">{d}</div>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className={`aspect-square flex items-center justify-center text-xs rounded-md ${i + 1 === 15 ? 'bg-brand-gradient text-white font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Scheduled for</p>
          <p className="text-sm font-bold text-slate-900">Sunday, Dec 15</p>
          <p className="text-xs text-brand font-medium">09:30 AM (Optimal)</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        {steps.map((s, i) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s.id ? 'bg-brand-gradient text-white shadow-lg shadow-brand/20' : 'bg-white border-2 border-slate-100 text-slate-300'
              }`}
            >
              {step > s.id ? <Check size={20} /> : s.id}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-slate-900' : 'text-slate-300'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="min-h-[500px]"
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </motion.div>

      {/* Footer Actions */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
        <button 
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button 
          onClick={() => setStep(Math.min(3, step + 1))}
          className="flex items-center gap-2 px-8 py-3 bg-brand-gradient text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand/20"
        >
          {step === 3 ? 'Schedule Post' : 'Continue'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
