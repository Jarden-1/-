import { StyleSheet, Text, View } from 'react-native'
import type { MiniOverviewItem } from '@jiachuang/shared'

interface MiniOverviewStripProps {
  items: readonly MiniOverviewItem[]
}

export function MiniOverviewStrip({ items }: MiniOverviewStripProps) {
  return (
    <View style={styles.container} testID="mini-overview-strip">
      {items.map((item) => (
        <Text key={item.id} style={styles.pill}>
          {item.label}
        </Text>
      ))}
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
  pill: {
    backgroundColor: '#efe4d2',
    borderRadius: 999,
    color: '#5f4521',
    padding: 10,
  },
})
