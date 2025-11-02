import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

export function speak(text: string) {
  try { Speech.speak(text, { rate: 1.0, pitch: 1.0 }); } catch {}
}

// Platform-specific STT
let handle: { start:(cb:(t:string)=>void)=>void; stop:()=>void } | null = null;

export async function startListening(onResult:(text:string)=>void) {
  if (Platform.OS === 'web') {
    const mod = await import('./stt.web');
    handle = mod.createWebSTT();
  } else {
    try {
      const mod = await import('./stt.native');
      handle = mod.createNativeSTT();
    } catch (e) {
      console.warn('Native STT not installed; see README for react-native-voice setup.', e);
      onResult('Friend'); // graceful fallback
      return;
    }
  }
  handle.start(onResult);
}

export async function stopListening() {
  try { handle?.stop(); } catch {}
}
