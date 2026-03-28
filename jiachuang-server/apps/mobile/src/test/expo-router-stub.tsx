import React from 'react'

type SlotProps = React.PropsWithChildren

function createNavigator(displayName: string) {
  const Navigator = ({ children }: SlotProps) => <div data-testid={displayName}>{children}</div>

  Navigator.displayName = displayName
  ;(Navigator as unknown as { Screen: typeof Screen }).Screen = Screen

  return Navigator as typeof Navigator & { Screen: typeof Screen }
}

function Screen({ options }: { options?: { title?: string } }) {
  return options?.title ? <span>{options.title}</span> : null
}

export function Slot({ children }: SlotProps) {
  return <>{children}</>
}

export const Stack = createNavigator('stack-navigator')
export const Tabs = createNavigator('tabs-navigator')
