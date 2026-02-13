"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ChatLayout } from "./components/ChatLayout";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { STORAGE_KEY } from "./lib/constants";
import type { Message } from "./lib/types";
import {
  getRuleBasedReply,
  maybeGetAdvice,
  getDefaultWelcomeMessage,
} from "./lib/utils";

export default function Home(): ReactNode {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse stored messages:", e);
      }
    }

    setMessages([getDefaultWelcomeMessage()]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleClearChat = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
    setMessages([getDefaultWelcomeMessage()]);
    setInput("");
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const now = new Date().toISOString();
    const userMessage: Message = {
      id: `user-${now}`,
      sender: "user",
      text: trimmed,
      createdAt: now,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    const lower = trimmed.toLowerCase();
    let botReply: string | null = null;

    if (lower.startsWith("advice") || lower.startsWith("tip")) {
      botReply =
        (await maybeGetAdvice()) ??
        "I tried to fetch a piece of advice for you, but something went wrong. Let me know what you're curious about and I'll still try to help.";
    } else {
      botReply = getRuleBasedReply(trimmed);
    }

    const delay = 400 + Math.min(trimmed.length * 15, 1600);

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botReply ?? getRuleBasedReply(trimmed),
          createdAt: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <ChatLayout onClearChat={handleClearChat}>
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isTyping}
      />
    </ChatLayout>
  );
}
