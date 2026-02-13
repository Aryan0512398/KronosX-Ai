export type Sender = "user" | "bot";

export type Message = {
  id: string;
  sender: Sender;
  text: string;
  createdAt: string;
};
