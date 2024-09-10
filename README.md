# GymSystem

GymSystem is a comprehensive "Site as a Service" (SaaS) platform designed for gyms and fitness centers. It provides a robust solution for managing members, scheduling classes, handling payments, and facilitating communication with members.

![GymSystem Logo](https://imgur.com/a/0b3X17d)

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Build](#build)
5. [Tests](#tests)
6. [API Documentation](#api-documentation)
7. [License](#license)

## Features

- **User Management**: Registration, authentication, and role-based access control.
- **Gym Management**: Create, read, update, and delete gym information.
- **Check-in System**: QR code-based check-ins for gym members.
- **Turnstile Integration**: Manage gym access through turnstiles.
- **Class Scheduling**: (Planned feature)
- **Payment Integration**: (Planned feature)

## Technologies

### Backend

- Node.js 20.15.1
- Fastify
- Prisma ORM
- PostgreSQL
- TypeScript

### Testing

- Vitest

### Authentication

- JSON Web Tokens (JWT)

## Getting Started

## Getting Started

1. Clone the repository

2. Install dependencies:
   ```sh
   npm install

3. Set up the database:

```sh
docker network create gym-project-web-network
npm install -g prisma
prisma generate
docker compose up --build
```

4. Start the development server:

```sh
npm run start:dev
```

## Build

To build the project for production:
```sh
npm run build
```

# Tests

To run the tests:
```sh
npm run test
```

To run the tests in watch mode:
```sh
npm run test:watch
```

To run the tests with coverage:
```sh
npm run test:coverage
```

To run the tests with a UI:
```sh
npm run test:ui
```