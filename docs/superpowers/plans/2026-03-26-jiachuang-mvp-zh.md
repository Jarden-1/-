# 家窗 MVP 中文实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 按任务逐项执行本计划。步骤使用 checkbox（`- [ ]`）语法进行追踪。

**目标：** 交付一个最小但方向正确的家窗 MVP，验证已经确认的产品形态：统一家庭首页、所有家庭成员共享的发状态流程、轻反馈优先的留言方式、承接“被看见感”的来访页，以及轻量的家园 / 成员详情 / 我的页面，同时避免产品滑向聊天工具、双首页或通知中心。

**架构：** 复用现有 `jiachuang-server` 工作区。把稳定的页面文案、组件命名、DTO 和 fixture 放进 `packages/shared`；通过 `apps/api` 提供一个小型的内存型 NestJS API；再由 `apps/mobile` 用 Expo Router / React Native 渲染页面。这个 MVP 明确保持轻量：不做鉴权、不接数据库、不做推送、不接真实媒体上传后端。

**技术栈：** TypeScript、pnpm workspace、NestJS、Vitest、Supertest、Expo Router、React Native Testing Library

---

## MVP 范围

### MVP 必须包含
- 统一首页，固定结构为：`FamilyPhotoHero` → `MiniOverviewStrip` → `PrimaryStatusEntry` → `FamilyTimeline`
- 所有家庭成员共享的发布页
- 轻反馈优先、留言次之的反馈页
- 承接“被看见感”的二级页 `FamilyVisitsPage`
- 一级导航中的 `FamilyCompanionPage`（家园页）
- 围绕某位成员最近近况节奏的 `MemberDetailPage`
- 承接提醒、纪念日、隐私与家庭设置的 `MyPage`
- 一级导航固定为：`首页 / 家园 / 我的`

### MVP 明确不做
- `child-home` / `parent-home` 两套首页树
- 聊天页、会话线程、未读角标、红点逻辑
- 发布页可见范围配置
- 真实鉴权、数据库持久化、推送系统
- 楼中楼评论、排行榜、经验值、宠物系统
- 任何会让产品看起来像 IM 或家庭社交 feed 的交互与文案

## 当前基线

按当前真实代码库为准：

- `jiachuang-server/package.json` 目前只暴露了 `test:api`
- `jiachuang-server/apps/api/src/app.module.ts` 目前只有 `/health` 接口
- `jiachuang-server/apps/mobile/package.json` 还是空壳
- `jiachuang-server/packages/shared/package.json` 还是空壳
- 唯一设计依据：`docs/superpowers/specs/2026-03-26-jiachuang-home-and-core-pages-design.md`

## 计划中的文件结构

### 工作区与工具层
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

### 共享契约与 fixture
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

### Mobile 外壳与页面
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

### 任务 1：稳定工作区与测试基础设施

**Files:**
- Modify: `jiachuang-server/package.json`
- Modify: `jiachuang-server/apps/mobile/package.json`
- Modify: `jiachuang-server/packages/shared/package.json`
- Create: `jiachuang-server/apps/mobile/vitest.config.ts`
- Create: `jiachuang-server/apps/mobile/src/test/setup.ts`
- Create: `jiachuang-server/packages/shared/vitest.config.ts`
- Create: `jiachuang-server/packages/shared/src/index.ts`

- [ ] **Step 1: 先写第一个 failing shared 测试**

```ts
import { describe, expect, it } from 'vitest'

describe('shared package bootstrap', () => {
  it('从 package root 导出 mvpFixture', async () => {
    const shared = await import('./index')
    expect(shared).toHaveProperty('mvpFixture')
  })
})
```

- [ ] **Step 2: 运行测试，确认基础设施还不完整**

Run: `pnpm --filter @jiachuang/shared test`
Expected: FAIL，因为 shared 脚本 / config / 根导出都还不存在。

- [ ] **Step 3: 加上最小可用的 workspace scripts**

