import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = text.trim();
        if (!v) return;
        onSend(v);
        setText("");
      }}
      className="flex gap-2"
    >
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Ask a medical question…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="bg-brand-600 hover:bg-brand-700 text-white rounded px-4 py-2"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
