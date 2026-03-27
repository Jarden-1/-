# 家窗统一首页与核心页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first full implementation of 家窗 core pages around the approved product shape: one unified family home, one shared publish flow for every family member, reaction-first feedback, a secondary family-visits page, a plant-based family companion page, a member-detail page, and a focused my page without drifting into chat, dual-home IA, or notification-center behavior.

**Architecture:** Reuse the existing `jiachuang-server` workspace as a fixture-backed vertical slice. Put canonical page contracts, copy, and mock data in `packages/shared`; expose them from a small in-memory NestJS module in `apps/api`; and render them in `apps/mobile` with Expo Router and a fixed top-level navigation of `首页 / 家园 / 我的`. This plan keeps state local and synchronous on purpose: no auth, no database, no push, no real media backend, and no IM-style unread system.

**Tech Stack:** TypeScript, pnpm workspace, NestJS, Vitest, Supertest, Expo Router, React Native, React Native Testing Library

---

## Scope guardrails

### Must exist in this plan
- Unified home page with fixed structure: `FamilyPhotoHero` → `MiniOverviewStrip` → `PrimaryStatusEntry` → `FamilyTimeline`
- Shared publish page for all family members
- Feedback page where preset reactions come before one-line留言
- `FamilyVisitsPage` as a secondary page for 被看见感 and visit history
- `FamilyCompanionPage` as the second first-level tab with plant-based shared-space semantics
- `MemberDetailPage` as a secondary page for one member’s recent status rhythm
- `MyPage` as the third first-level tab for reminders, anniversaries, privacy, and family-space settings
- Top-level navigation fixed to `首页 / 家园 / 我的`

### Explicitly out of scope
- Separate `child-home` / `parent-home` screen trees
- Chat pages, conversation threads, unread badges, red-dot logic, or notification-center IA
- Publish visibility settings in the first version
- Real auth, persistent database storage, push infrastructure, or real media upload backend
- Rankings, XP bars, pet systems, decay/punishment loops, or taskified growth mechanics
- Any wording or interaction that makes the product feel like IM or a family social feed

## Current baseline

Work from the real current workspace:

- `jiachuang-server/package.json` currently only exposes `test:api`
- `jiachuang-server/apps/api/src/app.module.ts` currently only contains a `/health` endpoint
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
- Create: `jiachuang-server/apps/mobile/app/(tabs)/_layout.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/index.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/companion.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/my.tsx`
- Create: `jiachuang-server/apps/mobile/app/publish.tsx`
- Create: `jiachuang-server/apps/mobile/app/feedback/[statusId].tsx`
- Create: `jiachuang-server/apps/mobile/app/family-visits.tsx`
- Create: `jiachuang-server/apps/mobile/app/member/[memberId].tsx`
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
- Create: `jiachuang-server/packages/shared/src/fixtures/core-pages-fixture.ts`
- Test: `jiachuang-server/packages/shared/src/fixtures/core-pages-fixture.test.ts`

### API
- Modify: `jiachuang-server/apps/api/src/app.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.controller.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.service.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.store.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-read.e2e-spec.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-write.e2e-spec.ts`

### Mobile shell and screens
- Create: `jiachuang-server/apps/mobile/src/lib/api/client.ts`
- Create: `jiachuang-server/apps/mobile/src/lib/app-shell/AppProviders.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/theme/tokens.ts`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/ScreenContainer.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/SectionTitle.tsx`
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
  it('exports the core pages fixture from the package root', async () => {
    const shared = await import('./index')
    expect(shared).toHaveProperty('corePagesFixture')
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
git commit -m "chore: prepare jiachuang core pages workspace"
```

### Task 2: Define canonical contracts and fixtures from the approved spec

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
- Create: `jiachuang-server/packages/shared/src/fixtures/core-pages-fixture.ts`
- Modify: `jiachuang-server/packages/shared/src/index.ts`
- Test: `jiachuang-server/packages/shared/src/fixtures/core-pages-fixture.test.ts`

- [ ] **Step 1: Write the failing fixture test**

```ts
import { describe, expect, it } from 'vitest'
import { corePagesFixture } from './core-pages-fixture'

describe('corePagesFixture', () => {
  it('matches the approved home skeleton and top-level IA', () => {
    expect(corePagesFixture.home.layoutOrder).toEqual([
      'FamilyPhotoHero',
      'MiniOverviewStrip',
      'PrimaryStatusEntry',
      'FamilyTimeline',
    ])
    expect(corePagesFixture.home.primaryAction.label).toBe('发个状态')
    expect(corePagesFixture.navigation.tabs).toEqual(['首页', '家园', '我的'])
    expect(corePagesFixture.publishPage).not.toHaveProperty('visibilityOptions')
  })
})
```

