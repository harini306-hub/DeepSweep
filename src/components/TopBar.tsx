import { Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  sidebarWidth: number;
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function TopBar({ sidebarWidth, darkMode, onToggleDark }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 glass-panel flex items-center gap-4 px-6 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search scans, reports..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/4 border border-cyan-400/10 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400/40 focus:bg-white/6 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/4 border border-cyan-400/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 glass-panel rounded-xl shadow-2xl p-2 border border-cyan-400/15">
              <div className="px-3 py-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Notifications
              </div>
              {[
                { text: "Scan #1042 analysis complete", time: "2m ago", type: "success" },
                { text: "High debris density alert in Zone 4", time: "14m ago", type: "warn" },
                { text: "New model v1.2 Beta available", time: "1h ago", type: "info" },
              ].map((n, i) => (
                <div key={i} className="px-3 py-2.5 rounded-lg hover:bg-white/4 cursor-pointer transition-colors">
                  <div className="text-sm text-slate-200">{n.text}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/4 border border-cyan-400/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User dropdown */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-cyan-400/10 hover:border-cyan-400/30 transition-all">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
            D
          </div>
          <span className="text-sm text-slate-300 hidden sm:block">Dr. Rivera</span>
          <ChevronDown size={13} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}
