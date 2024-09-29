import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import AIGeneratingIndicator from "./AIGenereating";

interface Message {
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

const RasaChat: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isInitialGreeting, setIsInitialGreeting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const simulateSlowResponse = (text: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(text), 2000 + Math.random() * 2000);
    });
  };

  const typeMessage = (message: string, index: number = 0) => {
    if (index <= message.length) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "bot", text: message.slice(0, index), isTyping: true },
      ]);
      setTimeout(() => typeMessage(message, index + 1), 50);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "bot", text: message, isTyping: false },
      ]);
      setIsGenerating(false);
    }
  };

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (messageToSend.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: messageToSend }];
    setMessages(newMessages as Message[]);
    setInput("");
    setIsGenerating(true);
    setIsChatboxOpen(true);
    setIsInitialGreeting(false);

    try {
      const response = await fetch(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: "user",
            message: messageToSend,
          }),
        }
      );

      const data = await response.json();
      for (const msg of data) {
        const slowResponse = await simulateSlowResponse(msg.text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "", isTyping: true },
        ]);
        typeMessage(slowResponse);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isInitialGreeting) {
        sendMessage("Hi How are you?");
      } else {
        sendMessage();
      }
    }
  };

  return (
    <div className="flex flex-col max-w-96 mx-auto p-4 h-full">
      {isChatboxOpen && (
        <div className="flex-grow overflow-auto mb-4 space-y-2 max-h-[calc(100vh-200px)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-indigo-600/70 text-white ml-auto"
                  : "bg-gray-700/70 text-white"
              } max-w-[80%] backdrop-blur-sm`}
            >
              {message.text}
              {message.isTyping && <span className="animate-pulse">▋</span>}
            </div>
          ))}
        </div>
      )}
      {isGenerating && <AIGeneratingIndicator />}

      <div className="flex items-center bg-gray-800/50 rounded-s-lg rounded-e-lg overflow-hidden mt-4 backdrop-blur-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow bg-transparent text-white px-4 py-2 focus:outline-none w-96"
          placeholder={
            isInitialGreeting
              ? "Send Greetings to CosmoAI. Press Enter"
              : "Type a message..."
          }
        />
        <Button
          onClick={() =>
            isInitialGreeting ? sendMessage("Hi How are you?") : sendMessage()
          }
        >
          SEND
        </Button>
      </div>
    </div>
  );
};

export default RasaChat;