- [ ] **Step 2: Run the fixture test to verify contracts do not exist yet**

Run: `pnpm --filter @jiachuang/shared test -- src/fixtures/core-pages-fixture.test.ts`
Expected: FAIL because the fixture/contracts do not exist.

- [ ] **Step 3: Add shared constants that lock product language**

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

- [ ] **Step 4: Add DTOs for all approved core pages**

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

- [ ] **Step 5: Add one canonical fixture that covers the full core-page set**

```ts
export const corePagesFixture = {
  navigation: { tabs: ['首页', '家园', '我的'] },
  home: { /* unified home */ },
  publishPage: { /* no visibility selector */ },
  feedbackPage: { /* preset reactions first */ },
  familyVisits: { /* seen-by-family */ },
  familyCompanion: { /* plant companion */ },
  memberDetail: { /* one member timeline */ },
  myPage: { /* reminders + privacy + family settings */ },
}
```

- [ ] **Step 6: Run the full shared test suite**

Run: `pnpm --filter @jiachuang/shared test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/packages/shared
git commit -m "feat: add jiachuang core page contracts"
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

- [ ] **Step 5: Register read routes for all approved pages**

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
git commit -m "feat: add jiachuang core page endpoints"
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
  expect(response.body.reaction).toBe('放心了')
})
```

- [ ] **Step 3: Run the API write tests**

Run: `pnpm --filter @jiachuang/api test:e2e -- core-pages-write.e2e-spec.ts`
Expected: FAIL because write handlers do not exist.

- [ ] **Step 4: Implement the smallest useful in-memory write operations**

```ts
@Post('/statuses')
createStatus(@Body() body: CreateStatusDto) {
  return this.corePagesService.createStatus(body)
}
```

- [ ] **Step 5: Support the three write behaviors only**

Write handlers to add:
- `POST /core-pages/statuses`
- `POST /core-pages/statuses/:id/reactions`
- `POST /core-pages/statuses/:id/comments`

- [ ] **Step 6: Re-run the API e2e suite**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS for read and write specs.

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/api
git commit -m "feat: add jiachuang core page mutations"
```

### Task 5: Build the Expo Router shell with fixed top-level tabs

**Files:**
- Create: `jiachuang-server/apps/mobile/app/_layout.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/_layout.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/index.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/companion.tsx`
- Create: `jiachuang-server/apps/mobile/app/(tabs)/my.tsx`
- Create: `jiachuang-server/apps/mobile/app/publish.tsx`
- Create: `jiachuang-server/apps/mobile/app/feedback/[statusId].tsx`
- Create: `jiachuang-server/apps/mobile/app/family-visits.tsx`
- Create: `jiachuang-server/apps/mobile/app/member/[memberId].tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/app-shell/AppProviders.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/api/client.ts`

- [ ] **Step 1: Write the failing navigation-shell test**

```tsx
it('renders the fixed tab labels 首页 / 家园 / 我的', () => {
  render(<AppTabs />)

  expect(screen.getByText('首页')).toBeTruthy()
  expect(screen.getByText('家园')).toBeTruthy()
  expect(screen.getByText('我的')).toBeTruthy()
})
```

- [ ] **Step 2: Run the mobile test to verify the shell does not exist yet**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx`
Expected: FAIL because the app shell and screen routes do not exist.

- [ ] **Step 3: Add the smallest route shell and API client plumbing**

```tsx
return (
  <Tabs>
    <Tabs.Screen name="index" options={{ title: '首页' }} />
    <Tabs.Screen name="companion" options={{ title: '家园' }} />
    <Tabs.Screen name="my" options={{ title: '我的' }} />
  </Tabs>
)
```

- [ ] **Step 4: Wire the secondary routes outside the tab layout**

Secondary routes to add:
- `/publish`
- `/feedback/[statusId]`
- `/family-visits`
- `/member/[memberId]`

- [ ] **Step 5: Re-run the mobile test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx`
Expected: PASS for the shell assertions or move to the next missing-screen assertion.

- [ ] **Step 6: Commit**

```bash
git add jiachuang-server/apps/mobile
git commit -m "feat: add jiachuang mobile app shell"
```

### Task 6: Build the unified home screen and timeline components

**Files:**
- Create: `jiachuang-server/apps/mobile/src/lib/ui/ScreenContainer.tsx`
- Create: `jiachuang-server/apps/mobile/src/lib/ui/SectionTitle.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/FamilyPhotoHero.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/MiniOverviewStrip.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/PrimaryStatusEntry.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/SeenByFamilyCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/FamilyTimeline.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/StatusTimelineCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/home/ReactionBar.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.test.tsx`

- [ ] **Step 1: Write the failing home-screen test**

```tsx
it('renders the approved home skeleton in order', async () => {
  render(<HomeScreen />)

  expect(screen.getByTestId('family-photo-hero')).toBeTruthy()
  expect(screen.getByTestId('mini-overview-strip')).toBeTruthy()
  expect(screen.getByText('发个状态')).toBeTruthy()
  expect(screen.getByTestId('family-timeline')).toBeTruthy()
})
```

- [ ] **Step 2: Add a timeline-card assertion that protects the interaction hierarchy**

```tsx
it('shows reactions before the 留言 action inside timeline cards', async () => {
  render(<HomeScreen />)
  expect(screen.getAllByText('知道啦').length).toBeGreaterThan(0)
  expect(screen.getAllByText('留言').length).toBeGreaterThan(0)
})
```

- [ ] **Step 3: Run the home-screen test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx`
Expected: FAIL because the components do not exist.

