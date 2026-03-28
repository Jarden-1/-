import { StyleSheet, Text, View } from 'react-native'

interface BoundaryHintSelectorProps {
  options: readonly string[]
}

export function BoundaryHintSelector({ options }: BoundaryHintSelectorProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>边界提示</Text>
      <View style={styles.row}>
        {options.map((option) => (
          <Text key={option} style={styles.option}>
            {option}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    color: '#6d5330',
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    backgroundColor: '#efe4d2',
    borderRadius: 999,
    color: '#5f4521',
    padding: 10,
  },
})
