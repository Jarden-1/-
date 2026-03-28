import { StyleSheet, Text, View } from 'react-native'
import type { ReactionSummaryItem } from '@jiachuang/shared'

interface ReactionBarProps {
  reactions: readonly ReactionSummaryItem[]
}

export function ReactionBar({ reactions }: ReactionBarProps) {
  return (
    <View style={styles.container}>
      {reactions.map((reaction) => (
        <Text key={reaction.label} style={styles.reaction}>
          {reaction.label}
        </Text>
      ))}
      <Text style={styles.commentAction}>留言</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reaction: {
    backgroundColor: '#e8dbc4',
    borderRadius: 999,
    color: '#5f4521',
    padding: 8,
  },
  commentAction: {
    color: '#8d6a3d',
    padding: 8,
  },
})
