import type { GentleNudgeData } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface GentleNudgeCardProps {
  nudge: GentleNudgeData
}

export function GentleNudgeCard({ nudge }: GentleNudgeCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{nudge.message}</Text>
      <Text style={styles.button}>{nudge.actionLabel}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#efe4d2',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 16,
  },
  message: {
    color: '#5f4521',
    lineHeight: 1.5,
  },
  button: {
    color: '#8d6a3d',
    fontWeight: '700',
  },
})
