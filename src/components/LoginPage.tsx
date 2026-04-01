import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  CheckCircle2
} from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Branding & Features */}
      <div className="lg:w-1/2 bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-brand-dark/30 rounded-full blur-[120px]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl">A</div>
            <span className="font-bold text-2xl tracking-tight text-white">AdNova</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white leading-tight mb-6"
          >
            Master Your Social <br />
            <span className="text-brand">Presence with AI.</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-md mb-12">
            The all-in-one platform for agencies and brands to schedule, analyze, and optimize cross-platform content.
          </p>

          <div className="space-y-6">
            {[
              'AI-Powered Content Generation',
              'Multi-Platform Scheduling',
              'Advanced Performance Analytics',
              'Client Approval Workflows'
            ].map((feature, i) => (
              <motion.div 
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="w-6 h-6 bg-brand/10 rounded-full flex items-center justify-center text-brand">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-12">
          <div className="flex items-center gap-6 opacity-50">
            <Instagram className="text-white" size={24} />
            <Facebook className="text-white" size={24} />
            <Twitter className="text-white" size={24} />
            <Linkedin className="text-white" size={24} />
          </div>
          <p className="text-slate-500 text-sm mt-8">© 2024 AdNova AI. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <motion.div 
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md py-12"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500">
              {isLogin 
                ? 'Sign in to manage your social media empire.' 
                : 'Join 2,000+ agencies scaling with AdNova.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                  <input 
                    type="text" 
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="AdNova Agency"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-bold text-brand hover:text-brand-dark transition-colors">Forgot Password?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand" />
                <label htmlFor="remember" className="text-sm text-slate-600 font-medium">Remember me for 30 days</label>
              </div>
            )}

            {!isLogin && (
              <p className="text-xs text-slate-500 leading-relaxed">
                By clicking "Create Account", you agree to our <button type="button" className="text-brand font-bold">Terms of Service</button> and <button type="button" className="text-brand font-bold">Privacy Policy</button>.
              </p>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-brand-gradient text-white font-bold rounded-2xl shadow-xl shadow-brand/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-brand hover:text-brand-dark transition-colors"
              >
                {isLogin ? 'Start your 14-day free trial' : 'Sign in to your account'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
