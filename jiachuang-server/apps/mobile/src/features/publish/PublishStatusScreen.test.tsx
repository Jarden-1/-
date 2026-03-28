import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { PublishStatusScreen } from './PublishStatusScreen'

describe('PublishStatusScreen', () => {
  it('renders the shared publish structure without a visibility picker', () => {
    renderWithProviders(<PublishStatusScreen />)

    expect(screen.getByPlaceholderText('今天想让家里知道点什么？')).toBeTruthy()
    expect(screen.queryByText('仅父母可见')).toBeNull()
    expect(screen.getByText('发布')).toBeTruthy()
  })

  it('prefills the composer from a quick expression', () => {
    renderWithProviders(<PublishStatusScreen initialQuickExpression="刚吃完饭" />)

    expect(screen.getByDisplayValue('刚吃完饭')).toBeTruthy()
  })
})
