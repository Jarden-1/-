import { StyleSheet, Text, View } from 'react-native'
import type { HomeHeroData } from '@jiachuang/shared'

interface FamilyPhotoHeroProps {
  hero: HomeHeroData
}

export function FamilyPhotoHero({ hero }: FamilyPhotoHeroProps) {
  return (
    <View style={styles.hero} testID="family-photo-hero">
      <Text style={styles.eyebrow}>家窗</Text>
      <Text style={styles.title}>{hero.greeting}</Text>
      <Text style={styles.subtitle}>{hero.subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#7a5c3a',
    borderRadius: 28,
    color: '#fffaf1',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 24,
  },
  eyebrow: {
    color: '#eadfcf',
    fontSize: 12,
  },
  title: {
    color: '#fffaf1',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#f5ead8',
    fontSize: 15,
    lineHeight: 1.5,
  },
})
