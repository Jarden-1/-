import { StyleSheet, Text, View } from 'react-native'

import { mobileApiClient } from '../../lib/api/client'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { FamilyPhotoHero } from './FamilyPhotoHero'
import { FamilyTimeline } from './FamilyTimeline'
import { MiniOverviewStrip } from './MiniOverviewStrip'
import { PrimaryStatusEntry } from './PrimaryStatusEntry'

export function HomeScreen() {
  const home = mobileApiClient.getHomePage()
  const familyVisits = mobileApiClient.getFamilyVisitsPage()
  const navigation = mobileApiClient.getNavigation()

  return (
    <ScreenContainer>
      <FamilyPhotoHero hero={home.hero} />
      <MiniOverviewStrip items={home.overviewItems} />
      <PrimaryStatusEntry entry={home.primaryAction} />
      <FamilyTimeline timeline={home.timeline} seenByLabel={familyVisits.totalVisitLabel} />
      <View style={styles.tabBar}>
        {navigation.tabs.map((tab) => (
          <Text key={tab} style={styles.tabLabel}>
            {tab}
          </Text>
        ))}
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
