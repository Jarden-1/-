import { screen, waitFor } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '../../test/render-with-providers'
import { useRemotePageData } from './use-remote-page-data'

function TestRemoteData() {
  const data = useRemotePageData({
    fallbackData: { title: '本地标题' },
    load: async () => ({ title: '线上标题' }),
  })

  return <div>{data.title}</div>
}

describe('useRemotePageData', () => {
  it('renders fallback data first and then hydrates with remote data', async () => {
    renderWithProviders(<TestRemoteData />)

    expect(screen.getByText('本地标题')).toBeTruthy()

    await waitFor(() => {
      expect(screen.getByText('线上标题')).toBeTruthy()
    })
  })
})
