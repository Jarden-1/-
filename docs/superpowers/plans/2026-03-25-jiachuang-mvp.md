# 家窗 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the smallest working 家窗 MVP that proves the approved product shape: a unified family home page, a shared publish flow for all family members, reaction-first feedback, a family-visits secondary page, and lightweight 家园 / 成员详情 / 我的 pages without drifting into chat, dual-home, or notification-center behavior.

**Architecture:** Reuse the existing `jiachuang-server` workspace. Put all canonical copy, component names, and fixture-backed DTOs in `packages/shared`; expose them through a small in-memory NestJS module in `apps/api`; render the approved page system in `apps/mobile` with Expo Router. The MVP is intentionally fixture-backed and synchronous: no auth flow, no database, no push delivery, and no real media upload in this plan.

**Tech Stack:** TypeScript, pnpm workspace, NestJS, Vitest, Supertest, Expo Router, React Native Testing Library

---

## MVP scope

### Must exist in MVP
- Unified home page with fixed structure: `FamilyPhotoHero` → `MiniOverviewStrip` → `PrimaryStatusEntry` → `FamilyTimeline`
- Shared publish page for **all** family members
- Feedback page with preset reactions before free-text留言
- `FamilyVisitsPage` as a secondary page for “被看见感”
- `FamilyCompanionPage` as the second first-level tab
- `MemberDetailPage` as a secondary page around one family member’s recent status rhythm
- `MyPage` as the third first-level tab for reminders, anniversaries, privacy, and family settings
- First-level navigation fixed to `首页 / 家园 / 我的`

### Explicitly out of scope for MVP
- Separate `child-home` / `parent-home` page trees
- Chat pages, conversation threads, unread badges, red-dot logic
- Publish visibility settings in the first version
- Real auth, real database persistence, push notification infrastructure
- Threaded comments, ranking, XP/progression, pet system
- Any wording or interaction that makes the app feel like IM or a family social feed

## Current baseline

Work from the real current workspace:

- `jiachuang-server/package.json` currently only exposes `test:api`
- `jiachuang-server/apps/api/src/app.module.ts` only contains a `/health` endpoint
- `jiachuang-server/apps/mobile/package.json` is still a stub
- `jiachuang-server/packages/shared/package.json` is still a stub
- Source of truth: `docs/superpowers/specs/2026-03-26-jiachuang-home-and-core-pages-design.md`

## Planned file structure

### Workspace and tooling
- Modify: `jiachuang-server/package.json`
- Modify: `jiachuang-server/apps/mobile/package.json`
- Modify: `jiachuang-server/packages/shared/package.json`
- Create: `jiachuang-server/apps/mobile/tsconfig.json`
- Create: `jiachuang-server/apps/mobile/babel.config.js`
- Create: `jiachuang-server/apps/mobile/app.json`
- Create: `jiachuang-server/apps/mobile/app/_layout.tsx`
- Create: `jiachuang-server/apps/mobile/app/index.tsx`
- Create: `jiachuang-server/apps/mobile/vitest.config.ts`
- Create: `jiachuang-server/apps/mobile/src/test/setup.ts`
- Create: `jiachuang-server/apps/mobile/src/test/render-with-providers.tsx`
- Create: `jiachuang-server/packages/shared/tsconfig.json`
- Create: `jiachuang-server/packages/shared/vitest.config.ts`
- Create: `jiachuang-server/packages/shared/src/index.ts`

### Shared contracts and fixtures
- Create: `jiachuang-server/packages/shared/src/domain/member-role.ts`
- Create: `jiachuang-server/packages/shared/src/domain/status.ts`
- Create: `jiachuang-server/packages/shared/src/domain/reaction.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/home.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/publish-status.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/feedback.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/family-visits.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/family-companion.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/member-detail.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/my-page.ts`
- Create: `jiachuang-server/packages/shared/src/fixtures/mvp-fixture.ts`
- Test: `jiachuang-server/packages/shared/src/fixtures/mvp-fixture.test.ts`

