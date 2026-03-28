import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { FamilyVisitsScreen } from './FamilyVisitsScreen'

describe('FamilyVisitsScreen', () => {
  it('renders seen-by-family history without notification-center wording', () => {
    renderWithProviders(<FamilyVisitsScreen />)

    expect(screen.getByText(/累计查看/)).toBeTruthy()
    expect(screen.getByText(/最近一次/)).toBeTruthy()
    expect(screen.queryByText(/未读/)).toBeNull()
  })
})
