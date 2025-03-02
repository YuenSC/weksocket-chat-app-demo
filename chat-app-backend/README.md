# Chat App Backend

This is the backend for a simple 1-to-1 chat application built with NestJS, WebSockets, and SQLite.

## Features

- User authentication with JWT
- Real-time messaging with WebSockets
- 1-to-1 conversations
- Online/offline user status
- Message history persistence with SQLite

## Technologies Used

- NestJS
- WebSockets (via Socket.io)
- TypeORM
- SQLite
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start:dev
```

The server will be running at http://localhost:3000.

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

### Conversations

- `GET /conversations` - Get all conversations
- `GET /conversations/:id` - Get conversation by ID
- `GET /conversations/user/:userId` - Get conversations by user ID
- `POST /conversations` - Create a new conversation

### Messages

- `GET /messages/conversation/:id` - Get messages by conversation ID

## WebSocket Events

### Client to Server

- `sendMessage` - Send a message to another user
- `joinConversation` - Join a conversation room
- `leaveConversation` - Leave a conversation room

### Server to Client

- `newMessage` - Receive a new message
- `messageSent` - Confirmation that a message was sent
- `userStatus` - User online/offline status update
- `error` - Error message

## Project Structure

```
src/
├── app.module.ts        # Main application module
├── main.ts              # Application entry point
├── auth/                # Authentication module
├── users/               # Users module
├── messages/            # Messages module
├── conversations/       # Conversations module
└── chat/                # WebSocket gateway
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
