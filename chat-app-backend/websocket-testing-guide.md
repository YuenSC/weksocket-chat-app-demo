# WebSocket Chat App Testing Guide

This guide provides a simple approach to test the WebSocket chat application using Postman.

## Prerequisites

- Postman installed on your computer
- Chat application running locally

## Step 1: Get Authentication Tokens

1. **Register two test users**

   - Send POST request to `http://localhost:3000/auth/register`
   - Body for first user:

   ```json
   {
     "username": "testuser1",
     "password": "password123"
   }
   ```

   - Repeat for second user with username "testuser2"

2. **Login to get JWT tokens**
   - Send POST request to `http://localhost:3000/auth/login`
   - Use the same credentials as registration
   - Save the returned JWT tokens for both users

## Step 2: Test WebSocket Connection

1. **Create a WebSocket request in Postman**

   - Click "New" → "WebSocket Request"
   - URL: `ws://localhost:3000`
   - Add connection parameter:
     - Key: `auth`
     - Value: `{"token": "your_jwt_token_for_user1"}`
   - Click "Connect"

2. **Verify connection**
   - Check for "Connected" status in Postman
   - Check server logs for connection message

## Step 3: Test Basic Chat Features

1. **Set up event listeners**

   - Add listeners for: `newMessage`, `messageSent`, `userStatus`, `error`

2. **Send a message**

   - Event: `sendMessage`
   - Payload:

   ```json
   {
     "content": "Hello, this is a test message",
     "receiverId": "user_id_of_testuser2"
   }
   ```

   - Verify you receive a `messageSent` event

3. **Join a conversation**

   - Event: `joinConversation`
   - Payload:

   ```json
   {
     "conversationId": "conversation_id"
   }
   ```

4. **Leave a conversation**
   - Event: `leaveConversation`
   - Payload:
   ```json
   {
     "conversationId": "conversation_id"
   }
   ```

## Step 4: Test Multi-User Interaction

1. **Open a second WebSocket connection with testuser2's token**
2. **Send messages between users**
3. **Verify both users receive appropriate events**

## Step 5: Test Disconnection

1. **Click "Disconnect" in Postman**
2. **Verify disconnection in server logs**

## Common Issues and Troubleshooting

- **Connection refused**: Ensure the server is running
- **Authentication failed**: Check that your JWT token is valid and properly formatted
- **Events not received**: Verify you're listening to the correct event names

## Example Test Scenarios

1. **User status updates**:

   - Connect with user1, then connect with user2
   - Verify user1 receives notification that user2 is online
   - Disconnect user2
   - Verify user1 receives notification that user2 is offline

2. **Message delivery**:

   - Send message from user1 to user2
   - Verify user2 receives the message via `newMessage` event
   - Verify user1 receives confirmation via `messageSent` event

3. **Conversation management**:
   - Both users join the same conversation
   - Send messages in that conversation
   - Verify both users receive the messages
