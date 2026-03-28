import type { PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export function ScreenContainer({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5efe2',
    color: '#2f2419',
    minHeight: '100vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    margin: '0 auto',
    maxWidth: 420,
    padding: 24,
  },
})
