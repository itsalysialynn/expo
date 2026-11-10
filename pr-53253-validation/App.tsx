import { useState } from 'react';
import { Button, DynamicColorIOS, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { tintActivity } from './Layout';

const cases = [
  { label: 'No tint (system default)', tint: null },
  { label: 'Opaque gold #E69F00', tint: '#E69F00' },
  { label: 'Opaque blue #56B4E9', tint: '#56B4E9' },
  { label: 'Named color: orange', tint: 'orange' },
  { label: '40% teal RGBA', tint: 'rgba(0, 158, 115, 0.4)' },
  { label: 'Clear', tint: 'clear' },
  {
    label: 'Dynamic light / dark / high contrast',
    tint: DynamicColorIOS({
      light: '#56B4E9',
      dark: '#E69F00',
      highContrastLight: '#FFFFFF',
      highContrastDark: '#000000',
    }),
  },
];

export default function App() {
  const [status, setStatus] = useState('Choose a case, then open Notification Center.');
  const start = async (item: (typeof cases)[number]) => {
    try {
      await Promise.all(tintActivity.getInstances().map((activity) => activity.end('immediate')));
      tintActivity.start(item);
      setStatus(`Started: ${item.label}`);
    } catch (error) {
      setStatus(String(error));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 18 }}>
        <Text style={{ fontSize: 26, fontWeight: '600', color: '#111111' }}>Live Activity tint validation</Text>
        <Text selectable style={{ fontSize: 16, color: '#111111' }}>{status}</Text>
        {cases.map((item) => (
          <View key={item.label} style={{ minHeight: 44 }}>
            <Button title={item.label} onPress={() => void start(item)} />
          </View>
        ))}
        <Button title="End activity" onPress={() => void Promise.all(tintActivity.getInstances().map((activity) => activity.end('immediate')))} />
      </ScrollView>
    </SafeAreaView>
  );
}
