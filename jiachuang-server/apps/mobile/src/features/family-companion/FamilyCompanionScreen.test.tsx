import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { FamilyCompanionScreen } from './FamilyCompanionScreen'

describe('FamilyCompanionScreen', () => {
  it('renders plant-based shared-space content and a gentle nudge area', () => {
    renderWithProviders(<FamilyCompanionScreen />)

    expect(screen.getByText(/很有精神/)).toBeTruthy()
    expect(screen.getByText(/轻轻问问|送个关心|提醒一下近况/)).toBeTruthy()
  })

  it('does not render ranking or punishment language', () => {
    renderWithProviders(<FamilyCompanionScreen />)

    expect(screen.queryByText(/排行榜|经验|凋零|任务/)).toBeNull()
  })
})
