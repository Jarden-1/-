import { useEffect, useState } from 'react'

interface UseRemotePageDataOptions<T> {
  fallbackData: T
  load: () => Promise<T>
}

export function useRemotePageData<T>({
  fallbackData,
  load,
}: UseRemotePageDataOptions<T>): T {
  const [data, setData] = useState<T>(fallbackData)

  useEffect(() => {
    let cancelled = false

    load()
      .then((nextData) => {
        if (!cancelled) {
          setData(nextData)
        }
      })
      .catch(() => {
        // Keep fallback data when the remote API is unavailable.
      })

    return () => {
      cancelled = true
    }
  }, [load])

  return data
}
