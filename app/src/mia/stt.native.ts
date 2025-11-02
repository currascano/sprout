import Voice from '@react-native-voice/voice';
export type STTHandle = {
  start: (onResult:(t:string)=>void, { continuous }?: { continuous?: boolean }) => void;
  stop: ()=>void;
};

export function createNativeSTT(): STTHandle {
  let onResultCb: ((t:string)=>void) | null = null;
  let continuousMode = false;

  Voice.onSpeechResults = (e:any) => {
    const value = e.value?.[0];
    if (value && onResultCb) onResultCb(value);
  };
  Voice.onSpeechEnd = async () => {
    if (continuousMode) {
      try { await Voice.start('en-US'); } catch (e) {}
    }
  };
  Voice.onSpeechError = (e:any) => console.warn('STT error', e);

  const start = async (cb:(t:string)=>void, { continuous }:{ continuous?: boolean } = {}) => {
    onResultCb = cb;
    continuousMode = !!continuous;
    try { await Voice.start('en-US'); } catch (e) { console.warn(e); }
  };
  const stop = async () => { try { await Voice.stop(); } catch {} };

  return { start, stop };
}
