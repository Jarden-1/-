import { afterEach, describe, expect, it, vi } from 'vitest'

import { mobileApiClient } from './client'

describe('mobileApiClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('requests the deployed backend using the public API base URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    })

    vi.stubGlobal('fetch', fetchMock)

    await mobileApiClient.getHealth()

    expect(fetchMock).toHaveBeenCalledWith(
      'http://14.103.219.42/jiachuang-api/health',
      expect.any(Object),
    )
  })
})
