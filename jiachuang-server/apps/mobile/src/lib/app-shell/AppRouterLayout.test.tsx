import { screen } from '@testing-library/react'
import React from 'react'

import RootLayout from '../../../app/_layout'
import TabsLayout from '../../../app/(tabs)/_layout'
import { renderWithProviders } from '../../test/render-with-providers'

describe('app router layouts', () => {
  it('renders the root stack layout inside app providers', () => {
    renderWithProviders(<RootLayout />)

    expect(screen.getByTestId('stack-navigator')).toBeTruthy()
  })

  it('renders fixed tabs for 首页 / 家园 / 我的', () => {
    renderWithProviders(<TabsLayout />)

    expect(screen.getByTestId('tabs-navigator')).toBeTruthy()
    expect(screen.getByText('首页')).toBeTruthy()
    expect(screen.getByText('家园')).toBeTruthy()
    expect(screen.getByText('我的')).toBeTruthy()
  })
})