### API
- Modify: `jiachuang-server/apps/api/src/app.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.controller.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.service.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.store.ts`
- Test: `jiachuang-server/apps/api/test/home.e2e-spec.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-read.e2e-spec.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-write.e2e-spec.ts`

### Mobile shell and screens
- Create: `jiachuang-server/apps/mobile/src/lib/api/client.ts`
- Create: `jiachuang-server/apps/mobile/src/lib/app-shell/AppProviders.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/theme/tokens.ts`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/ScreenContainer.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/SectionTitle.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/role-mode/role-mode-store.ts`
- Create: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/FamilyPhotoHero.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/MiniOverviewStrip.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/PrimaryStatusEntry.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/SeenByFamilyCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/FamilyTimeline.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/StatusTimelineCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/ReactionBar.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/StatusComposer.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/MediaPicker.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/StatusTagSelector.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/BoundaryHintSelector.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/PublishActionBar.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/CompanionHero.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/CareSignalsPanel.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/GentleNudgeCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyPresenceList.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberDetailScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberProfileHeader.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberStatusSummary.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberTimeline.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/GentleCheckInCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/MyScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/MyProfileHeader.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/AnniversaryRemindersCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/ReminderPreferencesCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/PrivacyAndVisibilityCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/FamilySpaceSettings.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/member-detail/MemberDetailScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/my/MyScreen.test.tsx`

---

### Task 1: Stabilize the workspace and test harness

**Files:**
- Modify: `jiachuang-server/package.json`
- Modify: `jiachuang-server/apps/mobile/package.json`
- Modify: `jiachuang-server/packages/shared/package.json`
- Create: `jiachuang-server/apps/mobile/vitest.config.ts`
- Create: `jiachuang-server/apps/mobile/src/test/setup.ts`
- Create: `jiachuang-server/packages/shared/vitest.config.ts`
- Create: `jiachuang-server/packages/shared/src/index.ts`

- [ ] **Step 1: Write the first failing shared-package test**

```ts
import { describe, expect, it } from 'vitest'

describe('shared package bootstrap', () => {
  it('exports the MVP fixture from the package root', async () => {
    const shared = await import('./index')
    expect(shared).toHaveProperty('mvpFixture')
  })
})
```

- [ ] **Step 2: Run the test to verify the harness is incomplete**

Run: `pnpm --filter @jiachuang/shared test`
Expected: FAIL because shared scripts/config/root export do not exist.

- [ ] **Step 3: Add the smallest useful workspace scripts**

```json
{
  "scripts": {
    "test:api": "pnpm --filter @jiachuang/api test:e2e",
    "test:shared": "pnpm --filter @jiachuang/shared test",
    "test:mobile": "pnpm --filter @jiachuang/mobile test"
  }
}
```

- [ ] **Step 4: Add package-level test harnesses for `shared` and `mobile`**

```ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
})
```

- [ ] **Step 5: Re-run the shared test**

Run: `pnpm --filter @jiachuang/shared test`
Expected: FAIL moves to missing-export assertion instead of script/config failure.

- [ ] **Step 6: Commit**

```bash
git add jiachuang-server/package.json jiachuang-server/apps/mobile jiachuang-server/packages/shared
git commit -m "chore: prepare jiachuang mvp workspace"
```

### Task 2: Define canonical MVP contracts and fixtures from the approved spec

**Files:**
- Create: `jiachuang-server/packages/shared/src/domain/member-role.ts`
- Create: `jiachuang-server/packages/shared/src/domain/status.ts`
- Create: `jiachuang-server/packages/shared/src/domain/reaction.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/home.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/publish-status.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/feedback.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/family-visits.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/family-companion.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/member-detail.ts`
- Create: `jiachuang-server/packages/shared/src/contracts/my-page.ts`
- Create: `jiachuang-server/packages/shared/src/fixtures/mvp-fixture.ts`
- Modify: `jiachuang-server/packages/shared/src/index.ts`
- Test: `jiachuang-server/packages/shared/src/fixtures/mvp-fixture.test.ts`

