import { createContext, useContext, useMemo, useState } from "react";
import { nanoid } from "nanoid/non-secure";
import { api } from "../services/api";
import { loadChats, upsertChat } from "../utils/storage";

const ChatCtx = createContext(null);

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(loadChats());
  const [activeId, setActiveId] = useState(chats[0]?.id || null);
  const activeChat = chats.find((c) => c.id === activeId) || null;

  function newChat(initialQuestion = "") {
    const id = nanoid();
    const chat = {
      id,
      title: initialQuestion?.slice(0, 40) || "New chat",
      messages: initialQuestion
        ? [{ role: "user", content: initialQuestion }]
        : [],
      createdAt: Date.now(),
    };
    setChats((prev) => upsertChat([...prev], chat));
    setActiveId(id);
    return id;
  }

  function renameChat(id, title) {
    setChats((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, title } : c));
      localStorage.setItem("mbot_chats_v1", JSON.stringify(next));
      return next;
    });
  }

  function deleteChat(id) {
    setChats((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem("mbot_chats_v1", JSON.stringify(next));
      if (activeId === id) setActiveId(next[0]?.id || null);
      return next;
    });
  }

  async function sendMessage(text, filter) {
    // optimistic add
    setChats((prev) => {
      const curr = prev.find((c) => c.id === activeId);
      const updated = {
        ...curr,
        messages: [...curr.messages, { role: "user", content: text }],
      };
      return upsertChat([...prev], updated);
    });

    const { answer } = await api.ask(text, filter);

    setChats((prev) => {
      const curr = prev.find((c) => c.id === activeId);
      const updated = {
        ...curr,
        messages: [...curr.messages, { role: "assistant", content: answer }],
      };
      return upsertChat([...prev], updated);
    });

    return true;
  }

  const value = useMemo(
    () => ({
      chats,
      activeId,
      activeChat,
      setActiveId,
      newChat,
      renameChat,
      deleteChat,
      sendMessage,
    }),
    [chats, activeId, activeChat]
  );

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
