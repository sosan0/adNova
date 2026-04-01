import React from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Calendar,
  Clock,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'alert' | 'message' | 'calendar';
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Post Scheduled',
    description: 'Your Instagram post "Summer Vibes" has been scheduled for tomorrow.',
    time: '2 mins ago',
    type: 'success',
    read: false,
  },
  {
    id: '2',
    title: 'Approval Required',
    description: 'Client "EcoStyle" has requested changes to the latest campaign draft.',
    time: '1 hour ago',
    type: 'alert',
    read: false,
  },
  {
    id: '3',
    title: 'New Comment',
    description: 'Someone commented on your Facebook post: "Love the new collection!"',
    time: '3 hours ago',
    type: 'message',
    read: true,
  },
  {
    id: '4',
    title: 'Weekly Report',
    description: 'Your weekly performance report is ready for review.',
    time: 'Yesterday',
    type: 'calendar',
    read: true,
  },
];

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-500" size={18} />;
      case 'alert': return <AlertCircle className="text-amber-500" size={18} />;
      case 'message': return <MessageSquare className="text-blue-500" size={18} />;
      case 'calendar': return <Calendar className="text-purple-500" size={18} />;
      default: return <Bell className="text-slate-400" size={18} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50"
    >
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900">Notifications</h3>
          <span className="bg-brand/10 text-brand text-[10px] px-1.5 py-0.5 rounded-full font-bold">2 New</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-200 rounded-lg transition-colors text-slate-400"
        >
          <X size={16} />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer relative group ${!notif.read ? 'bg-brand/5' : ''}`}
              >
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand"></div>
                )}
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    notif.type === 'success' ? 'bg-green-50' :
                    notif.type === 'alert' ? 'bg-amber-50' :
                    notif.type === 'message' ? 'bg-blue-50' : 'bg-purple-50'
                  }`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm truncate ${notif.read ? 'text-slate-700 font-medium' : 'text-slate-900 font-bold'}`}>
                        {notif.title}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium shrink-0">
                        <Clock size={10} />
                        {notif.time}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500">No new notifications</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <button className="w-full py-2 text-xs font-bold text-brand hover:text-brand/80 transition-colors uppercase tracking-wider">
          Mark all as read
        </button>
      </div>
    </motion.div>
  );
};