```json
{
  "scripts": {
    "test:api": "pnpm --filter @jiachuang/api test:e2e",
    "test:shared": "pnpm --filter @jiachuang/shared test",
    "test:mobile": "pnpm --filter @jiachuang/mobile test"
  }
}
```

- [ ] **Step 4: 为 `shared` 和 `mobile` 建好 package 级测试配置**

```ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
})
```

- [ ] **Step 5: 重新运行 shared 测试**

Run: `pnpm --filter @jiachuang/shared test`
Expected: FAIL 点前移到缺少导出，而不是脚本 / config 失败。

- [ ] **Step 6: Commit**

```bash
git add jiachuang-server/package.json jiachuang-server/apps/mobile jiachuang-server/packages/shared
git commit -m "chore: prepare jiachuang mvp workspace"
```

### 任务 2：把设计稿固化成共享契约与 fixture

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

- [ ] **Step 1: 先写 failing fixture 测试**

```ts
import { describe, expect, it } from 'vitest'
import { mvpFixture } from './mvp-fixture'

describe('mvpFixture', () => {
  it('符合确认后的首页骨架与主动作', () => {
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

- [ ] **Step 2: 运行 fixture 测试，确认契约还不存在**

Run: `pnpm --filter @jiachuang/shared test -- src/fixtures/mvp-fixture.test.ts`
Expected: FAIL，因为 fixture / contract 模块还不存在。

- [ ] **Step 3: 加入锁定产品文案的共享常量**

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

- [ ] **Step 4: 为所有 MVP 页面补齐 DTO**

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

- [ ] **Step 5: 建立一个覆盖 MVP 页面集合的 canonical fixture**

```ts
export const mvpFixture = {
  home: { /* 统一首页 */ },
  publishPage: { /* 首版无可见范围 */ },
  feedbackPage: { /* 轻反馈优先 */ },
  familyVisits: { /* 被看见感 */ },
  familyCompanion: { /* 植物家园页 */ },
  memberDetail: { /* 单成员近况页 */ },
  myPage: { /* 提醒 + 隐私 + 家庭设置 */ },
}
```

- [ ] **Step 6: 运行完整 shared 测试**

Run: `pnpm --filter @jiachuang/shared test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/packages/shared
git commit -m "feat: add jiachuang mvp shared contracts"
```

### 任务 3：在 API 中暴露 fixture 驱动的页面数据

**Files:**
- Modify: `jiachuang-server/apps/api/src/app.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.module.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.controller.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.service.ts`
- Create: `jiachuang-server/apps/api/src/core-pages/core-pages.store.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-read.e2e-spec.ts`

- [ ] **Step 1: 先写 failing 读取接口测试**

```ts
it('GET /core-pages/home 返回统一首页骨架', async () => {
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

- [ ] **Step 2: 扩展测试，覆盖全部只读页面接口**

```ts
it('GET /core-pages/family-companion 返回植物语义的共同空间页', async () => {
  const response = await request(app.getHttpServer()).get('/core-pages/family-companion')
  expect(response.status).toBe(200)
  expect(response.body.hero.kind).toBe('plant')
})
```

- [ ] **Step 3: 运行 API e2e 测试**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: FAIL，因为 `/core-pages/*` 路由还不存在。

- [ ] **Step 4: 加入最小可用的 fixture-backed store / service / controller**

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

- [ ] **Step 5: 为所有 MVP 页面注册读取接口**

Routes to add:
- `GET /core-pages/home`
- `GET /core-pages/publish-page`
- `GET /core-pages/feedback-page`
- `GET /core-pages/family-visits`
- `GET /core-pages/family-companion`
- `GET /core-pages/member-detail/:memberId`
- `GET /core-pages/my-page`

- [ ] **Step 6: 重新运行 API e2e 测试**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS，包括 `health.e2e-spec.ts` 和新建的读取测试。

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/api jiachuang-server/packages/shared
git commit -m "feat: add jiachuang mvp page endpoints"
```

### 任务 4：补齐内存态发布、轻反馈和一句话留言

**Files:**
- Modify: `jiachuang-server/apps/api/src/core-pages/core-pages.controller.ts`
- Modify: `jiachuang-server/apps/api/src/core-pages/core-pages.service.ts`
- Modify: `jiachuang-server/apps/api/src/core-pages/core-pages.store.ts`
- Test: `jiachuang-server/apps/api/test/core-pages-write.e2e-spec.ts`

- [ ] **Step 1: 先写 failing 发布测试**

```ts
it('POST /core-pages/statuses 允许任何家庭成员角色发布状态', async () => {
  const response = await request(app.getHttpServer())
    .post('/core-pages/statuses')
    .send({ authorRole: 'parent', text: '刚吃完饭', boundaryHint: '今天有点忙' })

  expect(response.status).toBe(201)
  expect(response.body.status.text).toBe('刚吃完饭')
})
```

- [ ] **Step 2: 再写 failing 轻反馈 / 留言测试**

```ts
it('POST /core-pages/statuses/:id/reactions 记录轻反馈优先的互动', async () => {
  const response = await request(app.getHttpServer())
    .post('/core-pages/statuses/status-1/reactions')
    .send({ reaction: '放心了' })

  expect(response.status).toBe(201)
  expect(response.body.reaction).toBe('放心了')
})
```

- [ ] **Step 3: 运行 API 写接口测试**

Run: `pnpm --filter @jiachuang/api test:e2e -- core-pages-write.e2e-spec.ts`
Expected: FAIL，因为写接口还不存在。

- [ ] **Step 4: 只实现最小必要的三种写操作**

```ts
@Post('/statuses')
createStatus(@Body() body: CreateStatusDto) {
  return this.corePagesService.createStatus(body)
}
```

- [ ] **Step 5: 只支持这三种 mutation**

Write handlers to add:
- `POST /core-pages/statuses`
- `POST /core-pages/statuses/:id/reactions`
- `POST /core-pages/statuses/:id/comments`

- [ ] **Step 6: 重新运行 API e2e 测试**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS，读取与写入测试都通过。

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/api
git commit -m "feat: add jiachuang mvp page mutations"
```

### 任务 5：搭起 mobile 外壳并实现固定首页结构

**Files:**
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
- Test: `jiachuang-server/apps/mobile/src/features/home/HomeScreen.test.tsx`

- [ ] **Step 1: 先写 failing 首页测试**

```tsx
it('按确认后的顺序渲染首页骨架', async () => {
  render(<HomeScreen />)

  expect(screen.getByTestId('family-photo-hero')).toBeTruthy()
  expect(screen.getByTestId('mini-overview-strip')).toBeTruthy()
  expect(screen.getByText('发个状态')).toBeTruthy()
  expect(screen.getByTestId('family-timeline')).toBeTruthy()
})
```

- [ ] **Step 2: 增加一条保护交互层级的断言**

```tsx
it('状态卡里先展示轻反馈，再展示留言动作', async () => {
  render(<HomeScreen />)
  expect(screen.getAllByText('知道啦').length).toBeGreaterThan(0)
  expect(screen.getAllByText('留言').length).toBeGreaterThan(0)
})
```

- [ ] **Step 3: 运行首页测试**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx`
Expected: FAIL，因为组件还不存在。

- [ ] **Step 4: 按固定结构实现首页**

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

- [ ] **Step 5: 严格守住首页边界**

Do not add:
- `InlineGentleNudge`
- 通知中心式卡片
- child / parent 双布局
- 聊天主 CTA

- [ ] **Step 6: 重新运行首页测试**

Run: `pnpm --filter @jiachuang/mobile test -- src/features/home/HomeScreen.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features/home jiachuang-server/apps/mobile/src/lib
git commit -m "feat: add unified home screen"
```

### 任务 6：实现共享发布页、反馈页与其他核心页面骨架

**Files:**
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
- Test: `jiachuang-server/apps/mobile/src/features/publish/PublishStatusScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/feedback/FeedbackScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-visits/FamilyVisitsScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/family-companion/FamilyCompanionScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/member-detail/MemberDetailScreen.test.tsx`
- Test: `jiachuang-server/apps/mobile/src/features/my/MyScreen.test.tsx`

- [ ] **Step 1: 先写 failing 发布页与反馈页测试**

```tsx
it('发布页没有可见范围选择，且有发布主按钮', () => {
  render(<PublishStatusScreen />)

  expect(screen.getByPlaceholderText('今天想让家里知道点什么？')).toBeTruthy()
  expect(screen.queryByText('仅父母可见')).toBeNull()
  expect(screen.getByText('发布')).toBeTruthy()
})

it('反馈页优先展示预设轻反馈，再展示一句话输入', () => {
  render(<FeedbackScreen />)

  expect(screen.getByText('知道啦')).toBeTruthy()
  expect(screen.getByText('放心了')).toBeTruthy()
  expect(screen.getByPlaceholderText('留一句话')).toBeTruthy()
})
```

- [ ] **Step 2: 再为家园 / 成员详情 / 我的页写边界型测试**

```tsx
it('家园页使用植物语义，不出现排行榜或经验值', () => {
  render(<FamilyCompanionScreen />)
  expect(screen.queryByText(/排行榜|经验|凋零|任务/)).toBeNull()
})

it('成员详情页不是聊天页', () => {
  render(<MemberDetailScreen />)
  expect(screen.queryByText(/发消息给 TA|进入聊天|在线状态/)).toBeNull()
})

it('我的页承接提醒与隐私，不承接通知中心', () => {
  render(<MyScreen />)
  expect(screen.queryByText(/未读|聊天|身份切换/)).toBeNull()
})
```

- [ ] **Step 3: 运行这些页面测试**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: FAIL，因为这些页面和组件还不存在。

- [ ] **Step 4: 先实现共享发布与反馈页面结构**

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

- [ ] **Step 5: 再实现剩余核心页面的最小骨架**

页面结构应固定为：
- `FamilyVisitsScreen`: 总览 + 最近查看 + 记录列表
- `FamilyCompanionScreen`: `CompanionHero` + `CareSignalsPanel` + `GentleNudgeCard` + `FamilyPresenceList`
- `MemberDetailScreen`: `MemberProfileHeader` + `MemberStatusSummary` + `MemberTimeline` + `GentleCheckInCard`
- `MyScreen`: `MyProfileHeader` + `AnniversaryRemindersCard` + `ReminderPreferencesCard` + `PrivacyAndVisibilityCard` + `FamilySpaceSettings`

- [ ] **Step 6: 重新运行 mobile 测试**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add jiachuang-server/apps/mobile/src/features
git commit -m "feat: add jiachuang mvp core screens"
```

### 任务 7：做整体验证，确认 MVP 没有偏航

**Files:**
- Modify as needed: 已创建的测试文件

- [ ] **Step 1: 运行完整 shared 测试**

Run: `pnpm --filter @jiachuang/shared test`
Expected: PASS

- [ ] **Step 2: 运行完整 API e2e 测试**

Run: `pnpm --filter @jiachuang/api test:e2e`
Expected: PASS

- [ ] **Step 3: 运行完整 mobile 测试**

Run: `pnpm --filter @jiachuang/mobile test`
Expected: PASS

- [ ] **Step 4: 手工核对最终边界**

Checklist:
- 首页首屏先看到 `FamilyPhotoHero`、`MiniOverviewStrip`、`发个状态` 和 `FamilyTimeline`
- 发布页没有可见范围选择器
- 没有任何页面使用 child / parent 双首页语义
- 没有页面表现得像聊天工具、通知中心或家庭 feed
- `FamilyVisitsPage` 承接“被看见感”，不是未读通知
- `FamilyCompanionPage` 使用植物语义，不出现排行 / XP / 惩罚机制
- `MemberDetailPage` 是单成员近况页，不是私聊前置页
- `MyPage` 只承接提醒、隐私和家庭设置

- [ ] **Step 5: Commit 最终验证通过的垂直切片**

```bash
git add jiachuang-server
git commit -m "feat: complete jiachuang mvp slice"
```
