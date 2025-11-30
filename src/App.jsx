import React, { useState } from 'react';
import { 
  LayoutGrid, 
  UserPlus, 
  Terminal, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Trash2, 
  Activity, 
  Shield, 
  Wallet, 
  Globe, 
  Zap, 
  Lock, 
  ChevronRight, 
  Menu, 
  X, 
  Loader2, 
  LogIn, 
  FileText, 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Edit, 
  List, 
  Save, 
  Bell, 
  ExternalLink, 
  AlertTriangle,
  MoreHorizontal,
  Send,
  Image,
  ClipboardCopy
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_LISTS_DATA = [
  { 
    id: '101', 
    name: 'Solana Meme Hunters', 
    visibility: 'PUBLIC', 
    last_summary_time: '2025-11-29 10:30',
    last_signal: 'WIF Breakout',
    count: 45, 
    description: "Tracking top 45 profitable wallets on Solana.",
    schedule: "08:00",
    owner_id: 'other',
    members: [
      { id: 1, screen_name: 'Ansem', status: 'ACTIVE', last_active: '5m' },
      { id: 2, screen_name: 'HsakaTrades', status: 'ACTIVE', last_active: '1h' },
    ]
  },
  { 
    id: '102', 
    name: 'Base Chain Devs', 
    visibility: 'PRIVATE', 
    last_summary_time: '2025-11-29 08:15', 
    last_signal: 'Smart Wallet',
    count: 12, 
    description: "Core developers of Base ecosystem.",
    schedule: "12:00",
    owner_id: 'me', 
    members: []
  },
  { 
    id: '103', 
    name: 'A16Z Portfolio', 
    visibility: 'PUBLIC', 
    last_summary_time: '2025-11-28 20:00', 
    last_signal: 'New Investment',
    count: 150, 
    description: "Projects invested by a16z.",
    schedule: "20:00",
    owner_id: 'other',
    members: []
  },
  { 
    id: '104', 
    name: 'My Private Alpha', 
    visibility: 'PRIVATE', 
    last_summary_time: '2025-11-29 09:00', 
    last_signal: 'Accumulation',
    count: 5, 
    description: "My secret watchlist.",
    schedule: "09:00",
    owner_id: 'me',
    members: []
  },
];

const MOCK_REPORTS = [
  { 
    id: 1, 
    date: '2025-11-29', 
    time: '10:30', 
    sentiment: 'EXTREME GREED', 
    title: 'Solana Meme Season Returns', 
    summary: `
### 📊 Market Sentiment
Sentiment is **EXTREMELY BULLISH**. Capital is rotating rapidly into Solana Meme sector.

### 🔥 Consensus Tickers
| Ticker | Heat | Signal | Source |
|---|---|---|---|
| **$WIF** | 🔥9 | Hat stays on, ATH imminent | @Ansem |
| **$BONK** | 🔥6 | Burn proposal live | @SolanaLegend |

### 💡 Alpha Watch
- **$CHILL**: 3 Whales accumulated in last hour.
    ` 
  },
  { 
    id: 2, 
    date: '2025-11-28', 
    time: '08:00', 
    sentiment: 'NEUTRAL', 
    title: 'Market Consolidation', 
    summary: "### 📊 Market Sentiment\nMarket is ranging, waiting for macro data." 
  },
];

const LATEST_INTEL = {
  list_name: "My Private Alpha",
  date: "2025-11-29",
  time: "09:00",
  title: "**ALPHA ALERT**: Smart money accumulating **$CHILL**.",
  content: "Key Signals:\n• Target @SmartMoney001 followed official account.\n• Large withdrawals from CEX detected."
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedList, setSelectedList] = useState(null); 
  const [defaultTab, setDefaultTab] = useState('targets'); 
  const [userTier, setUserTier] = useState('guest'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [myLists, setMyLists] = useState(MOCK_LISTS_DATA);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserTier('free');
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserTier('guest');
    setCurrentPage('home');
    setSelectedList(null);
  };

  const handleListCreated = (newList) => {
    newList.owner_id = 'me';
    setMyLists([newList, ...myLists]);
    setSelectedList(newList);
    setDefaultTab('targets');
    setCurrentPage('list_detail'); 
  };

  const handleListClick = (list, tab = 'targets') => {
    if (list.visibility === 'PRIVATE' && !isLoggedIn) {
        setShowLoginModal(true);
        return;
    }
    setSelectedList(list);
    setDefaultTab(tab);
    setCurrentPage('list_detail'); 
  };

  const handleViewFullReport = () => {
    if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
    }
    const list = myLists.find(l => l.name === LATEST_INTEL.list_name);
    if (list) {
      setSelectedList(list);
      setDefaultTab('reports');
      setCurrentPage('list_detail');
    }
  };

  const handleDeleteList = (id) => {
      if (confirm('Delete this list? This cannot be undone.')) {
          setMyLists(myLists.filter(l => l.id !== id));
      }
  };

  const handleUpdateList = (updatedList) => {
      setMyLists(myLists.map(l => l.id === updatedList.id ? updatedList : l));
  };

  return (
    <div className="flex h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-500/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F0F0F] border border-red-500/30 p-8 relative shadow-[0_0_50px_rgba(220,38,38,0.15)] clip-path-polygon">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/5 border border-red-600/50 rounded-none mb-6 relative">
                <Lock className="w-8 h-8 text-red-500 relative z-10" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight font-mono">LOGIN REQUIRED</h2>
            </div>
            <div className="space-y-3">
              <button onClick={handleLogin} className="group w-full bg-white text-black h-12 font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-all clip-path-btn-slant">
                <Globe className="w-4 h-4" /> <span>CONNECT GOOGLE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setIsMobileMenuOpen(false);
        }} 
        userTier={userTier}
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
        <Header 
          isLoggedIn={isLoggedIn}
          userTier={userTier} 
          onOpenMenu={() => setIsMobileMenuOpen(true)}
          onLogin={() => setShowLoginModal(true)}
          onLogout={handleLogout}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto h-full">
            {currentPage === 'home' && (
              <HomePage 
                lists={myLists} 
                isLoggedIn={isLoggedIn} 
                onListClick={handleListClick} 
                onViewReport={handleViewFullReport}
              />
            )}
            {currentPage === 'create_list' && (
              <CreateList onSuccess={handleListCreated} onCancel={() => setCurrentPage('home')} />
            )}
            {currentPage === 'list_detail' && selectedList && (
              <ListDetail 
                list={selectedList} 
                initialTab={defaultTab}
                onBack={() => setCurrentPage('home')} 
                isLoggedIn={isLoggedIn}
                isOwner={selectedList.owner_id === 'me'} 
                onUpdate={handleUpdateList}
                onDelete={(id) => {
                    handleDeleteList(id);
                    setCurrentPage('home');
                }}
              />
            )}
            {currentPage === 'list_management' && (
               <ListManagement 
                  lists={myLists.filter(l => l.owner_id === 'me')} 
                  isLoggedIn={isLoggedIn} 
                  onDelete={handleDeleteList}
                  onUpdate={handleUpdateList}
                  onLogin={() => setShowLoginModal(true)}
                  onListClick={handleListClick}
               />
            )}
            {currentPage === 'settings' && <SettingsPage />}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Header ---