- [ ] **Step 1: Write the failing fixture test**

```ts
import { describe, expect, it } from 'vitest'
import { mvpFixture } from './mvp-fixture'

describe('mvpFixture', () => {
  it('matches the approved home skeleton and primary action', () => {
    expect(mvpFixture.home.layoutOrder).toEqual([
      'FamilyPhotoHero',
      'MiniOverviewStrip',
      'PrimaryStatusEntry',
      'FamilyTimeline',
    ])
    expect(mvpFixture.home.primaryAction.label).toBe('发个状态')
    expect(mvpFixture.publishPage).not.toHaveProperty('visibilityOptions')
  })
})
```

- [ ] **Step 2: Run the fixture test to verify contracts do not exist yet**

Run: `pnpm --filter @jiachuang/shared test -- src/fixtures/mvp-fixture.test.ts`
Expected: FAIL because the fixture/contracts do not exist.

- [ ] **Step 3: Add shared constants that lock the product language**

```ts
export const quickExpressionOptions = [
  '随手写一句',
  '发张照片',
  '今天还不错',
  '刚吃完饭',
  '准备休息了',
  '想说两句',
] as const
```

- [ ] **Step 4: Add DTOs for all MVP pages**

```ts
export interface HomePageData {
  layoutOrder: ['FamilyPhotoHero', 'MiniOverviewStrip', 'PrimaryStatusEntry', 'FamilyTimeline']
  primaryAction: { label: '发个状态' }
}

export interface PublishPageData {
  composerPlaceholder: string
  statusTagOptions: readonly string[]
  boundaryOptions: readonly string[]
}
```

- [ ] **Step 5: Add one canonical fixture that covers the MVP pages**

```ts
export const mvpFixture = {
  home: { /* unified home */ },
  publishPage: { /* no visibility selector in MVP */ },
  feedbackPage: { /* preset reactions first */ },
  familyVisits: { /* seen-by-family */ },
  familyCompanion: { /* plant companion page */ },
  memberDetail: { /* single-member status rhythm */ },
  myPage: { /* reminders + privacy + family settings */ },
}
```

- [ ] **Step 6: Run the full shared test suite**

Run: `pnpm --filter @jiachuang/shared test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/packages/shared
git commit -m "feat: add jiachuang mvp shared contracts"
```

### Task 3: Expose fixture-backed page data from the API

**Files:**
- Modify: `jiachuang-server/apps/api/src/app.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.controller.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.service.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.store.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-read.e2e-spec.ts`

- [ ] **Step 1: Write the failing read-endpoint test**

```ts
it('GET /core-pages/home returns the unified home skeleton', async () => {
  const response = await request(app.getHttpServer()).get('/core-pages/home?role=child')

  expect(response.status).toBe(200)
  expect(response.body.layoutOrder).toEqual([
    'FamilyPhotoHero',
    'MiniOverviewStrip',
    'PrimaryStatusEntry',
    'FamilyTimeline',
  ])
})
```

- [ ] **Step 2: Extend the test to cover all read pages**

```ts
it('GET /core-pages/family-companion returns the plant-based shared-space page', async () => {
  const response = await request(app.getHttpServer()).get('/core-pages/family-companion')
  expect(response.status).toBe(200)
  expect(response.body.hero.kind).toBe('plant')
})
```

- [ ] **Step 3: Run the API e2e suite**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: FAIL because `/core-pages/*` routes do not exist.

- [ ] **Step 4: Add a small fixture-backed store/service/controller layer**

```ts
@Controller('/core-pages')
export class CorePagesController {
  constructor(private readonly corePagesService: CorePagesService) {}

  @Get('/home')
  getHome(@Query('role') role: 'child' | 'parent' = 'child') {
    return this.corePagesService.getHome(role)
  }
}
```

- [ ] **Step 5: Register read routes for all MVP pages**

