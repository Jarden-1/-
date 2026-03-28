import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { HomeScreen } from './HomeScreen'

describe('HomeScreen', () => {
  it('renders the app shell labels without split-home wording', () => {
    renderWithProviders(<HomeScreen />)

    expect(screen.queryByText(/ChildHome/)).toBeNull()
    expect(screen.queryByText(/ParentHome/)).toBeNull()
    expect(screen.getByText('首页')).toBeTruthy()
    expect(screen.getByText('家园')).toBeTruthy()
    expect(screen.getByText('我的')).toBeTruthy()
  })

  it('renders the approved unified home order', () => {
    renderWithProviders(<HomeScreen />)

    expect(screen.getByTestId('family-photo-hero')).toBeTruthy()
    expect(screen.getByTestId('mini-overview-strip')).toBeTruthy()
    expect(screen.getByText('发个状态')).toBeTruthy()
    expect(screen.getByTestId('family-timeline')).toBeTruthy()
  })

  it('does not render split-home or chat-first wording', () => {
    renderWithProviders(<HomeScreen />)

    expect(screen.queryByText(/child-home|parent-home|聊天/i)).toBeNull()
  })
})
