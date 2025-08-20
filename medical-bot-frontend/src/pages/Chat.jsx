import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import { useChat } from "../context/ChatContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { activeChat, activeId, newChat, sendMessage } = useChat();

  useEffect(() => {
    if (!user) nav("/login");
    // auto-create a chat if none exists
    if (!activeId) newChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeId]);

  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!activeChat || activeChat.messages.length === 0 ? (
              <div className="text-gray-500 text-sm">
                Ask your first question—keep it medical 🩺
              </div>
            ) : (
              activeChat.messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
              ))
            )}
          </div>
          <div className="border-t p-3">
            <ChatInput onSend={(t) => sendMessage(t)} />
            <p className="text-[11px] text-gray-400 mt-2">
              Tip: you can scope answers to the Medical_book by setting a filter
              in code:
              <code> {'{ source: { $eq: "Medical_book .pdf" } }'}</code>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
