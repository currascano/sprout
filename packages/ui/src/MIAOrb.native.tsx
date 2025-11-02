import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

export function MIAOrb() {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(scale, { toValue: 1.06, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1.0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();
  }, [scale]);
  return (
    <View style={{ alignItems:'center', justifyContent:'center' }}>
      <Animated.View style={{ transform:[{ scale }], height: 160, width: 160, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.9)' }} />
    </View>
  );
}
