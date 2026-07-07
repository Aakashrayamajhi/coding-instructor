// components/Message.jsx

export default function Message({ msg }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          msg.role === "user" ? "flex-end" : "flex-start",
        padding: "10px",
      }}
    >
      <div
        style={{
          background:
            msg.role === "user" ? "#E53935" : "#1a1a1a",
          padding: "12px",
          borderRadius: "10px",
          maxWidth: "60%",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}