Routes to add:
- `GET /core-pages/home`
- `GET /core-pages/publish-page`
- `GET /core-pages/feedback-page`
- `GET /core-pages/family-visits`
- `GET /core-pages/family-companion`
- `GET /core-pages/member-detail/:memberId`
- `GET /core-pages/my-page`

- [ ] **Step 6: Re-run the API e2e suite**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS for `health.e2e-spec.ts` and the new read specs.

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/api jiachuang-server/packages/shared
git commit -m "feat: add jiachuang mvp page endpoints"
```

### Task 4: Add in-memory publish, reaction, and one-line comment mutations

**Files:**
- Modify: `jiachuang-server/apps/api/src/core-pages/core-pages.controller.ts`
- Modify: `jiachuang-server/apps/api/src/core-pages/core-pages.service.ts`
- Modify: `jiachuang-server/apps/api/src/core-pages/core-pages.store.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-write.e2e-spec.ts`

- [ ] **Step 1: Write the failing publish mutation test**

```ts
it('POST /core-pages/statuses creates a status for any family member role', async () => {
  const response = await request(app.getHttpServer())
    .post('/core-pages/statuses')
    .send({ authorRole: 'parent', text: '刚吃完饭', boundaryHint: '今天有点忙' })

  expect(response.status).toBe(201)
  expect(response.body.status.text).toBe('刚吃完饭')
})
```

- [ ] **Step 2: Write the failing reaction/comment test**

```ts
it('POST /core-pages/statuses/:id/reactions records reaction-first feedback', async () => {
  const response = await request(app.getHttpServer())
    .post('/core-pages/statuses/status-1/reactions')
    .send({ reaction: '放心了' })

  expect(response.status).toBe(201)
  expect(response.body.reactionSummary[0].label).toBe('放心了')
})
```

- [ ] **Step 3: Run the API suite to verify write endpoints are missing**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: FAIL because write routes are not implemented.

- [ ] **Step 4: Add the smallest in-memory mutation layer**

```ts
createStatus(input: { authorRole: 'child' | 'parent'; text: string; boundaryHint?: string }) {
  const status = {
    id: `status-${Date.now()}`,
    authorRole: input.authorRole,
    text: input.text,
    boundaryHint: input.boundaryHint ?? null,
  }
  this.timeline.unshift(status)
  return status
}
```

- [ ] **Step 5: Keep feedback boundaries aligned with the spec**

Rules to enforce:
- reactions are lightweight and separate from comments
- comments are one-line and non-threaded
- no unread counters or notification-center state
- no visibility picker required in MVP publish flow

- [ ] **Step 6: Re-run the API suite**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS across all API e2e specs.

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/api
git commit -m "feat: add jiachuang mvp write flows"
```

### Task 5: Bootstrap the mobile shell and first-level navigation

**Files:**
- Create: `jiachuang-server/apps/mobile/app/_layout.tsx`
- Create: `jiachuang-server/apps/mobile/app/index.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/api/client.ts`
- Create: `jiachuang-server/apps/mobile/src/lib/app-shell/AppProviders.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/theme/tokens.ts`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/ScreenContainer.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/SectionTitle.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/role-mode/role-mode-store.ts`
- Test: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.test.tsx`

- [ ] **Step 1: Write the failing shell test**

```tsx
it('renders the app shell with 首页 / 家园 / 我的 and without split-home labels', () => {
  render(<HomeScreen />)
  expect(screen.queryByText(/ChildHome/)).toBeNull()
  expect(screen.queryByText(/ParentHome/)).toBeNull()
})
```

- [ ] **Step 2: Run the mobile suite**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: FAIL because the Expo test shell and screens do not exist.

- [ ] **Step 3: Add provider layer, API client, and root layout**

```tsx
export default function RootLayout() {
  return (
    <AppProviders>
      <Slot />
    </AppProviders>
  )
}
```

- [ ] **Step 4: Add a small role-mode store that changes emphasis only**

```ts
export type RoleMode = 'child' | 'parent'
```

- [ ] **Step 5: Re-run the mobile suite**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: FAIL moves from shell/bootstrap errors to missing screen/component errors.

