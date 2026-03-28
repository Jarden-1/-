import type { PrivacyOption } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface PrivacyAndVisibilityCardProps {
  options: readonly PrivacyOption[]
}

export function PrivacyAndVisibilityCard({ options }: PrivacyAndVisibilityCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>隐私与可见范围</Text>
      {options.map((option) => (
        <View key={option.id} style={styles.item}>
          <Text style={styles.label}>{option.label}</Text>
          <Text style={styles.description}>{option.description}</Text>
        </View>
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
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    color: '#5f4521',
    fontWeight: '600',
  },
  description: {
    color: '#6d5330',
    lineHeight: 1.5,
  },
})
