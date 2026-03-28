import { StyleSheet, View } from 'react-native'
import type { Status } from '@jiachuang/shared'

import { SectionTitle } from '../../lib/ui/SectionTitle'
import { SeenByFamilyCard } from './SeenByFamilyCard'
import { StatusTimelineCard } from './StatusTimelineCard'

interface FamilyTimelineProps {
  timeline: readonly Status[]
  seenByLabel: string
}

export function FamilyTimeline({ timeline, seenByLabel }: FamilyTimelineProps) {
  return (
    <View style={styles.container} testID="family-timeline">
      <SectionTitle eyebrow="家庭时间线" title="家里最近的近况" />
      <SeenByFamilyCard label={seenByLabel} />
      {timeline.map((status) => (
        <StatusTimelineCard key={status.id} status={status} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})
