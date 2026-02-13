import type React from "react";
import type { ReactNode } from "react";

type ChatLayoutProps = {
  children: ReactNode;
  onClearChat?: () => void;
};

export function ChatLayout({ children, onClearChat }: ChatLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-8 text-slate-100">
      <main className="flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.8)] backdrop-blur-xl sm:p-8">
        <header className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.45)]" />
                  Frontend Intern Assignment
                </p>
                <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                  Simple Chatbot UI
                </h1>
                <p className="mt-1 text-sm text-slate-400 sm:text-base">
                  Send a message below to see how the bot responds. This demo uses
                  rule-based replies with a touch of UI polish.
                </p>
              </div>
              {onClearChat && (
                <button
                  type="button"
                  onClick={onClearChat}
                  className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600/60 hover:bg-slate-800 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  aria-label="Clear chat history"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  <span className="hidden sm:inline">Clear Chat</span>
                </button>
              )}
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2 text-xs font-medium text-slate-300 ring-1 ring-white/5 sm:flex">
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold">
              AI
              <span className="absolute inset-0 rounded-full border border-emerald-400/50 opacity-60" />
            </span>
            <span className="text-left leading-tight">
              Mocked replies only
              <span className="block text-[10px] font-normal text-slate-500">
                No real AI calls
              </span>
            </span>
          </div>
        </header>
        {children}
        <footer className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press Enter to send • Shift + Enter for a new line</span>
          <span className="hidden sm:inline">
            Built with Love By Aryan
          </span>
        </footer>
      </main>
    </div>
  );
}
