export type WakewordOptions = {
  phrases?: string[]; // default: ["hey mia", "ok mia"]
  onWake?: () => void;
  onUtterance?: (text: string) => void;
};

export function createWakewordDetector(opts: WakewordOptions = {}) {
  const phrases = (opts.phrases && opts.phrases.length ? opts.phrases : ["hey mia", "ok mia"]).map(p => p.toLowerCase());

  function handleTranscript(text: string) {
    const t = text.toLowerCase().trim();
    if (!t) return;
    // If transcript contains wake phrase, trigger onWake; otherwise route as utterance if already awake.
    if (phrases.some(p => t.startsWith(p) || t.includes(p))) {
      opts.onWake && opts.onWake();
      // Strip the wake phrase for cleaner intent text:
      const stripped = phrases.reduce((acc, p) => acc.replace(p, "").trim(), t);
      if (stripped) opts.onUtterance && opts.onUtterance(stripped);
    } else {
      opts.onUtterance && opts.onUtterance(t);
    }
  }

  return { handleTranscript };
}
