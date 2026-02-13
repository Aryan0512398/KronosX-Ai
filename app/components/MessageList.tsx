"use client";

import { useEffect, useRef } from "react";
import type { Message } from "../lib/types";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

type MessageListProps = {
  messages: Message[];
  isTyping: boolean;
};

export function MessageList({
  messages,
  isTyping,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages.length, isTyping]);

  return (
    <section
      ref={scrollRef}
      className="flex min-h-90 flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-950/80 p-4 ring-1 ring-white/10"
      aria-label="Conversation history"
    >
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-slate-400">
          <p className="font-medium text-slate-300">No messages yet.</p>
          <p className="max-w-xs text-xs text-slate-500">
            Say hello, ask a question, or describe what you are working on to
            see how the bot responds.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      {isTyping && <TypingIndicator />}
    </section>
  );
}
