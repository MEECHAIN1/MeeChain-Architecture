
import React from 'react';

export const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-3xl">🔗</span> MeeChain Architecture
        </h1>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-600 transition">ภาพรวม</button>
          <button onClick={() => scrollToSection('simulation')} className="hover:text-blue-600 transition">ระบบจำลอง</button>
          <button onClick={() => scrollToSection('details')} className="hover:text-blue-600 transition">เจาะลึกข้อมูล</button>
          <button onClick={() => scrollToSection('analysis')} className="hover:text-blue-600 transition">วิเคราะห์ผล</button>
        </nav>
        <div className="md:hidden">
          <span className="text-2xl">☰</span>
        </div>
      </div>
    </header>
  );
};
