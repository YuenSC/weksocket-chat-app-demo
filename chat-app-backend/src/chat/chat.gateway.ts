import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map to store user socket connections
  private userSocketMap = new Map<string, string>();

  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService,
    private conversationsService: ConversationsService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      // Update user's online status
      await this.usersService.updateOnlineStatus(userId, true);

      // Store the socket id with the user id
      this.userSocketMap.set(userId, client.id);

      // Join a room with the user's id
      client.join(userId);

      // Notify other users that this user is online
      this.server.emit('userStatus', { userId, isOnline: true });

      console.log(`Client connected: ${client.id}, User: ${userId}`);
    } catch (error) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) return;

      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      // Update user's online status
      await this.usersService.updateOnlineStatus(userId, false);

      // Remove the socket id from the map
      this.userSocketMap.delete(userId);

      // Notify other users that this user is offline
      this.server.emit('userStatus', { userId, isOnline: false });

      console.log(`Client disconnected: ${client.id}, User: ${userId}`);
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { content: string; receiverId: string },
  ) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const decoded = this.jwtService.verify(token);
      const senderId = decoded.sub;
      const { content, receiverId } = payload;

      // Get or create conversation
      const conversation = await this.conversationsService.create(
        senderId,
        receiverId,
      );

      // Create and save the message
      const message = await this.messagesService.create(
        content,
        senderId,
        receiverId,
        conversation.id,
      );

      // Get the full message with sender and receiver info
      const fullMessage = await this.messagesService.findByConversation(
        conversation.id,
      );
      const newMessage = fullMessage[fullMessage.length - 1];

      // Send the message to the receiver if they are online
      const receiverSocketId = this.userSocketMap.get(receiverId);
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('newMessage', newMessage);
      }

      // Send the message back to the sender
      client.emit('messageSent', newMessage);

      return newMessage;
    } catch (error) {
      console.error('Send message error:', error);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string },
  ) {
    try {
      const { conversationId } = payload;
      client.join(`conversation:${conversationId}`);
      return { success: true };
    } catch (error) {
      console.error('Join conversation error:', error);
      client.emit('error', { message: 'Failed to join conversation' });
    }
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string },
  ) {
    try {
      const { conversationId } = payload;
      client.leave(`conversation:${conversationId}`);
      return { success: true };
    } catch (error) {
      console.error('Leave conversation error:', error);
      client.emit('error', { message: 'Failed to leave conversation' });
    }
  }
}
