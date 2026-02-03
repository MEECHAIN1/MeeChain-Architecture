
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend 
} from 'recharts';

const data = [
  { subject: 'Speed', A: 95, B: 40, fullMark: 100 },
  { subject: 'Cost', A: 98, B: 30, fullMark: 100 },
  { subject: 'Security', A: 90, B: 95, fullMark: 100 },
  { subject: 'Scalability', A: 92, B: 50, fullMark: 100 },
  { subject: 'User Exp', A: 85, B: 45, fullMark: 100 },
];

export const Analysis: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-blue-500/30">
            Performance Analysis
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            ทำไมต้องใช้<br />
            <span className="text-blue-500">Modular Mission?</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            การเปรียบเทียบระหว่างระบบภารกิจแบบดั้งเดิมที่ประมวลผลบน Layer 1 ทั้งหมด กับแนวทางของ 
            <span className="text-white font-bold"> MeeChain</span> 
            ที่เน้นความเร็วและลดต้นทุนโดยไม่สูญเสียความปลอดภัย
          </p>
          
          <div className="space-y-6">
            <MetricItem label="Gas Efficiency" percent={98} />
            <MetricItem label="Transaction Speed" percent={92} />
            <MetricItem label="Verification Accuracy" percent={100} color="bg-emerald-500" />
          </div>
        </div>

        <div className="h-[400px] bg-slate-800/50 rounded-3xl p-6 backdrop-blur-sm border border-slate-700">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar
                name="MeeChain (Modular)"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Radar
                name="Traditional L1"
                dataKey="B"
                stroke="#94a3b8"
                fill="#94a3b8"
                fillOpacity={0.2}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MetricItem: React.FC<{ label: string; percent: number; color?: string }> = ({ label, percent, color = 'bg-blue-600' }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-medium">
      <span className="text-slate-300">{label}</span>
      <span className="text-white">{percent}% Better</span>
    </div>
    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000`} 
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  </div>
);
