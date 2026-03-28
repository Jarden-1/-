import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { SectionTitle } from '../../lib/ui/SectionTitle'

export function FamilyVisitsScreen() {
  const loadFamilyVisitsPage = useCallback(() => mobileApiClient.getFamilyVisitsPage(), [])
  const familyVisits = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackFamilyVisitsPage(),
    load: loadFamilyVisitsPage,
  })
  const fallback = mobileApiClient.getFallbackFamilyVisitsPage()
  const latestVisit = familyVisits.latestVisit ?? fallback.latestVisit
  const topVisitor = familyVisits.topVisitorInPastWeek ?? fallback.topVisitorInPastWeek
  const records = familyVisits.records ?? fallback.records

  return (
    <ScreenContainer>
      <SectionTitle eyebrow="家人来访" title="被看见的记录" />
      <View style={styles.summaryCard}>
        <Text style={styles.primary}>{familyVisits.totalVisitLabel ?? fallback.totalVisitLabel}</Text>
        <Text style={styles.secondary}>
          最近一次：{latestVisit.visitorName} {latestVisit.visitedAtLabel}
        </Text>
        <Text style={styles.secondary}>{topVisitor.summary}</Text>
      </View>
      <View style={styles.list}>
        {records.map((record) => (
          <View key={record.id} style={styles.record}>
            <Text style={styles.recordName}>{record.visitorName}</Text>
            <Text style={styles.recordTime}>{record.visitedAtLabel}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 22,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 18,
  },
  primary: {
    color: '#2f2419',
    fontSize: 18,
    fontWeight: '700',
  },
  secondary: {
    color: '#6d5330',
    fontSize: 15,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  record: {
    backgroundColor: '#efe4d2',
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  recordName: {
    color: '#5f4521',
    fontWeight: '600',
  },
  recordTime: {
    color: '#8d6a3d',
  },
})
