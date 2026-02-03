
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="overview" className="bg-white border-b border-slate-100 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Modular Chain System
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Verify Off-chain,<br />
          <span className="text-blue-600 bg-clip-text">Mint On-chain</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          ระบบภารกิจ (Mission System) บนโครงสร้างเชนแบบ Modular ที่เชื่อมต่อระหว่าง 
          <span className="font-semibold text-slate-800"> User</span>, 
          <span className="font-semibold text-slate-800"> MeeBot</span>, และ 
          <span className="font-semibold text-slate-800"> Blockchain</span> 
          เพื่อความเร็วสูงสุดและค่าธรรมเนียมที่ต่ำที่สุด โดยยังคงความโปร่งใสตรวจสอบได้
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <FeatureCard 
            icon="🚀" 
            title="Speed & Efficiency" 
            desc="ลดภาระการประมวลผลบนเชนด้วยการ Verify ภายนอก" 
          />
          <FeatureCard 
            icon="🛡️" 
            title="Secure Signing" 
            desc="ใช้ Cryptographic Signature ป้องกันการโกงอย่างรัดกุม" 
          />
          <FeatureCard 
            icon="📂" 
            title="Transparent Data" 
            desc="Metadata บน IPFS และ Event Log บนเชนเพื่อความโปร่งใส" 
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="font-bold text-lg mb-2 text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);