- [ ] **Step 6: Commit**

```bash
git add jiachuang-server/apps/mobile
git commit -m "feat: add jiachuang mobile shell"
```

### Task 6: Implement Home, Publish, Feedback, and Family Visits pages

**Files:**
- Create: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/FamilyPhotoHero.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/MiniOverviewStrip.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/PrimaryStatusEntry.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/SeenByFamilyCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/FamilyTimeline.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/StatusTimelineCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/ReactionBar.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/StatusComposer.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/MediaPicker.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/StatusTagSelector.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/BoundaryHintSelector.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/PublishActionBar.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.test.tsx`

- [ ] **Step 1: Write the failing home-order test**

```tsx
it('renders the approved unified home order', async () => {
  render(<HomeScreen />)
  expect(screen.getByTestId('family-photo-hero')).toBeTruthy()
  expect(screen.getByTestId('mini-overview-strip')).toBeTruthy()
  expect(screen.getByText('发个状态')).toBeTruthy()
  expect(screen.getByTestId('family-timeline')).toBeTruthy()
})
```

- [ ] **Step 2: Write the failing publish/feedback/family-visits tests**

```tsx
it('prefills the composer from a quick expression', () => {
  render(<PublishStatusScreen initialQuickExpression="刚吃完饭" />)
  expect(screen.getByDisplayValue('刚吃完饭')).toBeTruthy()
})
```

```tsx
it('shows preset reactions before the one-line comment input', () => {
  render(<FeedbackScreen />)
  expect(screen.getByText('知道啦')).toBeTruthy()
  expect(screen.getByPlaceholderText('留一句话')).toBeTruthy()
})
```

```tsx
it('shows family visit aggregates without unread-pressure copy', () => {
  render(<FamilyVisitsScreen />)
  expect(screen.getByText(/最近一次/)).toBeTruthy()
  expect(screen.queryByText(/未读/)).toBeNull()
})
```

- [ ] **Step 3: Run the mobile suite**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: FAIL because these screen trees do not exist yet.

- [ ] **Step 4: Implement the unified home in spec order**

```tsx
return (
  <ScreenContainer>
    <FamilyPhotoHero />
    <MiniOverviewStrip />
    <PrimaryStatusEntry />
    <FamilyTimeline />
  </ScreenContainer>
)
```

- [ ] **Step 5: Implement the shared publish page without a visibility selector**

```tsx
return (
  <ScreenContainer>
    <StatusComposer />
    <MediaPicker />
    <StatusTagSelector />
    <BoundaryHintSelector />
    <PublishActionBar />
  </ScreenContainer>
)
```

- [ ] **Step 6: Implement reaction-first feedback and non-notification family visits**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx src/features/publish/PublishStatusScreen.test.tsx src/features/feedback/FeedbackScreen.test.tsx src/features/family-visits/FamilyVisitsScreen.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile
git commit -m "feat: implement jiachuang mvp home and secondary pages"
```

### Task 7: Implement 家园 / 成员详情 / 我的 pages

**Files:**
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/CompanionHero.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/CareSignalsPanel.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/GentleNudgeCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyPresenceList.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberDetailScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberProfileHeader.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberStatusSummary.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/MemberTimeline.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/member-detail/GentleCheckInCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/MyScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/MyProfileHeader.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/AnniversaryRemindersCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/ReminderPreferencesCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/PrivacyAndVisibilityCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/my/FamilySpaceSettings.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/member-detail/MemberDetailScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/my/MyScreen.test.tsx`

- [ ] **Step 1: Write the failing 家园 page test**

```tsx
it('renders plant-based shared-space content and gentle nudge entry', () => {
  render(<FamilyCompanionScreen />)
  expect(screen.getByText(/最近家里有人常来看看/)).toBeTruthy()
  expect(screen.getByText(/轻轻问问|送个关心/)).toBeTruthy()
})
```

- [ ] **Step 2: Write the failing 成员详情 / 我的 page tests**

```tsx
it('renders member status rhythm instead of chat entry points', () => {
  render(<MemberDetailScreen />)
  expect(screen.queryByText(/进入聊天|发消息给 TA/)).toBeNull()
})
```

```tsx
it('renders reminders, privacy, and family settings in MyPage', () => {
  render(<MyScreen />)
  expect(screen.getByText(/提醒/)).toBeTruthy()
  expect(screen.getByText(/隐私/)).toBeTruthy()
})
```

- [ ] **Step 3: Run the targeted mobile tests**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/family-companion/FamilyCompanionScreen.test.tsx src/features/member-detail/MemberDetailScreen.test.tsx src/features/my/MyScreen.test.tsx`
Expected: FAIL because these page trees do not exist yet.

