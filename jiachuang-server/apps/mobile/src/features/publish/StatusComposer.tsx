import { StyleSheet, TextInput, View } from 'react-native'

interface StatusComposerProps {
  value?: string
  placeholder: string
}

export function StatusComposer({ value = '', placeholder }: StatusComposerProps) {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} readOnly style={styles.input} value={value} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  input: {
    backgroundColor: '#fffaf1',
    border: 'none',
    color: '#2f2419',
    fontSize: 16,
    width: '100%',
  },
})
