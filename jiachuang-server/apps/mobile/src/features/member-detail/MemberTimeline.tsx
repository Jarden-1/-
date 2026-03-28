import type { Status } from '@jiachuang/shared'
import { StyleSheet, View } from 'react-native'

import { StatusTimelineCard } from '../home/StatusTimelineCard'

interface MemberTimelineProps {
  timeline: readonly Status[]
}

export function MemberTimeline({ timeline }: MemberTimelineProps) {
  return (
    <View style={styles.list}>
      {timeline.map((status) => (
        <StatusTimelineCard key={status.id} status={status} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})
