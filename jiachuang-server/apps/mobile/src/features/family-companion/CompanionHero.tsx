import type { FamilyCompanionHeroData } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface CompanionHeroProps {
  hero: FamilyCompanionHeroData
}

export function CompanionHero({ hero }: CompanionHeroProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kind}>植物家园</Text>
      <Text style={styles.title}>{hero.title}</Text>
      <Text style={styles.mood}>{hero.moodText}</Text>
      <Text style={styles.description}>{hero.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#dce7c8',
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 20,
  },
  kind: {
    color: '#4f6a2f',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: '#2b3a1b',
    fontSize: 24,
    fontWeight: '700',
  },
  mood: {
    color: '#3b5124',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#4b5d33',
    lineHeight: 1.5,
  },
})
