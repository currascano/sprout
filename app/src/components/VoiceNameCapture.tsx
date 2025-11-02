import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { speak, startListening, stopListening } from '../mia/voice';

type Props = { onConfirm: (name: string)=>void };

export default function VoiceNameCapture({ onConfirm }: Props) {
  const [phase, setPhase] = useState<'prompt'|'listening'|'confirm'>('prompt');
  const [name, setName] = useState<string>('');
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    speak('Before we start, how may I call you? Hold the button and say your name.');
  }, []);

  useEffect(() => {
    if (phase === 'listening') {
      Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1.00, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
      ])).start();
    }
  }, [phase]);

  const onHoldStart = () => {
    setPhase('listening');
    startListening((text)=>{
      setName(text.trim());
      setPhase('confirm');
      speak(`Did I get that right? ${text}.`);
    });
  };
  const onHoldEnd = () => {
    stopListening();
  };

  return (
    <View style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.6)', alignItems:'center', justifyContent:'center', padding:24 }}>
      <View style={{ width:'100%', maxWidth:420, backgroundColor:'#0f172a', borderRadius:24, padding:20, borderColor:'rgba(255,255,255,0.1)', borderWidth:1 }}>
        <Text style={{ color:'#e2e8f0', fontSize:20, fontWeight:'600', marginBottom:8 }}>MIA</Text>
        <Text style={{ color:'#cbd5e1', fontSize:16, marginBottom:16 }}>
          Before we start, how may I call you?
        </Text>

        {phase !== 'confirm' && (
          <Pressable onPressIn={onHoldStart} onPressOut={onHoldEnd} style={{ alignSelf:'center' }}>
            <Animated.View style={{ transform:[{ scale: pulse }], backgroundColor:'#fff', paddingVertical:14, paddingHorizontal:24, borderRadius:9999 }}>
              <Text style={{ color:'#0b1220', fontWeight:'700' }}>Hold to say your name 🎤</Text>
            </Animated.View>
          </Pressable>
        )}

        {phase === 'confirm' && (
          <View style={{ gap:12 }}>
            <Text style={{ color:'#94a3b8' }}>I heard: <Text style={{ color:'#e2e8f0', fontWeight:'700' }}>{name}</Text></Text>
            <View style={{ flexDirection:'row', gap:12 }}>
              <Pressable onPress={()=>onConfirm(name)} style={{ backgroundColor:'#22c55e', paddingVertical:10, paddingHorizontal:16, borderRadius:12 }}>
                <Text style={{ color:'#052e16', fontWeight:'700' }}>Sounds good</Text>
              </Pressable>
              <Pressable onPress={()=>{ setPhase('prompt'); speak('Please hold the button and say your name again.'); }} style={{ borderColor:'rgba(255,255,255,0.2)', borderWidth:1, paddingVertical:10, paddingHorizontal:16, borderRadius:12 }}>
                <Text style={{ color:'#e2e8f0', fontWeight:'700' }}>Try again</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
