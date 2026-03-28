import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { FamilyPhotoHero } from './FamilyPhotoHero'
import { FamilyTimeline } from './FamilyTimeline'
import { MiniOverviewStrip } from './MiniOverviewStrip'
import { PrimaryStatusEntry } from './PrimaryStatusEntry'

export function HomeScreen() {
  const navigation = mobileApiClient.getNavigation()
  const home = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackHomePage(),
    load: mobileApiClient.getHomePage,
  })
  const familyVisits = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackFamilyVisitsPage(),
    load: mobileApiClient.getFamilyVisitsPage,
  })
  const seenByLabel = familyVisits.totalVisitLabel
  const timeline = home.timeline ?? mobileApiClient.getFallbackHomePage().timeline
  const overviewItems = home.overviewItems ?? mobileApiClient.getFallbackHomePage().overviewItems
  const primaryAction = home.primaryAction ?? mobileApiClient.getFallbackHomePage().primaryAction
  const hero = home.hero ?? mobileApiClient.getFallbackHomePage().hero
  const renderTab = useCallback(
    (tab: string) => (
      <Text key={tab} style={styles.tabLabel}>
        {tab}
      </Text>
    ),
    [],
  )

  return (
    <ScreenContainer>
      <FamilyPhotoHero hero={hero} />
      <MiniOverviewStrip items={overviewItems} />
      <PrimaryStatusEntry entry={primaryAction} />
      <FamilyTimeline timeline={timeline} seenByLabel={seenByLabel} />
      <View style={styles.tabBar}>
        {navigation.tabs.map(renderTab)}
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: '#d9c8ae',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16,
  },
  tabLabel: {
    color: '#6d5330',
    fontSize: 14,
    fontWeight: '600',
  },
})
