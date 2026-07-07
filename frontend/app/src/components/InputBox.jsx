// components/InputBox.jsx

import { useState } from "react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", padding: "10px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask DSA question..."
        style={{
          flex: 1,
          padding: "10px",
          background: "#1a1a1a",
          border: "none",
          color: "white",
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}