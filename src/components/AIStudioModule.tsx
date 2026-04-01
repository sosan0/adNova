import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  Type, 
  Send, 
  Copy, 
  Download, 
  RefreshCw, 
  Zap,
  Layout,
  MessageSquare,
  History,
  Star,
  ChevronRight,
  Loader2,
  FileEdit as FileEditIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined. Please set it in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const AIStudioModule: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<{ id: number; type: 'Text' | 'Image'; prompt: string; result: string; date: string }[]>([]);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'Text' | 'Image'>('all');

  const handleGenerateText = async (overridePrompt?: string) => {
    const targetPrompt = overridePrompt || prompt;
    if (!targetPrompt) return;
    setIsGenerating(true);
    setResult(null);
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a creative and engaging social media post based on this prompt: "${targetPrompt}". Include relevant hashtags and emojis.`,
      });
      
      const text = response.text;
      setResult(text);
      setHistory(prev => [{
        id: Date.now(),
        type: 'Text',
        prompt: targetPrompt,
        result: text,
        date: new Date().toLocaleTimeString()
      }, ...prev]);
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async (overridePrompt?: string) => {
    const targetPrompt = overridePrompt || prompt;
    if (!targetPrompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: targetPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          setGeneratedImage(imageUrl);
          setHistory(prev => [{
            id: Date.now(),
            type: 'Image',
            prompt: targetPrompt,
            result: 'Image Generated',
            date: new Date().toLocaleTimeString()
          }, ...prev]);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditFromHistory = (item: { prompt: string; type: 'Text' | 'Image' }) => {
    setPrompt(item.prompt);
    setActiveTool(item.type === 'Text' ? 'text' : 'image');
    // Scroll to top of workspace if needed, but usually the prompt area is visible
  };

  const handleRerunFromHistory = (item: { prompt: string; type: 'Text' | 'Image' }) => {
    setActiveTool(item.type === 'Text' ? 'text' : 'image');
    if (item.type === 'Text') {
      handleGenerateText(item.prompt);
    } else {
      handleGenerateImage(item.prompt);
    }
  };

  const filteredHistory = history.filter(item => 
    historyFilter === 'all' || item.type === historyFilter
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-120px)]">
      {/* Sidebar Tools */}
      <div className="lg:col-span-3 space-y-6 lg:overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles size={20} />
            </div>
            <h2 className="font-bold text-slate-900">AI Studio</h2>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => setActiveTool('text')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeTool === 'text' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Type size={18} />
              <span className="text-sm font-bold">Content Generator</span>
            </button>
            <button 
              onClick={() => setActiveTool('image')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeTool === 'image' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <ImageIcon size={18} />
              <span className="text-sm font-bold">Image Studio</span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Presets</p>
            <div className="space-y-2">
              {['Product Launch', 'Event Promo', 'Brand Story', 'Seasonal Sale'].map(preset => (
                <button key={preset} className="w-full text-left px-4 py-2 text-xs font-medium text-slate-500 hover:text-brand hover:bg-brand/5 rounded-xl transition-all">
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <Zap size={20} className="text-brand" />
            </div>
            <h3 className="font-bold text-sm mb-2">Pro AI Features</h3>
            <p className="text-[10px] text-white/60 leading-relaxed mb-4">Unlock advanced models and unlimited generation credits.</p>
            <button className="w-full py-2 bg-brand text-white text-[10px] font-bold rounded-xl hover:bg-white hover:text-brand transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="lg:col-span-6 flex flex-col gap-6 min-h-[500px] lg:min-h-0">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTool === 'text' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                {activeTool === 'text' ? <MessageSquare size={16} /> : <ImageIcon size={16} />}
              </div>
              <h3 className="font-bold text-slate-900">{activeTool === 'text' ? 'Generate Content' : 'Generate Image'}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-brand transition-all"><Star size={18} /></button>
              <button 
                onClick={() => {
                  setPrompt('');
                  setResult(null);
                  setGeneratedImage(null);
                }}
                className="p-2 text-slate-400 hover:text-brand transition-all"
                title="Reset"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Describe what you want</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={activeTool === 'text' ? "e.g. A professional announcement for a new summer collection of eco-friendly sneakers..." : "e.g. A futuristic workspace with neon lights and holographic displays, cinematic lighting, 4k..."}
                className="w-full h-32 p-4 text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand/20 transition-all outline-none resize-none"
              />
            </div>

            <button 
              onClick={activeTool === 'text' ? handleGenerateText : handleGenerateImage}
              disabled={isGenerating || !prompt}
              className="w-full py-4 bg-brand-gradient text-white font-bold rounded-2xl shadow-lg shadow-brand/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate {activeTool === 'text' ? 'Content' : 'Image'}
                </>
              )}
            </button>

            <AnimatePresence mode="wait">
              {(result || generatedImage) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-slate-100 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generated Result</p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => activeTool === 'text' ? handleGenerateText() : handleGenerateImage()}
                        disabled={isGenerating}
                        className="p-2 text-slate-400 hover:text-brand transition-all flex items-center gap-1.5" 
                        title="Try Alternative"
                      >
                        <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                        <span className="text-[10px] font-bold">Alternative</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-brand transition-all" title="Copy"><Copy size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-brand transition-all" title="Download"><Download size={16} /></button>
                    </div>
                  </div>

                  {activeTool === 'text' && result && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{result}</p>
                    </div>
                  )}

                  {activeTool === 'image' && generatedImage && (
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg aspect-square bg-slate-50">
                      <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* History & Activity */}
      <div className="lg:col-span-3 space-y-6 lg:overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <History size={18} className="text-slate-400" />
              <h3 className="font-bold text-slate-900">Recent Activity</h3>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-6 p-1 bg-slate-50 rounded-xl">
            {(['all', 'Text', 'Image'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setHistoryFilter(f)}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                  historyFilter === f 
                    ? 'bg-white text-brand shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredHistory.length > 0 ? filteredHistory.map(item => (
              <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand/20 transition-all group relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${item.type === 'Text' ? 'text-blue-500' : 'text-purple-500'}`}>
                    {item.type}
                  </span>
                  <span className="text-[9px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-[11px] text-slate-700 line-clamp-2 font-medium mb-2">{item.prompt}</p>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditFromHistory(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white border border-slate-200 text-[9px] font-bold text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    <FileEditIcon size={10} /> Edit
                  </button>
                  <button 
                    onClick={() => handleRerunFromHistory(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-brand text-white text-[9px] font-bold rounded-lg hover:opacity-90 transition-all"
                  >
                    <RefreshCw size={10} /> Re-run
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-xs text-slate-400">No {historyFilter !== 'all' ? historyFilter.toLowerCase() : ''} activity yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
