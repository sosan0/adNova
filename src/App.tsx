import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CampaignOverview } from './components/CampaignOverview';
import { ContentWizard } from './components/ContentWizard';
import { Calendar } from './components/Calendar';
import { NotificationDropdown } from './components/NotificationDropdown';
import { LoginPage } from './components/LoginPage';
import { AnalyticsReport } from './components/AnalyticsReport';
import { CampaignsModule } from './components/CampaignsModule';
import { ClientsModule } from './components/ClientsModule';
import { TemplatesModule } from './components/TemplatesModule';
import { PostsModule } from './components/PostsModule';
import { AssetsModule } from './components/AssetsModule';
import { AIStudioModule } from './components/AIStudioModule';
import { ClientPortalModule } from './components/ClientPortalModule';
import { BrandHubModule } from './components/BrandHubModule';
import { 
  Bell, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  X,
  FileText,
  BarChart3,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<'agency' | 'client'>('agency');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('Workflow');
  const [pendingPlatforms, setPendingPlatforms] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showDraftAlert, setShowDraftAlert] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check for existing session
  useEffect(() => {
    const savedSession = localStorage.getItem('adnova_session');
    if (savedSession === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('adnova_session', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adnova_session');
    setIsLoggedIn(false);
  };

  // Simulate a success toast on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 1500);
    const hideTimer = setTimeout(() => setShowToast(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const renderContent = () => {
    if (mode === 'client') {
      switch (activeTab) {
        case 'dashboard':
          return <ClientPortalModule />;
        case 'content':
          switch (activeSubTab) {
            case 'Calendar':
              return <Calendar onCreatePost={() => {}} />;
            case 'Posts':
              return <PostsModule onCreatePost={() => {}} isClient />;
            case 'Assets':
              return <AssetsModule />;
            case 'Brand Hub':
              return <BrandHubModule />;
            default:
              return <Calendar onCreatePost={() => {}} />;
          }
        case 'analytics':
          return <AnalyticsReport />;
        default:
          return <ClientPortalModule />;
      }
    }

    if (activeTab === 'content') {
      switch (activeSubTab) {
        case 'Workflow':
          return <ContentWizard initialPlatforms={pendingPlatforms} />;
        case 'Calendar':
          return <Calendar onCreatePost={(platforms) => {
            setPendingPlatforms(platforms);
            setActiveSubTab('Workflow');
          }} />;
        case 'Posts':
          return <PostsModule onCreatePost={() => {
            setPendingPlatforms([]);
            setActiveSubTab('Workflow');
          }} />;
        case 'Templates':
          return <TemplatesModule onUseTemplate={() => {
            setPendingPlatforms([]);
            setActiveSubTab('Workflow');
          }} />;
        case 'Assets':
          return <AssetsModule />;
        case 'AI Studio':
          return <AIStudioModule />;
        default:
          return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4">
                <FileText size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{activeSubTab} Module</h2>
              <p className="text-slate-500 max-w-md mt-2">The {activeSubTab} module is currently under development.</p>
            </div>
          );
      }
    }

    switch (activeTab) {
      case 'dashboard':
        return <CampaignOverview />;
      case 'campaigns':
        return <CampaignsModule />;
      case 'analytics':
        return <AnalyticsReport />;
      case 'clients':
        return <ClientsModule />;
      default:
        return <CampaignOverview />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-50 lg:relative lg:block transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }} 
          activeSubTab={activeSubTab} 
          setActiveSubTab={(sub) => {
            setActiveSubTab(sub);
            setIsSidebarOpen(false);
          }} 
          onLogout={handleLogout}
          mode={mode}
          setMode={setMode}
        />
      </div>
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl lg:hidden"
            >
              <LayoutDashboard size={20} />
            </button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-brand/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 transition-colors relative rounded-xl ${showNotifications ? 'bg-brand/10 text-brand' : 'text-slate-400 hover:text-brand'}`}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <NotificationDropdown onClose={() => setShowNotifications(false)} />
                )}
              </AnimatePresence>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-xl transition-colors">
              <div className="w-7 h-7 bg-brand-gradient rounded-lg flex items-center justify-center text-white text-[10px] font-bold">S</div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">Sosan</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/20 flex items-center gap-4"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Files Added</p>
              <p className="text-xs text-white/80">Successfully added 1 file(s)</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
