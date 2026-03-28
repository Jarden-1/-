import type { AnniversaryReminder } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface AnniversaryRemindersCardProps {
  anniversaries: readonly AnniversaryReminder[]
}

export function AnniversaryRemindersCard({ anniversaries }: AnniversaryRemindersCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>重要日子</Text>
      {anniversaries.map((anniversary) => (
        <Text key={anniversary.id} style={styles.item}>
          {anniversary.label} · {anniversary.dateLabel}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#efe4d2',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
  },
  title: {
    color: '#2f2419',
    fontSize: 18,
    fontWeight: '700',
  },
  item: {
    color: '#5f4521',
  },
})
