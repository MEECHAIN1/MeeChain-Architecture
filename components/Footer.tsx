
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2">
              <span>🔗</span> MeeChain
            </div>
            <p className="text-slate-500 text-sm">© 2024 MeeChain Architecture Report. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition">MeeScan Explorer</a>
            <a href="#" className="hover:text-blue-600 transition">Documentation</a>
            <a href="#" className="hover:text-blue-600 transition">GitHub</a>
            <a href="#" className="hover:text-blue-600 transition">MeeBot UI</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            "Bridging the gap between Off-chain efficiency and On-chain integrity"
          </p>
        </div>
      </div>
    </footer>
  );
};