function Header({ isLoggedIn, userTier, onOpenMenu, onLogin, onLogout }) {
  return (
    <header className="h-16 border-b border-[#222] bg-[#050505]/90 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onOpenMenu} className="md:hidden text-gray-400 hover:text-white">
          <Menu size={20} />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3 bg-[#111] border border-[#222] pl-3 pr-1 py-1 rounded-sm group hover:border-gray-600 transition">
             <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold text-white leading-tight">0xChow...777</div>
                <div className="text-[8px] text-green-500 font-mono uppercase leading-tight">{userTier.toUpperCase()} PLAN</div>
             </div>
             <button onClick={onLogout} className="h-7 w-7 bg-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-red-900/50 hover:text-red-500 transition" title="Logout">
                <LogOut size={12} />
             </button>
          </div>
        ) : (
          <button 
            onClick={onLogin} 
            className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-red-600 hover:bg-red-500 px-5 py-2 transition clip-path-btn-slant shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            <LogIn size={14} />
            LOGIN
          </button>
        )}
      </div>
    </header>
  );
}

// --- Sidebar ---
function Sidebar({ currentPage, setCurrentPage, userTier, isLoggedIn, onLogin, onLogout, isOpen, onClose }) {
  const menuItems = [
    { id: 'home', label: 'DASHBOARD', icon: LayoutGrid },
    { id: 'create_list', label: 'CREATE LIST', icon: Plus },
    { id: 'list_management', label: 'MY LISTS', icon: List },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-[240px] bg-[#080808] border-r border-[#222] flex flex-col transition-transform duration-300 ease-in-out
      md:translate-x-0 md:static md:h-screen
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-20 flex items-center px-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#111] border border-[#333] flex items-center justify-center shadow-[0_0_10px_rgba(255,0,0,0.2)]">
            <Activity className="w-4 h-4 text-red-500" />
          </div>
          <span className="font-bold tracking-widest text-xl text-white font-mono">RADAR</span>
        </div>
        <button onClick={onClose} className="md:hidden ml-auto text-gray-500"><X size={20} /></button>
      </div>

      <nav className="flex-1 py-8 space-y-1 px-0">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id === 'add' ? 'create_list' : item.id)}
            className={`w-full flex items-center gap-3 px-6 py-4 text-xs font-bold font-mono tracking-widest transition-all duration-200 group border-l-2 ${
              currentPage === item.id
                ? 'text-white bg-red-500/5 border-red-500' 
                : 'text-gray-500 hover:text-gray-200 hover:bg-[#0A0A0A] border-transparent'
            }`}
          >
            <item.icon size={16} className={`transition-colors ${currentPage === item.id ? 'text-red-500' : 'text-gray-600 group-hover:text-gray-400'}`} />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[#222]">
         <div className="text-[9px] font-mono text-gray-700 text-center tracking-widest">v2.2.0 STABLE</div>
      </div>
    </aside>
  );
}

