import { StyleSheet, Text, View } from 'react-native'

interface StatusTagSelectorProps {
  options: readonly string[]
}

export function StatusTagSelector({ options }: StatusTagSelectorProps) {
  return (
    <View style={styles.row}>
      {options.map((option) => (
        <Text key={option} style={styles.tag}>
          {option}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 999,
    borderWidth: 1,
    color: '#6d5330',
    padding: 10,
  },
})
