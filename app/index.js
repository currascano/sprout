import { registerRootComponent } from 'expo';
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: '#a7f3d0' }}>
          ✅ SPROUT WEB WORKS
        </Text>
      </View>
    </SafeAreaView>
  );
}

registerRootComponent(App);
