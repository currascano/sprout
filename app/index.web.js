import { registerRootComponent } from 'expo';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

function App(){
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      {/* just a green pill box — NO <Text> */}
      <View style={{
        width: 280, height: 56, borderRadius: 28,
        backgroundColor: '#10b981'
      }}/>
    </SafeAreaView>
  );
}
registerRootComponent(App);
