import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { MyScreen } from './MyScreen'

describe('MyScreen', () => {
  it('renders reminders, privacy, and family settings without notification-center semantics', () => {
    renderWithProviders(<MyScreen />)

    expect(screen.getAllByText(/生日|纪念日/).length).toBeGreaterThan(0)
    expect(screen.getByText(/隐私|可见/)).toBeTruthy()
    expect(screen.queryByText(/未读|聊天|身份切换/)).toBeNull()
  })
})
