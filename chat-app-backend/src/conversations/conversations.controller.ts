import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { Conversation } from './conversation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Conversation[]> {
    return this.conversationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Conversation> {
    return this.conversationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Conversation[]> {
    return this.conversationsService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    createConversationDto: {
      participant1Id: string;
      participant2Id: string;
    },
  ): Promise<Conversation> {
    return this.conversationsService.create(
      createConversationDto.participant1Id,
      createConversationDto.participant2Id,
    );
  }
}
