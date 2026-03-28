import type { FamilyPresenceItem } from '@jiachuang/shared'
import { StyleSheet, Text, View } from 'react-native'

interface FamilyPresenceListProps {
  members: readonly FamilyPresenceItem[]
}

export function FamilyPresenceList({ members }: FamilyPresenceListProps) {
  return (
    <View style={styles.list}>
      {members.map((member) => (
        <View key={member.memberId} style={styles.row}>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.activity}>{member.latestActivity}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  row: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 18,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  name: {
    color: '#2f2419',
    fontWeight: '600',
  },
  activity: {
    color: '#6d5330',
  },
})
