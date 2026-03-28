import { StyleSheet, Text, View } from 'react-native'

interface PublishActionBarProps {
  submitLabel: string
}

export function PublishActionBar({ submitLabel }: PublishActionBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.button}>{submitLabel}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  button: {
    backgroundColor: '#8d6a3d',
    borderRadius: 18,
    color: '#fffaf1',
    fontSize: 18,
    fontWeight: '700',
    padding: 14,
    textAlign: 'center',
  },
})
