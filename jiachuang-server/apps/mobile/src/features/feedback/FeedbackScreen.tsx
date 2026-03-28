import { StyleSheet, Text, TextInput, View } from 'react-native'

import { mobileApiClient } from '../../lib/api/client'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { SectionTitle } from '../../lib/ui/SectionTitle'

export function FeedbackScreen() {
  const feedbackPage = mobileApiClient.getFeedbackPage()

  return (
    <ScreenContainer>
      <SectionTitle eyebrow="反馈页" title={feedbackPage.title} />
      <Text style={styles.description}>{feedbackPage.description}</Text>
      <View style={styles.row}>
        {feedbackPage.reactionOptions.map((option) => (
          <Text key={option.id} style={styles.reaction}>
            {option.label}
          </Text>
        ))}
      </View>
      <TextInput placeholder={feedbackPage.commentPlaceholder} readOnly style={styles.input} />
      <Text style={styles.button}>{feedbackPage.submitLabel}</Text>
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
