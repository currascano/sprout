import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { Platform } from 'react-native';
import { speak } from '../mia/voice';
import { createWebSTT } from '../mia/stt.web';
import { createNativeSTT } from '../mia/stt.native';
import { createWakewordDetector } from '../mia/wakeword';

type Props = {
  onWake: () => void;
  onUtterance: (text: string) => void;
};

export default function AlwaysListening({ onWake, onUtterance }: Props) {
  const [enabled, setEnabled] = useState(false);
  const sttRef = useRef<{ start:(cb:(t:string)=>void, opts?:{continuous?:boolean})=>void; stop:()=>void }|null>(null);
  const detector = useRef(createWakewordDetector({ onWake, onUtterance })).current;

  useEffect(() => {
    if (enabled) {
      const impl = Platform.OS === 'web' ? createWebSTT() : createNativeSTT();
      sttRef.current = impl;
      impl.start((text) => detector.handleTranscript(text), { continuous: true });
      speak('Always listening enabled. Say "Hey MIA" to get my attention.');
    } else {
      try { sttRef.current?.stop(); } catch {}
      sttRef.current = null;
    }
    return () => { try { sttRef.current?.stop(); } catch {} };
  }, [enabled]);

  return (
    <View style={{ marginTop: 16, padding: 12, borderRadius: 16, borderColor:'rgba(255,255,255,0.1)', borderWidth:1 }}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
        <Text style={{ color:'#e2e8f0', fontWeight:'600' }}>Always listen (“Hey MIA”)</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
      <Text style={{ color:'#94a3b8', marginTop: 8, fontSize: 12 }}>
        Microphone runs in the foreground while this screen is open. You can turn this off anytime.
      </Text>
    </View>
  );
}
