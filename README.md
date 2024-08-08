Here's the complemented README with the corrected link fragments:

---

# GymSystem

GymSystem is a "Site as a Service" (SaaS) platform designed specifically for gyms and fitness centers. It provides a comprehensive solution to manage members, schedule classes, handle payments, and communicate with members effectively.

![GymSystem Logo](https://imgur.com/a/0b3X17d)

## Table of Contents

1. 💪 [Features](#features)
2. 🛠 [Technologies](#technologies)
3. 🔨 [Getting Started](#getting-started)
4. 🚀 [Build](#build)
5. 💯 [Tests](#tests)
6. 🐙 [License](#license)

## Features

### Class and Reservation Scheduling

Seamlessly schedule classes, manage bookings, and provide members with an easy-to-use reservation system.

### Payment System Integration

Integrate with popular payment gateways to handle membership fees, class payments, and other transactions securely and efficiently.

### Communication with Members

Communicate with members through notifications, newsletters, and messaging to keep them engaged and informed about gym activities and updates.

## Technologies

GymSystem is built using the following technologies:

### Backend Technologies

- **Node.js 20.15.1**
- **Fastify**
- **Prisma**
- **PostgreSQL**

### Frontend Technologies

- **Next.js 14** with Server Components and Server Actions

### 🛡 Role-Based Access Control (RBAC)

GymSystem implements a Role-Based Access Control (RBAC) model to manage permissions and access within the system. This ensures that users have access only to the functionalities necessary for their specific roles, enhancing both security and operational efficiency.

#### Roles and Permissions

1. **Admin**
   - Full access to all system functionalities.
   - Can manage users, classes, schedules, payments, and system settings.

2. **Manager**
   - Can manage classes, schedules, and memberships.
   - Can view financial reports and manage payments.
   - Cannot manage system settings or other users' roles.

3. **Instructor**
   - Can view and update their own class schedules.
   - Can manage the attendance of members in their classes.
   - Cannot access financial reports or manage memberships and payments.

4. **Member**
   - Can view and update their personal profile.
   - Can book and cancel class reservations.
   - Cannot manage classes, view financial reports, or access other members' information.

### 🔒 Attribute-Based Access Control (ABAC)

GymSystem implements an Attribute-Based Access Control (ABAC) model to provide fine-grained access control based on user attributes, resource attributes, and environmental conditions. This enhances security by ensuring that access decisions are made based on detailed policies and contextual information.

#### Attributes and Policies

1. **User Attributes**
   - Role (e.g., Admin, Manager, Instructor, Member)
   - Department (e.g., Fitness, Administration)
   - Membership Level (e.g., Basic, Premium)
   - Certification (e.g., Certified Trainer)

2. **Resource Attributes**
   - Resource Type (e.g., Class, Schedule, Payment)
   - Sensitivity Level (e.g., Public, Confidential)

3. **Environmental Attributes**
   - Time (e.g., Business Hours, After Hours)
   - Location (e.g., On-Site, Remote Access)
   - Device (e.g., Trusted Device, Untrusted Device)

## Getting Started

```bash
docker network create gym-project-web-network
```

```bash
npm install -g prisma
```

```bash
prisma generate
```

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# App

GymPass style app.

## RFS (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-ins em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio‌)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 chech-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
