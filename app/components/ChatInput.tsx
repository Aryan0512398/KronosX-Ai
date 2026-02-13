"use client";

import type React from "react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!disabled) {
        onSend();
      }
    }
  };

  return (
    <section
      aria-label="Chat input"
      className="mt-2 rounded-2xl bg-slate-900/80 p-3 ring-1 ring-white/10"
    >
      <div className="flex items-end gap-3">
        <div className="relative flex-1">
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask a question, say hello, or describe what you're working on…"
            className="max-h-32 w-full resize-none rounded-xl border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-[0_12px_30px_rgba(15,23,42,0.9)] outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            disabled={disabled}
          />
          <span className="pointer-events-none absolute bottom-2 right-3 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 sm:inline">
            Enter to send
          </span>
        </div>
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-950 shadow-[0_18px_40px_rgba(16,185,129,0.75)] transition hover:bg-emerald-400 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
        >
          <span>Send</span>
          <span aria-hidden className="text-base leading-none">
            ⏎
          </span>
        </button>
      </div>
    </section>
  );
}
