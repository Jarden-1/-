import { StyleSheet, Text, View } from 'react-native'
import type { PrimaryStatusEntryData } from '@jiachuang/shared'

interface PrimaryStatusEntryProps {
  entry: PrimaryStatusEntryData
}

export function PrimaryStatusEntry({ entry }: PrimaryStatusEntryProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.button}>{entry.label}</Text>
      <View style={styles.quickList}>
        {entry.quickExpressions.map((item) => (
          <Text key={item} style={styles.quickItem}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 24,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 16,
  },
  button: {
    backgroundColor: '#8d6a3d',
    borderRadius: 18,
    color: '#fffaf1',
    fontSize: 18,
    fontWeight: '700',
    padding: 14,
    textAlign: 'center',
  },
  quickList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickItem: {
    color: '#6d5330',
    fontSize: 14,
  },
})
