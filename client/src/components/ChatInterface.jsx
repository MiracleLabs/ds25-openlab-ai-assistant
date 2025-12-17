import { useEffect, useRef, useState } from "react";
import leftLogo from "../assets/miracle.png";
import rightLogo from "../assets/ds_25_logo.svg";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, sessionId }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data?.message || "Failed to get response");
      }

      if (!sessionId) setSessionId(data.sessionId);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <header className="h-16 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-between px-8 shadow-md">
        <img src={leftLogo} alt="Left Logo" className="h-18 object-contain" />

        <h1 className="text-white text-lg font-semibold tracking-wide">
          🤖 AI Chat Assistant Using Gemini Flash
        </h1>

        <img src={rightLogo} alt="Right Logo" className="h-18 object-contain" />
      </header>

      {error && (
        <div className="bg-red-100 text-red-700 px-6 py-2 text-sm">{error}</div>
      )}

      <main className="flex-1 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto px-10 py-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-400 animate-pulse">
              Assistant is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-white px-8 py-4 flex gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
