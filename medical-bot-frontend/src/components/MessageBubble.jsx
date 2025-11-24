import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm
        ${isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"}`}
      >
        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : ""}`}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
