import type { FamilySettingItem } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface FamilySpaceSettingsProps {
  settings: readonly FamilySettingItem[]
}

export function FamilySpaceSettings({ settings }: FamilySpaceSettingsProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>家庭设置</Text>
      {settings.map((setting) => (
        <Text key={setting.id} style={styles.item}>
          {setting.label}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#efe4d2',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
  },
  title: {
    color: '#2f2419',
    fontSize: 18,
    fontWeight: '700',
  },
  item: {
    color: '#5f4521',
  },
})
