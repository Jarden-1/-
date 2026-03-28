import { useCallback } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { SectionTitle } from '../../lib/ui/SectionTitle'

export function FeedbackScreen() {
  const loadFeedbackPage = useCallback(() => mobileApiClient.getFeedbackPage(), [])
  const feedbackPage = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackFeedbackPage(),
    load: loadFeedbackPage,
  })
  const fallback = mobileApiClient.getFallbackFeedbackPage()

  return (
    <ScreenContainer>
      <SectionTitle eyebrow="反馈页" title={feedbackPage.title ?? fallback.title} />
      <Text style={styles.description}>{feedbackPage.description ?? fallback.description}</Text>
      <View style={styles.row}>
        {(feedbackPage.reactionOptions ?? fallback.reactionOptions).map((option) => (
          <Text key={option.id} style={styles.reaction}>
            {option.label}
          </Text>
        ))}
      </View>
      <TextInput
        placeholder={feedbackPage.commentPlaceholder ?? fallback.commentPlaceholder}
        readOnly
        style={styles.input}
      />
      <Text style={styles.button}>{feedbackPage.submitLabel ?? fallback.submitLabel}</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  description: {
    color: '#6d5330',
    fontSize: 15,
    lineHeight: 1.5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reaction: {
    backgroundColor: '#efe4d2',
    borderRadius: 999,
    color: '#5f4521',
    padding: 10,
  },
  input: {
    backgroundColor: '#fffaf1',
    borderColor: '#d9c8ae',
    borderRadius: 18,
    borderWidth: 1,
    color: '#2f2419',
    fontSize: 15,
    padding: 14,
  },
  button: {
    backgroundColor: '#8d6a3d',
    borderRadius: 18,
    color: '#fffaf1',
    fontSize: 18,
    fontWeight: '700',
    padding: 14,
    textAlign: 'center',
  },
})
