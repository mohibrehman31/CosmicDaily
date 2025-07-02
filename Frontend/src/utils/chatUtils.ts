export interface Message {
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

export const sendMessageToRasa = async (message: string) => {
  const response = await fetch(`${import.meta.env.VITE_CHATBOT_URL}/nasa_api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_input: message,
    }),
  });
  return response;
};
