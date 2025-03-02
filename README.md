# WebSocket Chat App Demo

This repository contains a simple 1-to-1 chat application built with WebSockets. The project is divided into two main parts:

1. **chat-app-backend**: A NestJS application with WebSocket support using Gateways and SQLite for data storage
2. **chat-app-frontend**: A Next.js application with Tailwind CSS and shadcn/ui for the user interface

## Project Plan

### 1. Backend Setup (NestJS)

#### 1.1. Project Initialization

- Create a new NestJS project
- Set up SQLite database with TypeORM
- Configure WebSocket Gateway

#### 1.2. Database Models

- User model (id, username, createdAt)
- Message model (id, content, senderId, receiverId, createdAt)
- Conversation model (id, participant1Id, participant2Id, createdAt)

#### 1.3. WebSocket Gateway Implementation

- Create a ChatGateway class
- Implement connection/disconnection handlers
- Implement message sending/receiving functionality
- Store messages in the database

#### 1.4. REST API Endpoints

- User registration and authentication
- Fetch user list
- Fetch conversation history between two users

### 2. Frontend Setup (Next.js)

#### 2.1. Project Initialization

- Create a new Next.js project
- Set up Tailwind CSS
- Install and configure shadcn/ui components
- Set up WebSocket client

#### 2.2. UI Components

- Authentication screens (login/register)
- User list sidebar (similar to WhatsApp)
- Chat interface with message bubbles
- Message input component

#### 2.3. State Management

- Manage active conversations
- Handle real-time message updates
- Store and display chat history

### 3. Integration and Testing

#### 3.1. Connect Frontend to Backend

- Establish WebSocket connection
- Implement authentication flow
- Test message sending/receiving

#### 3.2. Testing

- Test user registration and authentication
- Test real-time messaging
- Test chat history persistence

### 4. Deployment (Optional)

- Deploy backend to a hosting service
- Deploy frontend to Vercel or similar platform

## Getting Started

### Backend Setup

```bash
cd chat-app-backend
npm install
npm run start:dev
```

### Frontend Setup

```bash
cd chat-app-frontend
npm install
npm run dev
```

## Features

- User registration and authentication
- Real-time 1-to-1 messaging using WebSockets
- Persistent chat history using SQLite
- Clean and intuitive UI similar to WhatsApp
- Online/offline user status

## Technologies Used

### Backend

- NestJS
- WebSockets (via Socket.io)
- TypeORM
- SQLite
- JWT Authentication

### Frontend

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Socket.io Client
