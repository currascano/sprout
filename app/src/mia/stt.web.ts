export type STTHandle = {
  start: (onResult:(t:string)=>void, { continuous }?: { continuous?: boolean }) => void;
  stop: ()=>void;
};

export function createWebSTT(): STTHandle {
  // @ts-ignore
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec: SpeechRecognition | null = null;
  let onResultCb: ((t:string)=>void) | null = null;

  const start = (cb:(t:string)=>void, { continuous }:{ continuous?: boolean } = {}) => {
    if (!SR) { console.warn('Web Speech API not available'); return; }
    onResultCb = cb;
    rec = new SR();
    rec.lang = navigator.language || 'en-US';
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    // @ts-ignore
    rec.continuous = !!continuous;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const idx = e.resultIndex;
      const res = e.results?.[idx];
      if (!res) return;
      const transcript = res[0]?.transcript;
      if (transcript && onResultCb && res.isFinal) onResultCb(transcript);
    };
    rec.onerror = (e:any) => console.warn('STT error', e);
    rec.onend = () => {
      if (continuous) {
        try { rec && rec.start(); } catch {}
      }
    };
    rec.start();
  };

  const stop = () => { try { rec && rec.stop(); } catch {} };

  return { start, stop };
}
