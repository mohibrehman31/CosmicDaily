export interface Message {
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

export const sendMessageToRasa = async (message: string) => {
  const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: "user",
      message: message,
    }),
  });
  return response.json();
};

export const simulateSlowResponse = (text: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(text), 2000 + Math.random() * 2000);
  });
};