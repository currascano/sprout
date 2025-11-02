import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import { speak } from '../mia/voice';

export default function StartupGreeting({ name }: { name?: string | null }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 1200, easing: Easing.out(Easing.exp), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]).start();
      }, 1200);
    });
    const line = name
      ? `Hello ${name}. I am M I A — My Intelligent Assistant. Let's grow something extraordinary.`
      : `Hello. I am M I A — My Intelligent Assistant.`;
    speak(line);
  }, [name]);

  return (
    <View style={{ position:'absolute', inset:0, alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
      <Animated.View style={{
        position:'absolute',
        width: 260, height: 260, borderRadius: 260,
        backgroundColor: 'rgba(255,255,255,0.08)',
        transform: [{ scale }], opacity
      }} />
      <Animated.View style={{
        position:'absolute',
        width: 160, height: 160, borderRadius: 160,
        backgroundColor: 'rgba(255,255,255,0.18)',
        transform: [{ scale }], opacity
      }} />
      <Animated.View style={{
        position:'absolute',
        width: 80, height: 80, borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.28)',
        transform: [{ scale }], opacity
      }} />
      <Animated.Text style={{ color:'#a7f3d0', fontSize:18, opacity, marginTop: 220 }}>MIA online</Animated.Text>
    </View>
  );
}
