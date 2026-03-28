import { StyleSheet, Text, View } from 'react-native'
import type { Status } from '@jiachuang/shared'

import { ReactionBar } from './ReactionBar'

interface StatusTimelineCardProps {
  status: Status
}

export function StatusTimelineCard({ status }: StatusTimelineCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>
        {status.authorName} · {status.publishedAtLabel}
      </Text>
      <Text style={styles.body}>{status.text}</Text>
      {status.boundaryHint ? <Text style={styles.hint}>{status.boundaryHint}</Text> : null}
      <ReactionBar reactions={status.reactionSummary} />
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
    gap: 12,
    padding: 16,
  },
  header: {
    color: '#6d5330',
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    color: '#2f2419',
    fontSize: 16,
    lineHeight: 1.5,
  },
  hint: {
    color: '#8d6a3d',
    fontSize: 13,
  },
})
