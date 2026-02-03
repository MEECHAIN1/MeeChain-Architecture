
import React, { useState } from 'react';

type TabType = 'components' | 'data' | 'contract';

export const DeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('components');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">📂 Deep Dive: System Components</h2>
      
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar">
        {(['components', 'data', 'contract'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-blue-600'
            }`}
          >
            {tab === 'components' && 'Components'}
            {tab === 'data' && 'Data Structure'}
            {tab === 'contract' && 'Smart Contract'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[400px]">
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-500">
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-slate-800">Core Architecture Components</h3>
              <ul className="space-y-6">
                <ComponentItem 
                  num={1} 
                  title="MeeBot (UI & Verifier)" 
                  desc="ส่วนหน้าบ้านที่ผู้ใช้ทำภารกิจ และส่วนหลังบ้านที่ตรวจสอบ logic (Verifier) แบบ Off-chain" 
                />
                <ComponentItem 
                  num={2} 
                  title="IPFS (Decentralized Storage)" 
                  desc="ที่เก็บรูปภาพการ์ดและไฟล์ Metadata (.json) ของ NFT เพื่อความโปร่งใสและตรวจสอบได้" 
                />
                <ComponentItem 
                  num={3} 
                  title="Execution Layer (Smart Contract)" 
                  desc="MeeMissionNFT ทำหน้าที่ตรวจสอบลายเซ็น (Signature Verification) และ Mint Token ลงบนเชนจริง" 
                />
              </ul>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border-2 border-dashed border-slate-200 flex items-center justify-center text-center">
              <div>
                <div className="text-5xl mb-4">🧩</div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">Modular Concept</h4>
                <p className="text-slate-600 italic max-w-xs">
                  "เราแยกส่วน Execution ออกจาก Data และ Logic เพื่อให้ระบบรองรับการขยายตัว (Scalability) และยืดหยุ่นต่อการเปลี่ยนแปลงภารกิจในอนาคต"
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-500">
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                <span className="text-blue-500">📄</span> NFT Metadata (JSON)
              </h3>
              <p className="text-sm text-slate-500">มาตรฐาน ERC-721 Metadata ที่จัดเก็บถาวรบน IPFS</p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-2xl text-xs overflow-x-auto font-mono leading-relaxed">
{`{
  "name": "MeeBot Pioneer Card #001",
  "description": "Exclusive mission reward card...",
  "image": "ipfs://QmYourImageHash...",
  "attributes": [
    { "trait_type": "Mission ID", "value": "101" },
    { "trait_type": "Difficulty", "value": "Novice" },
    { "trait_type": "Exp", "value": 500 }
  ]
}`}
              </pre>
            </div>
            <div className="space-y-4">
               <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                <span className="text-purple-500">⛓️</span> On-Chain Event Logs
              </h3>
              <p className="text-sm text-slate-500">ข้อมูล Indexing สำหรับ MeeScan และผู้ตรวจสอบทั่วไป</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-purple-600 font-bold">user:</span>
                  <span className="text-slate-600">0x123...abc</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-purple-600 font-bold">missionId:</span>
                  <span className="text-slate-600">uint256(101)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-purple-600 font-bold">tokenId:</span>
                  <span className="text-slate-600">uint256(5)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600 font-bold">timestamp:</span>
                  <span className="text-slate-600">1698412345</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contract' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl text-slate-800">MeeMissionNFT.sol Logic</h3>
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">SOLIDITY 0.8.20</span>
            </div>
            <p className="text-slate-600">
              Contract จะทำหน้าที่เป็น <strong>Gateway</strong> ตรวจสอบว่าข้อมูลถูก Signed โดย Admin จริงหรือไม่ (Signature Verification) 
              ก่อนที่จะอนุญาตให้ User คนนั้นทำการ Mint NFT ของรางวัล
            </p>
            <div className="bg-slate-900 rounded-2xl p-6 text-sm font-mono overflow-x-auto">
              <pre className="text-slate-300 leading-relaxed">
<span className="text-pink-400">function</span> <span className="text-blue-400">mintMissionReward</span>(to, missionId, uri, signature) {` {`}
  <span className="text-slate-500">// 1. Recreate Hash from raw inputs</span>
  bytes32 hash = <span className="text-yellow-400">keccak256</span>(abi.encodePacked(to, missionId, uri));
  
  <span className="text-slate-500">// 2. Recover Signer address from Signature</span>
  address signer = <span className="text-yellow-400">ecrecover</span>(hash, signature);
  
  <span className="text-slate-500">// 3. Ensure signer is an authorized MeeBot address</span>
  <span className="text-pink-400">require</span>(isAuthorized[signer], <span className="text-orange-400">"Invalid Signature"</span>);
  
  <span className="text-slate-500">// 4. Mint Token & Set URI</span>
  _mint(to, ++totalSupply);
  _setTokenURI(totalSupply, uri);
{`}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ComponentItem: React.FC<{ num: number; title: string; desc: string }> = ({ num, title, desc }) => (
  <li className="flex gap-4">
    <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm">
      {num}
    </div>
    <div>
      <span className="font-bold block text-slate-800 text-lg">{title}</span>
      <span className="text-sm text-slate-500 leading-relaxed">{desc}</span>
    </div>
  </li>
);
