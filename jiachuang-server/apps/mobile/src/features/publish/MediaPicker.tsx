import { StyleSheet, Text, View } from 'react-native'

interface MediaPickerProps {
  label: string
}

export function MediaPicker({ label }: MediaPickerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#efe4d2',
    borderRadius: 20,
    padding: 16,
  },
  label: {
    color: '#5f4521',
    fontSize: 15,
  },
})
