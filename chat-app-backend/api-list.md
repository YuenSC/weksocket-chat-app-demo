# API List

This document lists all the APIs available in the project.

## Auth APIs

- **POST /auth/login**

  - Description: Login a user and return a JWT token.
  - Body: `{ "username": "string", "password": "string" }`

- **POST /auth/register**
  - Description: Register a new user.
  - Body: `{ "username": "string", "password": "string" }`

## User APIs

- **GET /users**

  - Description: Get a list of all users.
  - Authentication: JWT required

- **GET /users/:id**
  - Description: Get details of a specific user by ID.
  - Authentication: JWT required

## Conversation APIs

- **GET /conversations**

  - Description: Get a list of all conversations.
  - Authentication: JWT required

- **GET /conversations/:id**

  - Description: Get details of a specific conversation by ID.
  - Authentication: JWT required

- **GET /conversations/user/:userId**

  - Description: Get conversations for a specific user.
  - Authentication: JWT required

- **POST /conversations**
  - Description: Create a new conversation between two users.
  - Body: `{ "participant1Id": "string", "participant2Id": "string" }`
  - Authentication: JWT required

## Message APIs

- **GET /messages/conversation/:id**
  - Description: Get messages for a specific conversation.
  - Authentication: JWT required

## App APIs

- **GET /**
  - Description: Get a welcome message from the server.

## WebSocket Events

- **Connection**

  - Description: Establish a WebSocket connection with the server.
  - Authentication: JWT token required in the connection parameters.

- **Event: sendMessage**

  - Description: Send a message to another user.
  - Payload: `{ "content": "string", "receiverId": "string" }`
  - Response: Emits `messageSent` event to sender and `newMessage` event to receiver.

- **Event: joinConversation**

  - Description: Join a specific conversation.
  - Payload: `{ "conversationId": "string" }`
  - Response: Confirmation of joining the conversation.

- **Event: leaveConversation**

  - Description: Leave a specific conversation.
  - Payload: `{ "conversationId": "string" }`
  - Response: Confirmation of leaving the conversation.

- **Event: userStatus**
  - Description: Notify when a user goes online or offline.
  - Payload: `{ "userId": "string", "isOnline": "boolean" }`
