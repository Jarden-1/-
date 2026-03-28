import { Stack } from 'expo-router'

import { AppProviders } from '../src/lib/app-shell/AppProviders'

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="publish" options={{ title: '发个状态' }} />
        <Stack.Screen name="family-visits" options={{ title: '家人来访' }} />
        <Stack.Screen name="feedback/[statusId]" options={{ title: '补一句关心' }} />
        <Stack.Screen name="member/[memberId]" options={{ title: '成员详情' }} />
      </Stack>
    </AppProviders>
  )
}
