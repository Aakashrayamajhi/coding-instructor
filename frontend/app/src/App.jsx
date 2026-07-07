import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import ChatSection from './components/ChatSection';
import CodeSection from './components/CodeSection';

export default function App(){
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [codeOpen, setCodeOpen] = useState(false); // mobile code overlay

  return (
    <>
      <div className="app">
        <div className={`sidebar container-card ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>

        <div className="chat-section container-card">
          <ChatSection setSidebarOpen={setSidebarOpen} setCodeOpen={setCodeOpen} />
        </div>

        <div className="code-section container-card">
          <CodeSection setCodeOpen={setCodeOpen} />
        </div>
      </div>

      {/* mobile backdrop for sidebar */}
      <div className={`backdrop ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* mobile code overlay */}
      {codeOpen && (
        <div className="code-overlay" onClick={() => setCodeOpen(false)}>
          <div className={`code-panel open`} onClick={e => e.stopPropagation()}>
            <CodeSection setCodeOpen={setCodeOpen} isMobileOverlay />
          </div>
        </div>
      )}
    </>
  );
}