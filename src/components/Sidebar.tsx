import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Megaphone, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Layers,
  Image as ImageIcon,
  Sparkles,
  User,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  LogOut,
  Users as UsersIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  onLogout: () => void;
  mode: 'agency' | 'client';
  setMode: (mode: 'agency' | 'client') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  activeSubTab, 
  setActiveSubTab, 
  onLogout,
  mode,
  setMode
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(mode === 'agency' ? [{ id: 'clients', label: 'Clients', icon: UsersIcon }] : []),
    { 
      id: 'content', 
      label: 'Content', 
      icon: FileText,
      subItems: mode === 'agency' 
        ? ['Posts', 'Templates', 'Calendar', 'Workflow', 'Assets', 'AI Studio']
        : ['Calendar', 'Posts', 'Assets', 'Brand Hub']
    },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone, badge: 'New' },
    { id: 'marketing', label: 'Marketing', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (id === 'content') {
      setActiveSubTab('Workflow'); // Default subtab
    }
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-xl tracking-tight text-brand-gradient">AdNova</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 hidden lg:block"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Switcher */}
      {!isCollapsed && (
        <div className="px-6 mb-6">
          <div className="bg-slate-100 p-1 rounded-full flex">
            <button 
              onClick={() => setMode('agency')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${mode === 'agency' ? 'bg-white shadow-sm text-brand' : 'text-slate-500'}`}
            >
              Agency
            </button>
            <button 
              onClick={() => setMode('client')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${mode === 'client' ? 'bg-white shadow-sm text-brand' : 'text-slate-500'}`}
            >
              Client
            </button>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative group ${
                activeTab === item.id ? 'bg-brand/10 text-brand' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-brand' : 'text-slate-400 group-hover:text-slate-600'} />
              {!isCollapsed && (
                <>
                  <span className={`font-medium text-sm flex-1 text-left ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
                  {item.id === 'content' && (
                    <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity mr-1">
                      <Instagram size={12} />
                      <Facebook size={12} />
                      <Twitter size={12} />
                      <Linkedin size={12} />
                    </div>
                  )}
                  {item.badge && (
                    <span className="bg-brand-gradient text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
            
            {/* Submenu for Content */}
            {!isCollapsed && item.id === 'content' && activeTab === 'content' && item.subItems && (
              <div className="ml-9 mt-1 space-y-1">
                {item.subItems.map(sub => (
                  <button 
                    key={sub} 
                    onClick={() => setActiveSubTab(sub)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${activeSubTab === sub ? 'text-brand font-bold' : 'text-slate-500 hover:text-brand'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center">
              <User size={24} className="text-slate-400" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            
            {/* Logout Tooltip/Action */}
            <button 
              onClick={onLogout}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap flex items-center gap-2 shadow-xl"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 truncate">Sosan</p>
                <button 
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
              <p className="text-xs text-slate-500 truncate">sosan@example.com</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
