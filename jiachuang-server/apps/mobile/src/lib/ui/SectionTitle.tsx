import { StyleSheet, Text, View } from 'react-native'

interface SectionTitleProps {
  eyebrow?: string
  title: string
}

export function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  eyebrow: {
    color: '#8d6a3d',
    fontSize: 12,
  },
  title: {
    color: '#2f2419',
    fontSize: 18,
    fontWeight: '700',
  },
})
