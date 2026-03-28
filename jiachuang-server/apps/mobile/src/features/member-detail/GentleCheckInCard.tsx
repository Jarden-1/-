import type { GentleCheckInData } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface GentleCheckInCardProps {
  checkIn?: GentleCheckInData
}

export function GentleCheckInCard({ checkIn }: GentleCheckInCardProps) {
  if (!checkIn) {
    return null
  }

  return (
    <View style={styles.card}>
      <Text style={styles.message}>{checkIn.message}</Text>
      <Text style={styles.button}>{checkIn.actionLabel}</Text>
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
  },
  button: {
    color: '#8d6a3d',
    fontWeight: '700',
  },
})
