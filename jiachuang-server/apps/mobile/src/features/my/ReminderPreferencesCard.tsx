import type { ReminderPreference } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface ReminderPreferencesCardProps {
  preferences: readonly ReminderPreference[]
}

export function ReminderPreferencesCard({ preferences }: ReminderPreferencesCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>提醒偏好</Text>
      {preferences.map((preference) => (
        <Text key={preference.id} style={styles.item}>
          {preference.label} · {preference.enabled ? '已开启' : '已关闭'}
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
    gap: 8,
    padding: 16,
  },
  title: {
    color: '#2f2419',
    fontSize: 18,
    fontWeight: '700',
  },
  item: {
    color: '#6d5330',
  },
})
