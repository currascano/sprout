import React, { useState } from 'react';
import { Platform, SafeAreaView, Text, View } from 'react-native';
import MIAOrb from '@sprout/ui';
import VoiceNameCapture from './components/VoiceNameCapture';
import StartupGreeting from './components/StartupGreeting';
import AlwaysListening from './components/AlwaysListening';
import { speak } from './mia/voice';
import { route } from './mia/intentRouter';

export default function App() {
  const [name, setName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Ready.');

  const onWake = () => {
    setStatus('Listening…');
  };

  const onUtterance = (text: string) => {
    const intent = route(text);
    if (intent.type === 'WATER_CHECK') speak('Checking moisture signals and recent observations.');
    if (intent.type === 'PRUNE_COACH') speak('Opening pruning coach with step by step visuals.');
    if (intent.type === 'DIY_FERTILIZER') speak('Recommending a safe, household fertilizer option.');
    if (intent.type === 'UNKNOWN') speak(`You said: ${text}.`);
    setStatus('Ready.');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      {!name && <VoiceNameCapture onConfirm={(n)=>{ setName(n); speak(`Nice to meet you, ${n}.`); }} />}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal:16 }}>
        <Text style={{ color: '#cbd5e1', fontSize: 24, marginBottom: 12 }}>
          SPROUT — MIA Orb Demo
        </Text>
        <MIAOrb />
        <Text style={{ color: '#94a3b8', marginTop: 8, fontSize: 12 }}>{status}</Text>
        {name && <Text style={{ color: '#a7f3d0', marginTop: 8 }}>Hello, {name}!</Text>}
        <AlwaysListening onWake={onWake} onUtterance={onUtterance} />
        <Text style={{ color:'#94a3b8', marginTop: 12, fontSize: 11, textAlign:'center' }}>
          Privacy: audio is processed on-device when possible. No recordings are uploaded by default.
        </Text>
      </View>
      <StartupGreeting name={name} />
    </SafeAreaView>
  );
}
