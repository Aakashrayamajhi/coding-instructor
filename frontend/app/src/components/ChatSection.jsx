// components/Chat.jsx

import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import Message from "./Message";
import InputBox from "./InputBox";

const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/ask'
    : '/ask';

export default function ChatSection({ setSidebarOpen, setCodeOpen }) {
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([
    { id: 1, who: 'ai', text: "Hello Aakash! Today we're tackling Level Order Traversal..." },
    { id: 2, who: 'user', text: 'Can you explain time and space complexity?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs]);

  async function send(){
    const prompt = text.trim();
    if (!prompt) return;

    setError('');
    setLoading(true);
    setText('');

    const userMessage = { id: Date.now(), who: 'user', text: prompt };
    setMsgs(prev => [...prev, userMessage]);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server error');
      }

      setMsgs(prev => [
        ...prev,
        { id: Date.now() + 1, who: 'ai', text: data.reply || 'No reply from server.' }
      ]);
    } catch (err) {
      setError(err.message || 'Unable to send message');
      setMsgs(prev => [
        ...prev,
        { id: Date.now() + 2, who: 'ai', text: 'Sorry, I could not reach the server.' }
      ]);
    } finally {
      setLoading(false);
    }
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

      {error && (
        <div style={{ padding: '0 18px 10px', color: '#ff8b8b', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div className="chat-input">
        <textarea
          placeholder="Ask a question..."
          aria-label="Message"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          disabled={loading}
        />
        <div className="actions">
          <div className="send-hint">Try: "Explain space complexity"</div>
          <button className="send" onClick={send} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </>
  );
}