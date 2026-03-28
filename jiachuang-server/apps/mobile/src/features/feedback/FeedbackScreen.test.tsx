import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { FeedbackScreen } from './FeedbackScreen'

describe('FeedbackScreen', () => {
  it('shows preset reactions before one-line comment input', () => {
    renderWithProviders(<FeedbackScreen />)

    expect(screen.getByText('知道啦')).toBeTruthy()
    expect(screen.getByText('放心了')).toBeTruthy()
    expect(screen.getByPlaceholderText('留一句话')).toBeTruthy()
  })
})