- [ ] **Step 4: Implement the three page groups exactly to spec boundaries**

Boundaries to keep:
- 家园页 uses a plant, not a pet or progression system
- 成员详情页 centers recent status rhythm, not messaging
- 我的页 centers reminders, anniversaries, privacy, and family settings

- [ ] **Step 5: Re-run the targeted mobile tests**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/family-companion/FamilyCompanionScreen.test.tsx src/features/member-detail/MemberDetailScreen.test.tsx src/features/my/MyScreen.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add jiachuang-server/apps/mobile
git commit -m "feat: implement jiachuang mvp companion member and my pages"
```

### Task 8: Verify MVP boundaries before claiming completion

**Files:**
- Test: `jiachuang-server/packages/shared/src/fixtures/mvp-fixture.test.ts`
- Test: `jiachuang-server/apps/api/test/*.e2e-spec.ts`
- Test: `jiachuang-server/apps/mobile/src/features/**/*.test.tsx`

- [ ] **Step 1: Add final failing verification tests for banned old semantics**

```tsx
it('does not render split-home labels or chat-first actions', () => {
  render(<HomeScreen />)
  expect(screen.queryByText(/ChildHome|ParentHome|聊天/)).toBeNull()
})
```

```ts
it('does not expose child-home or parent-home endpoints', async () => {
  const childHome = await request(app.getHttpServer()).get('/core-pages/child-home')
  const parentHome = await request(app.getHttpServer()).get('/core-pages/parent-home')
  expect(childHome.status).toBe(404)
  expect(parentHome.status).toBe(404)
})
```

- [ ] **Step 2: Run the full verification set**

Run:
- `pnpm test:shared`
- `pnpm test:api`
- `pnpm test:mobile`

Expected: all PASS

- [ ] **Step 3: Do a manual MVP smoke pass**

Checklist:
- Home opens with the approved four-block order
- Any family member can enter the publish flow
- Publish flow has no visibility picker
- Feedback page makes reactions more prominent than comments
- Family visits reads like visit history, not unread notifications
- 家园 / 成员详情 / 我的 all match the spec boundaries

- [ ] **Step 4: Commit**

```bash
git add jiachuang-server/apps/mobile jiachuang-server/apps/api jiachuang-server/packages/shared
git commit -m "feat: finish jiachuang mvp flow"
```

---

## Verification checklist

Before saying the MVP is complete, verify all of the following:

- `pnpm test:shared`
- `pnpm test:api`
- `pnpm test:mobile`
- Home order is exactly `FamilyPhotoHero` → `MiniOverviewStrip` → `PrimaryStatusEntry` → `FamilyTimeline`
- No publish visibility picker exists in MVP
- No screen or route uses split `child-home` / `parent-home` semantics
- No page behaves like chat, IM inbox, or notification center
- `FamilyCompanionPage` uses a plant and avoids ranking / XP / punishment loops
- `MemberDetailPage` avoids chat-entry wording
- `MyPage` stays focused on reminders, anniversaries, privacy, and family settings

## Deferred until post-MVP

Do not add these in this plan:
- real auth and account flows
- database persistence
- upload backend for real media files
- chat or threaded comments
- unread system / red dots / push notifications
- custom visibility controls at publish time
- leaderboard / pet progression / gamified pressure systems
