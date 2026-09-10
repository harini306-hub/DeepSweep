import { useState } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

type Screen = "landing" | "dashboard" | "upload" | "history" | "analytics" | "results";
type AppScreen = Exclude<Screen, "landing">;

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  if (screen === "landing") {
    return <Landing onEnterApp={() => setScreen("dashboard")} />;
  }

  const navigate = (s: AppScreen) => setScreen(s);

  return (
    <div className="page-bg min-h-screen">
      <Sidebar
        active={screen as AppScreen}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <TopBar
        sidebarWidth={sidebarWidth}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />
      <main
        className="transition-all duration-300 pt-16"
        style={{ paddingLeft: sidebarWidth }}
      >
        {screen === "dashboard" && <Dashboard onNavigate={navigate} />}
        {screen === "upload" && <Upload onNavigate={navigate} />}
        {screen === "results" && <Results />}
        {screen === "analytics" && <Analytics />}
        {screen === "history" && <History onNavigate={navigate} />}
      </main>
    </div>
  );
}
