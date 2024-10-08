import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import AIGeneratingIndicator from "./AIGenereating";
import {
  Message,
  sendMessageToRasa,
  simulateSlowResponse,
} from "../utils/chatUtils";

const RasaChat: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isInitialGreeting, setIsInitialGreeting] = useState(true);
  const [hasOldMessages, setHasOldMessages] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkForOldMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
      saveChatHistory();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const saveChatHistory = () => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  };

  const loadChatHistory = () => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages) as Message[];
      setMessages(parsedMessages);
      setIsChatboxOpen(true);
      setIsInitialGreeting(false);
      setHasOldMessages(false);
    }
  };

  const checkForOldMessages = () => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setHasOldMessages(true);
    }
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

    updateChatState(messageToSend);
    setHasOldMessages(false);

    try {
      const data = await sendMessageToRasa(messageToSend);
      await handleBotResponses(data);
    } catch (error) {
      console.error("Error:", error);
      setIsGenerating(false);
    }
  };

  const updateChatState = (message: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");
    setIsGenerating(true);
    setIsChatboxOpen(true);
    setIsInitialGreeting(false);
  };

  const handleBotResponses = async (responses: any[]) => {
    for (const msg of responses) {
      const slowResponse = await simulateSlowResponse(msg.text);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "", isTyping: true },
      ]);
      typeMessage(slowResponse);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[40rem] mx-auto p-2 sm:p-4 h-full">
      {hasOldMessages && messages.length === 0 && (
        <Button onClick={loadChatHistory} className="mb-4 w-full sm:w-auto">
          Retrieve Old Messages
        </Button>
      )}
      {(isChatboxOpen || messages.length > 0) && (
        <ChatMessages
          messages={messages}
          messagesContainerRef={messagesContainerRef}
        />
      )}
      {isGenerating && <AIGeneratingIndicator />}
      <ChatInput
        input={input}
        setInput={setInput}
        isInitialGreeting={isInitialGreeting}
        sendMessage={sendMessage}
      />
    </div>
  );
};

const ChatMessages: React.FC<{
  messages: Message[];
  messagesContainerRef: React.RefObject<HTMLDivElement>;
}> = ({ messages, messagesContainerRef }) => (
  <div
    ref={messagesContainerRef}
    className="flex-grow overflow-auto mb-4 space-y-2 max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-300px)] lg:max-h-[calc(100vh-400px)]"
  >
    {messages.map(
      (message, index) =>
        message.text && <ChatBubble key={index} message={message} />
    )}
  </div>
);

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => (
  <div
    className={`flex ${
      message.sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`p-2 rounded-lg ${
        message.sender === "user"
          ? "bg-indigo-600/70 text-white"
          : "bg-gray-700/70 text-white"
      } max-w-[85%] sm:max-w-[75%] backdrop-blur-sm inline-block text-sm sm:text-base`}
    >
      {message.text}
      {message.isTyping && <span className="animate-pulse">▋</span>}
    </div>
  </div>
);

const ChatInput: React.FC<{
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isInitialGreeting: boolean;
  sendMessage: (customMessage?: string) => Promise<void>;
}> = ({ input, setInput, isInitialGreeting, sendMessage }) => (
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
    <div className="flex-grow bg-gray-800/50 w-full sm:w-[20rem] rounded-lg overflow-hidden backdrop-blur-sm">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-transparent text-white px-4 py-2 focus:outline-none text-sm sm:text-base"
        placeholder={
          isInitialGreeting
            ? "Send Greetings By Pressing Enter"
            : "Ask me anything..."
        }
      />
    </div>
    <Button
      onClick={() =>
        sendMessage(isInitialGreeting ? "Hi How are you?" : undefined)
      }
      white
      className="w-full sm:w-auto"
    >
      SEND
    </Button>
  </div>
);

export default RasaChat;
