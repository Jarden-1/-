import { useCallback } from 'react'
import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { SectionTitle } from '../../lib/ui/SectionTitle'
import { BoundaryHintSelector } from './BoundaryHintSelector'
import { MediaPicker } from './MediaPicker'
import { PublishActionBar } from './PublishActionBar'
import { StatusComposer } from './StatusComposer'
import { StatusTagSelector } from './StatusTagSelector'

interface PublishStatusScreenProps {
  initialQuickExpression?: string
}

export function PublishStatusScreen({ initialQuickExpression }: PublishStatusScreenProps) {
  const loadPublishPage = useCallback(() => mobileApiClient.getPublishPage(), [])
  const publishPage = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackPublishPage(),
    load: loadPublishPage,
  })
  const fallback = mobileApiClient.getFallbackPublishPage()

  return (
    <ScreenContainer>
      <SectionTitle eyebrow="发布页" title="发个状态" />
      <StatusComposer
        placeholder={publishPage.composerPlaceholder ?? fallback.composerPlaceholder}
        value={initialQuickExpression}
      />
      <MediaPicker label={publishPage.mediaPickerLabel ?? fallback.mediaPickerLabel} />
      <StatusTagSelector options={publishPage.statusTagOptions ?? fallback.statusTagOptions} />
      <BoundaryHintSelector
        options={publishPage.boundaryHintOptions ?? fallback.boundaryHintOptions}
      />
      <PublishActionBar submitLabel={publishPage.submitLabel ?? fallback.submitLabel} />
    </ScreenContainer>
  )
}
