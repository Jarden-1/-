import type { MyProfileData } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface MyProfileHeaderProps {
  profile: MyProfileData
}

export function MyProfileHeader({ profile }: MyProfileHeaderProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.subtitle}>{profile.subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 22,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 18,
  },
  name: {
    color: '#2f2419',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#6d5330',
  },
})
