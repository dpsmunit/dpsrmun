import { useState } from "react";
import { Send } from "lucide-react"; // paper plane icon, optional

const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center border-t border-gray-200 p-2 bg-white">
      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about committees..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mun-green text-sm"
      />

      {/* Send Button */}
      <button
        type="button"
        onClick={handleSend}
        className="ml-2 p-2 bg-mun-green text-white rounded-full flex-shrink-0 hover:bg-mun-green/90 transition"
      >
        <Send size={18} /> {/* Paper plane icon */}
      </button>
    </div>
  );
};

export default ChatInput;
