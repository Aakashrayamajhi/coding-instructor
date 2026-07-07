// components/Chat.jsx

import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import Message from "./Message";
import InputBox from "./InputBox";

export default function ChatSection({ setSidebarOpen, setCodeOpen }) {
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([
    { id: 1, who: 'ai', text: "Hello Alex! Today we're tackling Level Order Traversal..." },
    { id: 2, who: 'user', text: 'Can you explain space complexity?' }
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs]);

  function send(){
    const v = text.trim();
    if (!v) return;
    const userMsg = { id: Date.now(), who: 'user', text: v };
    setMsgs(m => [...m, userMsg]);
    setText('');
    setTimeout(() => setMsgs(m => [...m, { id: Date.now()+1, who: 'ai', text: 'Short answer: O(n) extra for the queue.' }]), 600);
  }

  return (
    <>
      <div className="chat-top">
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <button className="icon-btn" onClick={() => typeof setSidebarOpen === 'function' && setSidebarOpen(true)} aria-label="Open menu" title="Menu" style={{display: window.innerWidth <= 900 ? 'inline-flex' : 'none'}}>☰</button>
          <div className="title">DSA Mentor AI</div>
        </div>

        <div className="top-controls" style={{marginLeft:'auto', display:'flex', gap:8}}>
          <div className="meta" style={{color:'var(--sub)'}}>Binary Tree Level Order</div>
          <button className="icon-btn show-code" onClick={() => typeof setCodeOpen === 'function' && setCodeOpen(true)} title="Open code" style={{display: window.innerWidth <= 900 ? 'inline-flex' : 'none'}}>Code</button>
        </div>
      </div>

      <div className="messages" role="log" aria-live="polite" ref={listRef}>
        {msgs.map(m => (
          <div key={m.id} className="msg-row" style={{justifyContent: m.who === 'user' ? 'flex-end' : 'flex-start'}}>
            <div className={`message ${m.who === 'ai' ? 'ai' : 'user'}`}>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          placeholder="Ask a question..."
          aria-label="Message"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <div className="actions">
          <div className="send-hint">Try: "Explain space complexity"</div>
          <button className="send" onClick={send} aria-label="Send">Send</button>
        </div>
      </div>
    </>
  );
}