import type { PropsWithChildren } from 'react'

import { AppProviders } from '../src/lib/app-shell/AppProviders'

export default function RootLayout({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>
}
