import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(
    content: string,
    senderId: string,
    receiverId: string,
    conversationId: string,
  ): Promise<Message> {
    const message = new Message();
    message.content = content;
    message.senderId = senderId;
    message.receiverId = receiverId;
    message.conversationId = conversationId;
    return this.messagesRepository.save(message);
  }

  async findByConversation(conversationId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver'],
    });
  }
}
