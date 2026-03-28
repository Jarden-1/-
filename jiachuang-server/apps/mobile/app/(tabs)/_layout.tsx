import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: '首页' }} />
      <Tabs.Screen name="companion" options={{ title: '家园' }} />
      <Tabs.Screen name="my" options={{ title: '我的' }} />
    </Tabs>
  )
}
