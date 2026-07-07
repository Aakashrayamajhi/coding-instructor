import React, { useState } from 'react';

export default function Sidebar({ setSidebarOpen }) {
  const [showKB, setShowKB] = useState(true);

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div className="logo" style={{display:'flex', alignItems:'center', gap:12}}>
          <div className="badge">CI</div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <h1>DSA Mentor AI</h1>
            <p style={{margin:0, fontSize:12, color:'var(--sub)'}}>Technical Mastery</p>
          </div>
        </div>

        {/* mobile close button */}
        <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
          <button className="btn" onClick={() => setShowKB(s => !s)} aria-label="Toggle KB">
            {showKB ? 'Hide' : 'Show'}
          </button>

          <button
            className="btn"
            onClick={() => typeof setSidebarOpen === 'function' && setSidebarOpen(false)}
            aria-label="Close menu"
            style={{display: window.innerWidth <= 900 ? 'inline-flex' : 'none'}}
          >
            Close
          </button>
        </div>
      </div>

      <div style={{marginTop:8}}>
        <button className="new-chat" onClick={() => { typeof setSidebarOpen === 'function' && setSidebarOpen(false); }}>
          + New Chat
        </button>
      </div>

      {/* KB area */}
      <nav id="kb-list" className="kb" style={{display: showKB ? 'flex' : 'none'}}>
        <a href="#" className="active"><span className="icon">A</span>Arrays</a>
        <a href="#"><span className="icon">S</span>Strings</a>
        <a href="#"><span className="icon">T</span>Trees</a>
        <a href="#"><span className="icon">D</span>Dynamic Programming</a>
      </nav>

      <div style={{flex:'1 1 auto'}} />

      <div className="unlock">UPGRADE TO PRO</div>
    </>
  );
}