import type { Message } from "../lib/types";
import { formatTime } from "../lib/utils";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "flex-row-reverse pl-10" : "pr-10"
      } group`}
    >
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm ${
          isUser
            ? "bg-emerald-500 text-emerald-950 shadow-emerald-500/40"
            : "bg-slate-800 text-slate-200 shadow-slate-900/80"
        }`}
        aria-hidden
      >
        {isUser ? "U" : "B"}
      </div>
      <div className="flex max-w-[75%] flex-col gap-1">
        <div
          className={`rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm transition-transform group-hover:-translate-y-px ${
            isUser
              ? "rounded-br-sm bg-emerald-500 text-emerald-950 shadow-emerald-500/40"
              : "rounded-bl-sm bg-slate-800 text-slate-50 shadow-slate-900/80"
          }`}
        >
          {message.text.split("\n").map((line, index) => (
            <p key={index} className={index > 0 ? "mt-1" : undefined}>
              {line}
            </p>
          ))}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          {isUser ? "You" : "Bot"} • {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
