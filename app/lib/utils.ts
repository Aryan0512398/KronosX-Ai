import type { Message } from "./types";

export function formatTime(value: string): string {
  const date = new Date(value);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getRuleBasedReply(userText: string): string {
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return "I didn't quite catch that. Could you try typing your message again?";
  }

  if (/(hi|hello|hey|good\s*(morning|afternoon|evening))\b/.test(lower)) {
    const greetings = [
      "Hello! How can I help you today?",
      "Hey there! What can I do for you?",
      "Hi! Great to see you here. What are you working on?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (lower.endsWith("?")) {
    const questions = [
      "That's an interesting question. How would you approach it?",
      "Good question! I'd start by breaking it into smaller steps.",
      "Nice question. What have you tried so far?",
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  if (/(thank\s*you|thanks|ty)\b/.test(lower)) {
    return "You're welcome! Happy to help.";
  }

  if (/\b(help|stuck|confused|issue|problem)\b/.test(lower)) {
    return "Sounds like you're running into a problem. Try explaining what you expected to happen versus what actually happened.";
  }

  return "I'm still learning. Can you rephrase that or give a bit more detail?";
}

export async function maybeGetAdvice(): Promise<string | null> {
  try {
    const res = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data && typeof data.slip?.advice === "string") {
      return `Here's a little piece of advice for you:\n\n"${data.slip.advice}"`;
    }

    return null;
  } catch {
    return null;
  }
}

export function getDefaultWelcomeMessage(): Message {
  return {
    id: "welcome",
    sender: "bot",
    text: "Hi, I'm your simple frontend chatbot.\n\nAsk me a question, say hello, or tell me what you're working on and I'll respond with a friendly, rule-based reply.",
    createdAt: new Date().toISOString(),
  };
}
