import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common'

import { CorePagesService } from './core-pages.service'

type UserRoleParam = 'child' | 'parent'

interface CreateStatusDto {
  authorRole: UserRoleParam
  text: string
  boundaryHint?: string
}

interface ReactionDto {
  reaction: string
}

interface CommentDto {
  text: string
}

@Controller('core-pages')
export class CorePagesController {
  constructor(
    @Inject(CorePagesService) private readonly corePagesService: CorePagesService,
  ) {}

  @Get('home')
  getHome(@Query('role') role: UserRoleParam = 'child') {
    return this.corePagesService.getHome(role)
  }

  @Get('publish-page')
  getPublishPage() {
    return this.corePagesService.getPublishPage()
  }

  @Get('feedback-page')
  getFeedbackPage() {
    return this.corePagesService.getFeedbackPage()
  }

  @Get('family-visits')
  getFamilyVisits() {
    return this.corePagesService.getFamilyVisits()
  }

  @Get('family-companion')
  getFamilyCompanion() {
    return this.corePagesService.getFamilyCompanion()
  }

  @Get('member-detail/:memberId')
  getMemberDetail(@Param('memberId') memberId: string) {
    return this.corePagesService.getMemberDetail(memberId)
  }

  @Get('my-page')
  getMyPage() {
    return this.corePagesService.getMyPage()
  }

  @Post('statuses')
  createStatus(@Body() body: CreateStatusDto) {
    return this.corePagesService.createStatus(body)
  }

  @Post('statuses/:id/reactions')
  addReaction(@Param('id') id: string, @Body() body: ReactionDto) {
    return this.corePagesService.addReaction(id, body.reaction)
  }

  @Post('statuses/:id/comments')
  addComment(@Param('id') id: string, @Body() body: CommentDto) {
    return this.corePagesService.addComment(id, body.text)
  }
}
