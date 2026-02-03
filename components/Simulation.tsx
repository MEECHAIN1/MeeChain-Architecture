
import React, { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

interface SimulationStepAction {
  nodeIndex: number;
  message: string;
  data: any;
  type: LogEntry['type'];
}

const SIMULATION_SEQUENCE: SimulationStepAction[] = [
  { nodeIndex: 1, message: "User interaction detected: Mission Completed.", data: { missionId: 101, status: "completed" }, type: 'info' },
  { nodeIndex: 2, message: "MeeBot UI sending proof request to API server...", data: { missionId: 101, proof: "0x_base64_proof_data" }, type: 'info' },
  { nodeIndex: 3, message: "API Verifying off-chain logic... SUCCESS.", data: { missionId: 101, verified: true, signer: "0xMeeBot_Admin" }, type: 'success' },
  { nodeIndex: 3, message: "Generating Cryptographic Signature...", data: { missionId: 101, signature: "0x7f3...9a2b" }, type: 'info' },
  { nodeIndex: 4, message: "Uploading NFT Metadata to IPFS...", data: { ipfsHash: "QmXoyp...3n8", name: "MeeBot Pioneer #001" }, type: 'info' },
  { nodeIndex: 5, message: "Calling Smart Contract: mintMissionReward()", data: { target: "0xUser_Address", missionId: 101, signature: "0x7f3...9a2b" }, type: 'info' },
  { nodeIndex: 5, message: "Blockchain Confirmation: Transaction Successful!", data: { txHash: "0x88c...d91e", status: "confirmed" }, type: 'success' },
];

export const Simulation: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(-1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentData, setCurrentData] = useState<any>(null);
  
  const logEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const steps = [
    { id: 'user', label: 'User', icon: '👤', desc: 'เริ่มภารกิจ / Request Mint' },
    { id: 'ui', label: 'MeeBot UI', icon: '🖥️', desc: 'Frontend Interface' },
    { id: 'api', label: 'MeeBot API', icon: '⚙️', desc: 'Verifier & Signer' },
    { id: 'ipfs', label: 'IPFS Storage', icon: '📦', desc: 'Decentralized Metadata' },
    { id: 'chain', label: 'Smart Contract', icon: '⛓️', desc: 'MeeMissionNFT Execution' }
  ];

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const nextStep = () => {
    setSequenceIndex(prev => {
      const nextIdx = prev + 1;
      if (nextIdx < SIMULATION_SEQUENCE.length) {
        const action = SIMULATION_SEQUENCE[nextIdx];
        setActiveNode(action.nodeIndex);
        addLog(action.message, action.type);
        setCurrentData(action.data);
        return nextIdx;
      } else {
        setIsRunning(false);
        addLog("Simulation Finished. NFT is now on-chain.", 'success');
        return prev;
      }
    });
  };

  useEffect(() => {
    if (isRunning && !isPaused && sequenceIndex < SIMULATION_SEQUENCE.length - 1) {
      timerRef.current = window.setTimeout(() => {
        nextStep();
      }, 1500);
    }
    return () => clearTimer();
  }, [isRunning, isPaused, sequenceIndex]);

  const handleStart = () => {
    setLogs([]);
    setCurrentData(null);
    setSequenceIndex(-1);
    setIsRunning(true);
    setIsPaused(false);
    setActiveNode(0);
    // Trigger first step immediately
    nextStep();
  };

  const handlePause = () => {
    setIsPaused(true);
    addLog("Simulation Paused.", 'warning');
  };

  const handleResume = () => {
    setIsPaused(false);
    addLog("Simulation Resumed.", 'info');
  };

  const handleReset = () => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
    setSequenceIndex(-1);
    setActiveNode(0);
    setLogs([]);
    setCurrentData(null);
    addLog("Simulation Reset.", 'info');
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">🕹️ Interaction Flow Simulation</h2>
          <p className="text-slate-600">
            จำลองกระบวนการทำงานจริงตั้งแต่เริ่มทำภารกิจจนถึงการ Mint NFT บนบล็อกเชน
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {!isRunning && sequenceIndex === -1 ? (
            <button 
              onClick={handleStart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>▶️</span> Start
            </button>
          ) : (
            <>
              {isRunning && !isPaused && (
                <button 
                  onClick={handlePause}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>⏸️</span> Pause
                </button>
              )}
              {isRunning && isPaused && (
                <button 
                  onClick={handleResume}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>▶️</span> Resume
                </button>
              )}
              <button 
                onClick={handleReset}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 border border-slate-300"
              >
                <span>🔄</span> Reset
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-slate-100 p-6 md:p-10 rounded-3xl border border-slate-200 shadow-inner">
        {/* Nodes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative mb-12">
          {steps.map((s, idx) => (
            <div 
              key={s.id}
              className={`relative z-10 flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm border-2 transition-all duration-500 ${activeNode === idx + 1 ? 'border-blue-500 ring-4 ring-blue-500/20 scale-105' : 'border-transparent'}`}
            >
              <div className="text-4xl mb-2">{s.icon}</div>
              <h4 className="font-bold text-slate-800">{s.label}</h4>
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-tighter mt-1">{s.desc}</p>
              
              {/* Connector lines for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-6 top-1/2 w-8 h-0.5 bg-slate-300">
                  <div className={`h-full bg-blue-500 transition-all duration-700 ${activeNode > idx + 1 ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900 rounded-2xl p-5 shadow-2xl h-80 flex flex-col border border-slate-800">
            <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-3">
              <span className="text-blue-400 font-mono font-bold flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRunning && !isPaused ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'}`}></span>
                SYSTEM_LOGS
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase">
                {isRunning ? (isPaused ? 'STATUS: PAUSED' : 'STATUS: PROCESSING') : 'STATUS: IDLE'}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto logs-scroll font-mono text-sm space-y-2 pr-2">
              {logs.length === 0 && <div className="text-slate-600 italic">Waiting for simulation to start...</div>}
              {logs.map(log => (
                <div key={log.id} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                  <span className={
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'warning' ? 'text-amber-400' :
                    log.type === 'error' ? 'text-rose-400' : 'text-blue-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 h-80 flex flex-col">
             <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-3">
              <span className="text-slate-700 font-bold flex items-center gap-2">
                🔍 DATA_INSPECTOR
              </span>
            </div>
            <div className="flex-1 overflow-auto bg-slate-50 rounded-xl p-4 border border-slate-100 font-mono text-xs">
              {currentData ? (
                <pre className="text-slate-700">{JSON.stringify(currentData, null, 2)}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                   <div className="text-4xl mb-2">📄</div>
                   <p>No active data capture</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
