import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithProviders } from '../../test/render-with-providers'
import { MemberDetailScreen } from './MemberDetailScreen'

describe('MemberDetailScreen', () => {
  it('renders member status rhythm instead of chat affordances', () => {
    renderWithProviders(<MemberDetailScreen />)

    expect(screen.getByText(/最近更新/)).toBeTruthy()
    expect(screen.queryByText(/发消息给 TA|进入聊天|在线状态/)).toBeNull()
  })
})