- [ ] **Step 4: Implement the home screen with the fixed approved structure**

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

- [ ] **Step 5: Keep the home screen within spec boundaries**

Do not add:
- `InlineGentleNudge`
- notification-center cards
- split child/parent layouts
- chat-first CTA blocks

- [ ] **Step 6: Re-run the home-screen test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features/home jiachuang-server/apps/mobile/src/lib/ui
git commit -m "feat: add unified home screen"
```

### Task 7: Build the shared publish page and feedback page

**Files:**
- Create: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/StatusComposer.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/MediaPicker.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/StatusTagSelector.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/BoundaryHintSelector.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/publish/PublishActionBar.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.test.tsx`

- [ ] **Step 1: Write the failing publish-screen test**

```tsx
it('renders the shared publish structure without a visibility picker', () => {
  render(<PublishStatusScreen />)

  expect(screen.getByPlaceholderText('今天想让家里知道点什么？')).toBeTruthy()
  expect(screen.queryByText('仅父母可见')).toBeNull()
  expect(screen.getByText('发布')).toBeTruthy()
})
```

- [ ] **Step 2: Write the failing feedback-screen test**

```tsx
it('shows preset reactions before one-line comment input', () => {
  render(<FeedbackScreen />)

  expect(screen.getByText('知道啦')).toBeTruthy()
  expect(screen.getByText('放心了')).toBeTruthy()
  expect(screen.getByPlaceholderText('留一句话')).toBeTruthy()
})
```

- [ ] **Step 3: Run the publish/feedback tests**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/publish/PublishStatusScreen.test.tsx src/features/feedback/FeedbackScreen.test.tsx`
Expected: FAIL because the screens do not exist.

- [ ] **Step 4: Implement the shared publish flow**

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

- [ ] **Step 5: Implement the feedback page as “补一句关心” instead of chat**

```tsx
return (
  <ScreenContainer>
    <StatusSummary />
    <PresetReactionGroup />
    <OneLineCommentInput />
    <SendButton />
  </ScreenContainer>
)
```

- [ ] **Step 6: Re-run the publish/feedback tests**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/publish/PublishStatusScreen.test.tsx src/features/feedback/FeedbackScreen.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features/publish jiachuang-server/apps/mobile/src/features/feedback
git commit -m "feat: add publish and feedback screens"
```

### Task 8: Build the family-visits page and home-to-secondary-page linkage

**Files:**
- Create: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.tsx`
- Modify: `jiachuang-server/apps/mobile/src/features/home/SeenByFamilyCard.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.test.tsx`

- [ ] **Step 1: Write the failing family-visits test**

```tsx
it('renders the family visits page as seen-by-family history, not a notification center', () => {
  render(<FamilyVisitsScreen />)

  expect(screen.getByText(/累计查看/i)).toBeTruthy()
  expect(screen.getByText(/最近一次/i)).toBeTruthy()
  expect(screen.queryByText(/未读/i)).toBeNull()
})
```

- [ ] **Step 2: Run the family-visits test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/family-visits/FamilyVisitsScreen.test.tsx`
Expected: FAIL because the page does not exist.

- [ ] **Step 3: Implement `SeenByFamilyCard` as a lightweight preview that links to the secondary page**

```tsx
return (
  <Pressable onPress={goToFamilyVisits}>
    <Text>家里最近来看过你的近况</Text>
  </Pressable>
)
```

- [ ] **Step 4: Implement `FamilyVisitsScreen` around visit history and 被看见感**

```tsx
return (
  <ScreenContainer>
    <VisitSummary />
    <TopViewerCard />
    <VisitRecordList />
  </ScreenContainer>
)
```

