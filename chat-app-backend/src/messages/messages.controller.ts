import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('conversation/:id')
  async findByConversation(
    @Param('id') conversationId: string,
  ): Promise<Message[]> {
    return this.messagesService.findByConversation(conversationId);
  }
}
