import type { CareSignalItem } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface CareSignalsPanelProps {
  signals: readonly CareSignalItem[]
}

export function CareSignalsPanel({ signals }: CareSignalsPanelProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>最近的关心痕迹</Text>
      {signals.map((signal) => (
        <Text key={signal.id} style={styles.item}>
          {signal.text}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 20,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 16,
  },
  title: {
    color: '#2f2419',
    fontSize: 18,
    fontWeight: '700',
  },
  item: {
    color: '#6d5330',
    lineHeight: 1.5,
  },
})