- [ ] **Step 5: Re-run the family-visits test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/family-visits/FamilyVisitsScreen.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features/family-visits jiachuang-server/apps/mobile/src/features/home/SeenByFamilyCard.tsx
git commit -m "feat: add family visits page"
```

### Task 9: Build the 家园 page with plant-based shared-space semantics

**Files:**
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/CompanionHero.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/CareSignalsPanel.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/GentleNudgeCard.tsx`
- Create: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyPresenceList.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.test.tsx`

- [ ] **Step 1: Write the failing 家园 page test**

```tsx
it('renders the companion page with a plant hero and gentle nudge area', () => {
  render(<FamilyCompanionScreen />)

  expect(screen.getByText(/长高了一点|很有精神|慢慢等大家/)).toBeTruthy()
  expect(screen.getByText(/轻轻问问|送个关心|提醒一下近况/)).toBeTruthy()
})
```

- [ ] **Step 2: Add a scope-protection assertion against gamification drift**

```tsx
it('does not render ranking, xp, or punishment language', () => {
  render(<FamilyCompanionScreen />)

  expect(screen.queryByText(/排行榜|经验|凋零|任务/)).toBeNull()
})
```

- [ ] **Step 3: Run the 家园 page test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/family-companion/FamilyCompanionScreen.test.tsx`
Expected: FAIL because the page does not exist.

- [ ] **Step 4: Implement the 家园 page with the approved structure**

```tsx
return (
  <ScreenContainer>
    <CompanionHero />
    <CareSignalsPanel />
    <GentleNudgeCard />
    <FamilyPresenceList />
  </ScreenContainer>
)
```

- [ ] **Step 5: Keep the page in the plant-only lane**

Do not add:
- pet visuals
- progression bars
- streak counters
- punishment or decay mechanics

- [ ] **Step 6: Re-run the 家园 page test**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/family-companion/FamilyCompanionScreen.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features/family-companion
git commit -m "feat: add family companion page"
```

### Task 10: Build the member-detail page and the my page

**Files:**
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
- Test: `jiachuang-server/apps/mobile/src/features/member-detail/MemberDetailScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/my/MyScreen.test.tsx`

- [ ] **Step 1: Write the failing member-detail test**

```tsx
it('renders one member recent-status rhythm without chat affordances', () => {
  render(<MemberDetailScreen />)

  expect(screen.getByText(/最近更新/)).toBeTruthy()
  expect(screen.queryByText(/发消息给 TA|进入聊天|在线状态/)).toBeNull()
})
```

- [ ] **Step 2: Write the failing my-page test**

```tsx
it('renders reminders, privacy, and family settings without a notification center', () => {
  render(<MyScreen />)

  expect(screen.getByText(/生日|纪念日/)).toBeTruthy()
  expect(screen.getByText(/隐私|可见/)).toBeTruthy()
  expect(screen.queryByText(/未读|聊天|身份切换/)).toBeNull()
})
```

- [ ] **Step 3: Run the member-detail and my-page tests**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/member-detail/MemberDetailScreen.test.tsx src/features/my/MyScreen.test.tsx`
Expected: FAIL because the pages do not exist.

- [ ] **Step 4: Implement the member-detail page with the approved structure**

```tsx
return (
  <ScreenContainer>
    <MemberProfileHeader />
    <MemberStatusSummary />
    <MemberTimeline />
    <GentleCheckInCard />
  </ScreenContainer>
)
```

- [ ] **Step 5: Implement the my page with the approved structure**

```tsx
return (
  <ScreenContainer>
    <MyProfileHeader />
    <AnniversaryRemindersCard />
    <ReminderPreferencesCard />
    <PrivacyAndVisibilityCard />
    <FamilySpaceSettings />
  </ScreenContainer>
)
```

- [ ] **Step 6: Re-run the member-detail and my-page tests**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/member-detail/MemberDetailScreen.test.tsx src/features/my/MyScreen.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features/member-detail jiachuang-server/apps/mobile/src/features/my
git commit -m "feat: add member detail and my pages"
```

### Task 11: Verify the full core-page vertical slice

**Files:**
- Modify as needed: previously created test files only

- [ ] **Step 1: Run the full shared test suite**

Run: `pnpm --filter @jiachuang/shared test`
Expected: PASS

- [ ] **Step 2: Run the full API e2e suite**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS

- [ ] **Step 3: Run the full mobile test suite**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: PASS

- [ ] **Step 4: Manually verify the scope boundaries**

Checklist:
- Home first screen shows `FamilyPhotoHero`, `MiniOverviewStrip`, `发个状态`, and `FamilyTimeline`
- No publish visibility picker exists
- No screen or route uses split `child-home` / `parent-home` semantics
- `FamilyVisitsPage` behaves like seen-by-family history, not unread notifications
- `FamilyCompanionPage` uses a plant and avoids ranking / XP / punishment loops
- `MemberDetailPage` does not expose chat affordances
- `MyPage` centers reminders, privacy, and family settings only

- [ ] **Step 5: Commit the final verified slice**

```bash
git add jiachuang-server
git commit -m "feat: complete jiachuang core pages slice"
```
