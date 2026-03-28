import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { AppProviders } from '../lib/app-shell/AppProviders'

export function renderWithProviders(ui: ReactElement) {
  return render(<AppProviders>{ui}</AppProviders>)
}
