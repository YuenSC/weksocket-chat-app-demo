import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
  ) {}

  async findAll(): Promise<Conversation[]> {
    return this.conversationsRepository.find({
      relations: ['participant1', 'participant2'],
    });
  }

  async findOne(id: string): Promise<Conversation> {
    const conversation = await this.conversationsRepository.findOne({
      where: { id },
      relations: ['participant1', 'participant2'],
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  async findByParticipants(
    userId1: string,
    userId2: string,
  ): Promise<Conversation | null> {
    const conversation = await this.conversationsRepository.findOne({
      where: [
        { participant1Id: userId1, participant2Id: userId2 },
        { participant1Id: userId2, participant2Id: userId1 },
      ],
    });

    return conversation;
  }

  async create(
    participant1Id: string,
    participant2Id: string,
  ): Promise<Conversation> {
    // Check if conversation already exists
    const existingConversation = await this.findByParticipants(
      participant1Id,
      participant2Id,
    );

    if (existingConversation) {
      return existingConversation;
    }

    const conversation = new Conversation();
    conversation.participant1Id = participant1Id;
    conversation.participant2Id = participant2Id;

    return this.conversationsRepository.save(conversation);
  }

  async findByUser(userId: string): Promise<Conversation[]> {
    return this.conversationsRepository.find({
      where: [{ participant1Id: userId }, { participant2Id: userId }],
      relations: ['participant1', 'participant2'],
    });
  }
}
