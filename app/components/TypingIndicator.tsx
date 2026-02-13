'use client';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 pr-10 text-xs text-slate-400">
      <div className="flex h-6 w-10 items-center justify-center rounded-full bg-slate-800/70 px-2">
        <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400" />
        <span className="ml-1 h-1 w-1 animate-[pulse_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-slate-500" />
        <span className="ml-1 h-1 w-1 animate-[pulse_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-slate-600" />
      </div>
      <span className="text-[11px]">Bot is typing…</span>
    </div>
  );
}