// --- HomePage (Dashboard) ---
function HomePage({ lists, isLoggedIn, onListClick, onViewReport }) {
  return (
    <div className="animate-in fade-in zoom-in duration-300 pt-2 space-y-10">
      
      {/* 1. LATEST INTEL */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-sm text-gray-200 flex items-center gap-2 tracking-wider font-bold">
            <Zap size={14} className="text-yellow-500" />
            LATEST INTEL
          </h3>
          <span className="text-[10px] text-gray-500 font-mono animate-pulse">LIVE UPDATING...</span>
        </div>
        
        {isLoggedIn ? (
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#080808] border border-[#222] p-6 md:p-8 relative overflow-hidden group hover:border-yellow-500/30 transition shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
             
             <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 relative z-10">
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <span 
                        onClick={() => onListClick({ name: LATEST_INTEL.list_name, visibility: 'PUBLIC' }, 'reports')}
                        className="text-yellow-500 font-bold font-mono text-base hover:underline cursor-pointer"
                      >
                        {LATEST_INTEL.list_name}
                      </span>
                      <span className="text-gray-600 text-xs">/</span>
                      <span className="text-gray-400 text-xs font-mono">{LATEST_INTEL.date} {LATEST_INTEL.time}</span>
                   </div>
                </div>
                <button 
                  onClick={onViewReport}
                  className="text-xs border border-[#333] bg-[#0A0A0A] text-gray-400 px-4 py-2 hover:text-white hover:border-gray-500 transition font-mono"
                >
                  VIEW FULL REPORT
                </button>
             </div>
             
             <div className="prose prose-invert max-w-none font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed relative z-10">
                <div dangerouslySetInnerHTML={{ __html: LATEST_INTEL.title.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                <div className="mt-4 p-4 bg-[#0A0A0A] border border-[#222] rounded text-xs text-gray-400">
                   {LATEST_INTEL.content}
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-[#0A0A0A] border border-[#222] border-dashed p-8 text-center flex flex-col items-center justify-center gap-4">
            <Lock size={24} className="text-gray-600"/>
            <div className="text-sm text-gray-500 font-mono">Please login to view your personalized intel.</div>
            <button onClick={onViewReport} className="text-xs bg-[#151515] text-white px-4 py-2 border border-[#333] hover:border-red-500 transition">LOGIN</button>
          </div>
        )}
      </section>

      {/* 2. DISCOVER LISTS */}
      <section>
        <div className="p-5 border-t border-x border-[#222] flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0A0A0A]">
          <div>
            <h3 className="font-mono text-sm text-gray-200 flex items-center gap-2 tracking-wider font-bold">
              <Globe size={14} className="text-blue-500" />
              DISCOVER LISTS
            </h3>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input placeholder="SEARCH LIST..." className="bg-[#050505] border border-[#222] text-white text-xs px-3 py-2 pl-9 w-full focus:border-red-500 focus:outline-none font-mono transition-colors placeholder-gray-700" />
            </div>
          </div>
        </div>

        <div className="border border-[#222] bg-[#080808] overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[10px] text-gray-500 font-mono border-b border-[#222] bg-[#0C0C0C] uppercase tracking-wider">
                <th className="px-6 py-4 font-normal w-20">ID</th>
                <th className="px-6 py-4 font-normal">LIST NAME</th>
                <th className="px-6 py-4 font-normal w-24">MEMBERS</th>
                <th className="px-6 py-4 font-normal w-32">VISIBILITY</th>
                <th className="px-6 py-4 font-normal text-right">LAST SUMMARY</th>
                <th className="px-6 py-4 font-normal text-right w-20">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515]">
              {lists.map((list) => {
                const isPrivate = list.visibility === 'PRIVATE';
                const canClick = !isPrivate || isLoggedIn;
                
                return (
                  <tr 
                    key={list.id} 
                    className={`group transition-colors font-mono text-xs ${
                      canClick ? 'hover:bg-[#111]' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <td 
                      className={`px-6 py-4 text-gray-600 ${canClick ? 'cursor-pointer' : ''}`}
                      onClick={() => canClick && onListClick(list, 'targets')}
                    >
                      #{list.id}
                    </td>
                    
                    <td 
                      className={`px-6 py-4 text-gray-200 font-bold flex items-center gap-2 ${canClick ? 'cursor-pointer' : ''}`}
                      onClick={() => canClick && onListClick(list, 'targets')}
                    >
                      {list.name}
                      {!canClick && <Lock size={10} className="text-red-500"/>}
                    </td>

                    <td className="px-6 py-4 text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <UserPlus size={12} /> {list.count}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {list.visibility === 'PUBLIC' ? (
                        <span className="text-[10px] text-green-500 flex items-center gap-1 bg-green-900/10 px-2 py-0.5 w-fit border border-green-900/20">
                          <Globe size={10}/> PUBLIC
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-500 flex items-center gap-1 bg-[#151515] px-2 py-0.5 w-fit border border-[#333]">
                          <Lock size={10}/> PRIVATE
                        </span>
                      )}
                    </td>

                    <td 
                      className={`px-6 py-4 text-right ${canClick ? 'cursor-pointer' : ''}`}
                      onClick={() => canClick && onListClick(list, 'reports')}
                    >
                      {list.last_summary_time === '-' || list.last_summary_time === 'PENDING...' ? (
                        <span className="text-gray-700">PENDING...</span>
                      ) : (
                        <span className={`flex items-center justify-end gap-2 transition-colors ${canClick ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600'}`}>
                          <FileText size={12} /> {list.last_summary_time}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 group-hover:text-white">
                       {canClick && <ChevronRight size={14} className="ml-auto"/>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// --- 页面：Create List ---
function CreateList({ onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name) return;
    setLoading(true);
    setTimeout(() => {
      const newList = {
        id: Date.now().toString(),
        name: name,
        visibility: visibility.toUpperCase(),
        last_summary_time: 'PENDING...',
        count: 0,
        description: 'New monitoring list',
        members: []
      };
      setLoading(false);
      onSuccess(newList);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full animate-in fade-in slide-in-from-bottom-4">
       <div className="w-full max-w-lg bg-[#080808] border border-[#222] p-1 relative shadow-[0_0_60px_rgba(0,0,0,0.6)]">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500"></div>
          
          <div className="p-8 bg-[#0A0A0A] border border-[#222]">
            <button onClick={onCancel} className="mb-8 flex items-center gap-2 text-xs text-gray-600 hover:text-white transition font-mono">
               <ArrowLeft size={12} /> CANCEL
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-8 font-mono tracking-wider flex items-center gap-3">
               <div className="w-1 h-6 bg-red-500"></div> CREATE NEW LIST
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">LIST NAME</label>
                <input 
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Solana Alpha Hunters"
                  className="w-full bg-[#050505] border border-[#333] h-14 px-5 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors placeholder-gray-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">VISIBILITY</label>
                <div className="grid grid-cols-2 gap-0 border border-[#333] bg-[#050505]">
                   <button 
                     onClick={() => setVisibility('private')} 
                     className={`h-12 text-xs font-mono flex items-center justify-center gap-2 transition-all ${visibility === 'private' ? 'bg-red-900/20 text-white border border-red-500/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]' : 'text-gray-600 hover:text-gray-400 border-r border-[#333]'}`}
                   >
                     <Lock size={12}/> PRIVATE
                   </button>
                   <button 
                     onClick={() => setVisibility('public')} 
                     className={`h-12 text-xs font-mono flex items-center justify-center gap-2 transition-all ${visibility === 'public' ? 'bg-green-900/20 text-white border border-green-500/50 shadow-[inset_0_0_20px_rgba(34,197,94,0.2)]' : 'text-gray-600 hover:text-gray-400'}`}
                   >
                     <Globe size={12}/> PUBLIC
                   </button>
                </div>
                <p className="text-[10px] text-gray-600 mt-3 font-mono flex items-center gap-2">
                  {visibility === 'private' ? <Lock size={10}/> : <Globe size={10}/>}
                  {visibility === 'private' ? 'Private lists are only visible to you.' : 'Public lists can be discovered by community.'}
                </p>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={loading || !name}
                className="w-full bg-white text-black h-12 font-bold font-mono text-sm tracking-widest hover:bg-gray-200 transition mt-4 flex items-center justify-center gap-2 disabled:opacity-50 clip-path-btn-slant"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4"/> : 'CONFIRM & ADD TARGETS'}
              </button>
            </div>
          </div>
       </div>
    </div>
  );
}

// --- 页面：List Detail (Targets & Reports & Settings) ---
function ListDetail({ list, onBack, isLoggedIn, initialTab, isOwner, onUpdate, onDelete }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'targets');
  const [input, setInput] = useState('');
  const [members, setMembers] = useState(list.members || []);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [selectedReport, setSelectedReport] = useState(MOCK_REPORTS[0]);
  
  const [schedule, setSchedule] = useState(list.schedule || '08:00');
  const [visibility, setVisibility] = useState(list.visibility);
  const [saving, setSaving] = useState(false);

  const handleAddTarget = () => {
     if(!input) return;
     setLoadingAdd(true);
     setTimeout(() => {
        setMembers([{ id: Date.now(), screen_name: input.replace('@',''), status: 'ACTIVE', last_active: 'Just now' }, ...members]);
        setInput('');
        setLoadingAdd(false);
     }, 1000);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      if (onUpdate) {
        onUpdate({ ...list, visibility, schedule });
      }
      setSaving(false);
      alert("Settings Saved!");
    }, 800);
  };

  const handleDelete = () => {
      if (onDelete) onDelete(list.id);
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
       {/* List 头部 */}
       <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-[#222] pb-6 bg-[#050505] gap-4">
          <div className="flex gap-4">
             <button onClick={onBack} className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-[#111] border border-[#333] text-gray-400 hover:text-white hover:border-white transition"><ArrowLeft size={20}/></button>
             <div>
                <div className="flex items-center gap-3 mb-1">
                   <h2 className="text-3xl font-bold text-white font-mono">{list.name}</h2>
                   <span className={`text-[10px] px-2 py-0.5 border flex items-center gap-1 ${visibility === 'PUBLIC' ? 'text-green-500 border-green-900/30 bg-green-900/10' : 'text-gray-500 border-[#333]'}`}>
                      {visibility === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE'}
                   </span>
                </div>
                <p className="text-sm text-gray-500 font-mono">{list.description || 'No description provided.'}</p>
             </div>
          </div>
          <div className="flex gap-0 border border-[#333] bg-[#0A0A0A]">
             <button onClick={() => setActiveTab('targets')} className={`px-6 py-2 text-xs font-bold font-mono transition ${activeTab === 'targets' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'}`}>TARGETS ({members.length})</button>
             <button onClick={() => setActiveTab('reports')} className={`px-6 py-2 text-xs font-bold font-mono transition border-l border-[#333] ${activeTab === 'reports' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'}`}>REPORTS</button>
             {/* 只有拥有者可见设置 */}
             {isOwner && (
                <button onClick={() => setActiveTab('settings')} className={`px-6 py-2 text-xs font-bold font-mono transition border-l border-[#333] ${activeTab === 'settings' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'}`}>SETTINGS</button>
             )}
          </div>
       </div>

       <div className="flex-1 overflow-hidden relative">
          {/* Tab 1: Targets */}
          {activeTab === 'targets' && (
             <div className="h-full flex flex-col max-w-4xl">
                {isOwner && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white font-mono mb-4 flex items-center gap-2"><Plus size={14} className="text-red-500"/> ADD NEW TARGET</h3>
                    <div className="flex gap-0">
                        <div className="bg-[#111] border border-[#333] border-r-0 flex items-center px-4 text-gray-500 font-mono text-sm">@</div>
                        <input 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddTarget()}
                            placeholder="Twitter Handle (e.g. ElonMusk)" 
                            className="flex-1 bg-[#050505] border border-[#333] h-12 px-4 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors placeholder-gray-700"
                        />
                        <button 
                            onClick={handleAddTarget}
                            disabled={loadingAdd || !input}
                            className="bg-white text-black hover:bg-gray-200 px-6 font-bold font-mono text-sm transition disabled:opacity-50 clip-path-btn-slant"
                        >
                            {loadingAdd ? <Loader2 className="animate-spin w-4 h-4"/> : 'ADD'}
                        </button>
                    </div>
                  </div>
                )}
                
                <div className="flex-1 overflow-y-auto border border-[#222] bg-[#080808]">
                   <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-[#0C0C0C] text-[10px] text-gray-500 font-mono border-b border-[#222] sticky top-0">
                         <tr>
                            <th className="px-6 py-3 font-normal">HANDLE</th>
                            <th className="px-6 py-3 font-normal">STATUS</th>
                            <th className="px-6 py-3 font-normal text-right">LAST ACTIVE</th>
                            <th className="px-6 py-3 font-normal text-right">ACTION</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[#151515]">
                         {members.length === 0 ? (
                            <tr><td colSpan="4" className="p-12 text-center text-gray-600 font-mono text-xs">LIST IS EMPTY.</td></tr>
                         ) : (
                            members.map(m => (
                               <tr key={m.id} className="hover:bg-[#111] group transition-colors font-mono text-xs">
                                  <td className="px-6 py-4 text-gray-200 font-bold">@{m.screen_name}</td>
                                  <td className="px-6 py-4"><span className="text-green-500 bg-green-900/10 px-2 py-0.5 border border-green-900/30">{m.status}</span></td>
                                  <td className="px-6 py-4 text-right text-gray-500">{m.last_active}</td>
                                  <td className="px-6 py-4 text-right">
                                     {isOwner && <button className="text-gray-600 hover:text-red-500 transition"><Trash2 size={14}/></button>}
                                  </td>
                               </tr>
                            ))
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          )}

          {/* Tab 2: Reports */}
          {activeTab === 'reports' && (
             <div className="h-full flex gap-0 overflow-hidden border border-[#222]">
                <div className="w-64 bg-[#0A0A0A] border-r border-[#222] flex flex-col h-full overflow-y-auto custom-scrollbar">
                   <div className="p-4 border-b border-[#222] bg-[#0C0C0C]">
                      <h3 className="text-[10px] font-bold text-gray-500 font-mono tracking-widest">HISTORY</h3>
                   </div>
                   <div className="divide-y divide-[#151515]">
                      {MOCK_REPORTS.map(report => (
                         <button key={report.id} onClick={() => setSelectedReport(report)} className={`w-full text-left p-4 hover:bg-[#151515] transition group border-l-2 ${selectedReport.id === report.id ? 'bg-[#111] border-red-500' : 'border-transparent'}`}>
                            <div className="flex justify-between items-start mb-1">
                               <span className={`font-mono text-xs font-bold ${selectedReport.id === report.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{report.date}</span>
                               {selectedReport.id === report.id && <ChevronRight size={12} className="text-red-500"/>}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 truncate font-mono">{report.title}</div>
                         </button>
                      ))}
                   </div>
                </div>
                <div className="flex-1 bg-[#080808] relative overflow-y-auto custom-scrollbar shadow-2xl">
                   {selectedReport ? (
                      <div className="p-8 max-w-3xl">
                         <div className="flex justify-between items-start border-b border-[#222] pb-6 mb-6">
                            <div>
                               <div className="text-3xl font-bold text-white mb-2 font-mono flex items-center gap-3">{selectedReport.date} <span className="text-xs bg-[#111] border border-[#333] text-gray-400 px-2 py-1 rounded">DAILY BRIEF</span></div>
                               <div className="flex gap-4 text-xs font-mono text-gray-500"><span>BY GROK-3</span><span>|</span><span>{selectedReport.time} UTC</span></div>
                            </div>
                            <button className="text-xs bg-red-600 hover:bg-red-500 text-white px-4 py-2 font-bold font-mono transition">EXPORT PDF</button>
                         </div>
                         <div className="prose prose-invert max-w-none font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: selectedReport.summary.replace(/\n/g, '<br/>').replace(/### (.*)/g, '<h3 class="text-lg font-bold text-white mt-8 mb-4 text-red-500 uppercase tracking-wider border-l-2 border-red-500 pl-3">$1</h3>').replace(/\*\*(.*)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\|/g, '') }} />
                         </div>
                      </div>
                   ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs">SELECT A REPORT TO VIEW</div>
                   )}
                </div>
             </div>
          )}

          {/* Tab 3: Settings (Inside List Detail) */}
          {activeTab === 'settings' && isOwner && (
             <div className="max-w-2xl h-full overflow-y-auto">
                <div className="border border-[#222] bg-[#0A0A0A] p-8">
                   <h3 className="text-sm font-bold text-white font-mono mb-8 flex items-center gap-2 border-b border-[#222] pb-4">
                      <Settings size={16} className="text-red-500"/> LIST CONFIGURATION
                   </h3>
                   
                   <div className="space-y-8">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-3 uppercase tracking-widest">Daily Summary Time (UTC)</label>
                        <div className="relative">
                           <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                           <select 
                              value={schedule}
                              onChange={(e) => setSchedule(e.target.value)}
                              className="w-full bg-[#050505] border border-[#333] h-12 pl-12 pr-4 text-white font-mono text-sm focus:border-red-500 focus:outline-none appearance-none transition-colors"
                           >
                              <option value="00:00">00:00 AM</option>
                              <option value="08:00">08:00 AM (Default)</option>
                              <option value="12:00">12:00 PM</option>
                              <option value="20:00">08:00 PM</option>
                           </select>
                        </div>
                        <p className="text-[10px] text-gray-600 mt-2 font-mono">* AI will generate a report at this time daily.</p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-3 uppercase tracking-widest">VISIBILITY</label>
                        <div className="grid grid-cols-2 gap-0 border border-[#333] bg-[#050505]">
                           <button 
                             onClick={() => setVisibility('PRIVATE')} 
                             className={`h-12 text-xs font-mono flex items-center justify-center gap-2 transition-all ${visibility === 'PRIVATE' ? 'bg-red-900/20 text-white border border-red-500/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]' : 'text-gray-600 hover:text-gray-400 border-r border-[#333]'}`}
                           >
                             <Lock size={12}/> PRIVATE
                           </button>
                           <button 
                             onClick={() => setVisibility('PUBLIC')} 
                             className={`h-12 text-xs font-mono flex items-center justify-center gap-2 transition-all ${visibility === 'PUBLIC' ? 'bg-green-900/20 text-white border border-green-500/50 shadow-[inset_0_0_20px_rgba(34,197,94,0.2)]' : 'text-gray-600 hover:text-gray-400'}`}
                           >
                             <Globe size={12}/> PUBLIC
                           </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-8 border-t border-[#222]">
                        <button 
                            onClick={handleSaveSettings}
                            disabled={saving}
                            className="bg-white text-black h-12 px-8 font-bold font-mono text-sm tracking-widest hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50 clip-path-btn-slant"
                        >
                            {saving ? <Loader2 className="animate-spin w-4 h-4"/> : <><CheckCircle size={16}/> SAVE CHANGES</>}
                        </button>
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-400 text-xs font-mono font-bold flex items-center gap-2 border border-red-900/30 hover:border-red-500/50 px-4 py-2 transition">
                           <Trash2 size={12}/> DELETE LIST
                        </button>
                      </div>
                   </div>
                </div>
             </div>
          )}
       </div>
    </div>
  );
}

// --- 页面：List Management (My Lists) ---
function ListManagement({ lists, isLoggedIn, onDelete, onUpdate, onLogin, onListClick }) {
  const [editingList, setEditingList] = useState(null);

  const handleEdit = (list) => {
    setEditingList({ ...list });
  };

  const handleSave = () => {
    if (editingList) {
      onUpdate(editingList);
      setEditingList(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-in fade-in">
         <div className="text-center p-12 border border-[#222] bg-[#0A0A0A]">
            <Shield size={48} className="text-red-500 mx-auto mb-4 opacity-50"/>
            <h3 className="text-white font-bold text-lg mb-2">PERMISSION DENIED</h3>
            <p className="text-gray-500 text-xs font-mono mb-6">Please login to manage your lists.</p>
            <button onClick={onLogin} className="bg-white text-black px-6 py-2 font-bold font-mono text-xs hover:bg-gray-200 transition">LOGIN</button>
         </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in duration-300 pt-4">
       {/* Edit Modal */}
       {editingList && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0F0F0F] border border-[#333] p-6 relative shadow-2xl">
            <button onClick={() => setEditingList(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
            <h3 className="text-lg font-bold text-white mb-6 font-mono flex items-center gap-2"><Edit size={16}/> EDIT LIST</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">LIST NAME</label>
                <input 
                  value={editingList.name}
                  onChange={e => setEditingList({...editingList, name: e.target.value})}
                  className="w-full bg-[#050505] border border-[#333] h-10 px-4 text-white font-mono text-xs focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">VISIBILITY</label>
                <div className="grid grid-cols-2 gap-0 border border-[#333] bg-[#050505]">
                   <button onClick={() => setEditingList({...editingList, visibility: 'PRIVATE'})} className={`h-10 text-xs font-mono flex items-center justify-center gap-2 transition-colors ${editingList.visibility === 'PRIVATE' ? 'bg-red-900/20 text-white border-r border-[#333]' : 'text-gray-600 hover:text-gray-400 border-r border-[#333]'}`}><Lock size={12}/> PRIVATE</button>
                   <button onClick={() => setEditingList({...editingList, visibility: 'PUBLIC'})} className={`h-10 text-xs font-mono flex items-center justify-center gap-2 transition-colors ${editingList.visibility === 'PUBLIC' ? 'bg-green-900/20 text-white' : 'text-gray-600 hover:text-gray-400'}`}><Globe size={12}/> PUBLIC</button>
                </div>
              </div>
              <button onClick={handleSave} className="w-full bg-white text-black h-10 font-bold font-mono text-xs hover:bg-gray-200 transition flex items-center justify-center gap-2"><Save size={14}/> SAVE CHANGES</button>
            </div>
          </div>
        </div>
      )}

      <div className="border border-[#222] bg-[#080808] relative shadow-2xl">
        <div className="p-5 border-b border-[#222] bg-[#0A0A0A] flex justify-between items-center">
          <h3 className="font-mono text-sm text-gray-200 flex items-center gap-2 tracking-wider font-bold">
            <List size={14} className="text-red-500" />
            MY LISTS
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[10px] text-gray-500 font-mono border-b border-[#222] bg-[#0C0C0C] uppercase tracking-wider">
                <th className="px-6 py-4 font-normal w-16">ID</th>
                <th className="px-6 py-4 font-normal">NAME</th>
                <th className="px-6 py-4 font-normal">VISIBILITY</th>
                <th className="px-6 py-4 font-normal">SCHEDULE (UTC)</th>
                <th className="px-6 py-4 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515]">
              {lists.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center text-xs text-gray-600 font-mono">NO LISTS FOUND. CREATE ONE FIRST.</td></tr>
              ) : (
                lists.map((list) => (
                <tr 
                  key={list.id} 
                  onClick={(e) => {
                    if (e.target.closest('button')) return;
                    onListClick(list, 'reports');
                  }}
                  className="hover:bg-[#111] group transition-colors font-mono text-xs cursor-pointer"
                >
                  <td className="px-6 py-4 text-gray-600">#{list.id}</td>
                  <td className="px-6 py-4 text-gray-200 font-bold">{list.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-0.5 border ${list.visibility === 'PUBLIC' ? 'text-green-500 border-green-900/30 bg-green-900/10' : 'text-gray-500 border-[#333]'}`}>
                      {list.visibility}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{list.schedule}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(list); }} className="p-1.5 bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#222] rounded transition" title="Edit"><Edit size={14}/></button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(list.id); }} className="p-1.5 bg-[#1A1A1A] text-gray-400 hover:text-red-500 hover:bg-red-900/20 rounded transition" title="Delete"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 页面：Settings Page (Tutorial) ---
function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in pb-12">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
          <Settings size={20} className="text-red-500"/> SYSTEM CONFIGURATION
        </h2>
        <p className="text-xs text-gray-500 font-mono mt-2">Follow these steps to enable Telegram notifications.</p>
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="border border-[#222] bg-[#0A0A0A] p-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
           <h3 className="text-sm font-bold text-white mb-4 font-mono flex items-center gap-2">
             <span className="bg-blue-600 text-black text-[10px] px-1.5 py-0.5 rounded font-bold">STEP 01</span>
             CREATE YOUR BOT
           </h3>
           <p className="text-xs text-gray-400 font-mono mb-4 leading-relaxed">
             1. Open Telegram and search for <span className="text-white">@BotFather</span>.<br/>
             2. Send command <span className="text-green-500">/newbot</span>.<br/>
             3. Follow instructions to name your bot.<br/>
             4. Copy the <span className="text-red-500">HTTP API Token</span>.
           </p>
           {/* Image Placeholder */}
           <div className="w-full h-48 bg-[#111] border border-[#333] border-dashed flex flex-col items-center justify-center text-gray-600 font-mono text-xs mb-2">
              <div className="flex items-center gap-2"><Image size={16}/> <span>[ SCREENSHOT: BotFather Token ]</span></div>
           </div>
        </div>

        {/* Step 2 */}
        <div className="border border-[#222] bg-[#0A0A0A] p-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
           <h3 className="text-sm font-bold text-white mb-4 font-mono flex items-center gap-2">
             <span className="bg-purple-600 text-black text-[10px] px-1.5 py-0.5 rounded font-bold">STEP 02</span>
             SETUP CHANNEL
           </h3>
           <p className="text-xs text-gray-400 font-mono mb-4 leading-relaxed">
             1. Create a new Channel (or Group).<br/>
             2. Add your new bot as an <span className="text-white">Administrator</span>.<br/>
             3. This allows the bot to post daily summaries automatically.
           </p>
           {/* Image Placeholder */}
           <div className="w-full h-48 bg-[#111] border border-[#333] border-dashed flex flex-col items-center justify-center text-gray-600 font-mono text-xs">
              <div className="flex items-center gap-2"><Image size={16}/> <span>[ SCREENSHOT: Add Admin ]</span></div>
           </div>
        </div>

        {/* Step 3 */}
        <div className="border border-[#222] bg-[#0A0A0A] p-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
           <h3 className="text-sm font-bold text-white mb-4 font-mono flex items-center gap-2">
             <span className="bg-green-600 text-black text-[10px] px-1.5 py-0.5 rounded font-bold">STEP 03</span>
             LINK TO PLATFORM
           </h3>
           <div className="space-y-4">
             <div>
               <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Bot Token</label>
               <div className="relative">
                  <input type="text" placeholder="123456789:ABCdef..." className="w-full bg-[#050505] border border-[#333] h-10 px-3 text-white font-mono text-xs focus:border-green-500 outline-none"/>
                  <ClipboardCopy size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-white"/>
               </div>
             </div>
             <div>
               <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Channel Chat ID</label>
               <div className="relative">
                 <input type="text" placeholder="-100xxxxxxxx" className="w-full bg-[#050505] border border-[#333] h-10 px-3 text-white font-mono text-xs focus:border-green-500 outline-none"/>
                 <ClipboardCopy size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-white"/>
               </div>
             </div>
             <button className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-6 text-xs font-mono mt-2 w-fit clip-path-btn-slant transition">
               SAVE CONFIGURATION
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

