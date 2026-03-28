import { StyleSheet, Text, View } from 'react-native'

interface SeenByFamilyCardProps {
  label: string
}

export function SeenByFamilyCard({ label }: SeenByFamilyCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#efe4d2',
    borderRadius: 18,
    padding: 14,
  },
  label: {
    color: '#5f4521',
    fontSize: 14,
  },
})
