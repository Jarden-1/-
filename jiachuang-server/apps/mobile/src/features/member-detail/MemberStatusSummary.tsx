import type { MemberStatusSummaryData } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface MemberStatusSummaryProps {
  summary: MemberStatusSummaryData
}

export function MemberStatusSummary({ summary }: MemberStatusSummaryProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>近况摘要</Text>
      <Text style={styles.body}>{summary.latestStatusText}</Text>
      <Text style={styles.meta}>{summary.latestUpdatedAtLabel}</Text>
      <Text style={styles.meta}>{summary.rhythmLabel}</Text>
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
  body: {
    color: '#5f4521',
    lineHeight: 1.5,
  },
  meta: {
    color: '#8d6a3d',
  },
})
