import { mobileApiClient } from '../../lib/api/client'
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
  const publishPage = mobileApiClient.getPublishPage()

  return (
    <ScreenContainer>
      <SectionTitle eyebrow="发布页" title="发个状态" />
      <StatusComposer
        placeholder={publishPage.composerPlaceholder}
        value={initialQuickExpression}
      />
      <MediaPicker label={publishPage.mediaPickerLabel} />
      <StatusTagSelector options={publishPage.statusTagOptions} />
      <BoundaryHintSelector options={publishPage.boundaryHintOptions} />
      <PublishActionBar submitLabel={publishPage.submitLabel} />
    </ScreenContainer>
  )
}
