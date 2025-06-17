# AI Video API

A clean and scalable Node.js API template built with TypeScript, Express, and Prisma, following Clean Architecture and SOLID principles.  
Designed to serve as a solid foundation for modern back-end applications with proper structure, testing, linting, and formatting tools out of the box.

## Features

- TypeScript + Express setup
- Clean Architecture with modular structure
- Prisma ORM with PostgreSQL support
- Zod for data validation
- Jest for unit testing
- ESLint + Prettier integrated
- Husky for Git hooks
- Scripts for dev, build, test, and lint
- Ready for CI/CD and scalable for production

## Project Structure (Clean Architecture)

```bash
├── jest.config.ts
├── jest.e2e.config.ts
│
📁 src/
├── app.module.ts                         # Entry point of the application. Responsible for initializing services and dependencies.
│
├── 📁 modules/                           # Domain layer, organized by business features (e.g., users, payments).
│   ├── user.controller.ts                # HTTP controller for the "users" module.
│   ├── 📁 users/                          # Submodule containing user-specific business logic.
│   ├── 📁 dtos/                           # Data Transfer Objects — define input/output data structures.
│   ├── 📁 entities/                       # Core business entities (e.g., UserEntity).
│   ├── 📁 use-cases/                      # Application use cases (e.g., create user).
│   └── 📁 repositories/                   # Interfaces (abstractions) for data access. They don’t know the implementation.
│
├── 📁 infra/                             # Infrastructure layer: database, HTTP, queues, etc.
│   ├── 📁 testing/
│   │   └── setup-e2e.ts
│   │
│   ├── 📁 config/                         # Application configs (e.g., env, cache, global constants).
│   │   └── env.ts                         # Parses and validates environment variables using Zod.
│   │
│   ├── 📁 database/                       # Data persistence logic (ORMs, raw SQL, etc).
│   │   ├── database.interface.ts          # Optional interface for DB service abstraction.
│   │   ├── database.module.ts             # Initializes the database (connect, shutdown, bind repositories).
│   │   └── 📁 prisma/                     # Prisma ORM implementation.
│   │       ├── prisma.service.ts          # Encapsulates PrismaClient (connection, migrations, etc).
│   │       ├── 📁 mappers/                # Converts between domain entities and Prisma models.
│   │       │   └── user.mapper.ts         # Mapper for the User entity.
│   │       └── 📁 repositories/           # Concrete repository implementations using Prisma.
│   │           └── user.repository.ts     # User repository with Prisma logic.
│   │
│   └── 📁 http/                           # Transport layer (in this case, HTTP via Express).
│       ├── http.module.ts                 # Exports HTTP types and services used in the app.
│       └── 📁 express/                    # Express.js implementation.
│           ├── express.service.ts         # Configures and starts the Express server.
│           ├── routes.ts                  # Defines and registers API routes.
│           └── 📁 middlewares/            # Express middlewares (auth, error handling, context, etc).
│               ├── global-error.middleware.ts     # Global error handler middleware.
│               ├── request-context.middleware.ts  # Sets request-level context (via AsyncLocalStorage).
│               └── route-not-found.middleware.ts  # Returns custom error for unknown routes.
│
└── 📁 common/                             # Reusable code shared across the app.
    ├── 📁 context/                        # Request-level execution context (e.g., locale, requestId).
    ├── 📁 errors/                         # Error handlers and adapters (e.g., Prisma, validation).
    └── 📁 utils/                          # Generic utility functions and helpers.

```

## Getting Started

### 1. Clone and install dependencies

git clone https://github.com/seu-usuario/ai-video-api.git  
cd ai-video-api  
npm install

### 2. Set up the environment

cp .env.example .env

# Edit the `.env` file with your own environment variables

### 3. Initialize Husky (if not already activated)

npm run prepare

### 4. Start development server

npm run dev

### 5. Run tests

npm test # runs all tests  
npm run test:watch  
npm run test:cov # coverage

[Open Coverage Report](http://localhost:5500/coverage/lcov-report/index.html)

### 6. Run lint and format

npm run lint

> Husky will also run automatically on pre-commit.

## Tools & Libraries

- Language: TypeScript
- Framework: Express
- ORM: Prisma
- Validation: Zod
- Linting: ESLint + Prettier
- Testing: Jest + ts-jest
- Git Hooks: Husky
- Dev runner: TSX

## 📐 Architectural Decisions & Rationale

This project follows **Clean Architecture** and **SOLID** principles. Below are key design decisions and the reasoning behind them.

---

### Error Handling (Error Adapters)

- **Why?**  
  To decouple infrastructure-specific errors (like Prisma, Sequelize, etc.) from the API’s public error contract.

- **How?**  
  Each external error source (ORMs, validation libraries, external services) has its own **Error Adapter**, implementing a common interface with two methods:

| Method        | Responsibility                                                     |
| ------------- | ------------------------------------------------------------------ |
| `canHandle()` | Determines if the adapter can handle a given error type            |
| `handle()`    | Transforms the original error into the API’s standard error format |

- **Benefits:**  
  ✅ Centralized and predictable error handling  
  ✅ Easily extendable (e.g., adding a new SequelizeErrorAdapter in the future)  
  ✅ The global error middleware remains untouched even as new adapters are added

---

### Folder Structure (Clean Architecture Layers)

- **Why?**  
  To enforce strict separation between application layers and responsibilities.

| Folder     | Responsibility                                                        |
| ---------- | --------------------------------------------------------------------- |
| `modules/` | Business logic: entities, use cases, repository interfaces, DTOs      |
| `infra/`   | Infrastructure: database, HTTP server, external services              |
| `common/`  | Cross-cutting concerns: error handling, context management, utilities |

- **Benefits:**  
  ✅ Infrastructure can evolve or be replaced (e.g., switch from Prisma to Sequelize) without impacting the business logic  
  ✅ Clear boundaries improve testability and scalability

---

### Repositories and Adapters (Database Abstraction)

- **Why?**  
  To abstract data access and **avoid tight coupling to any specific ORM or database technology**.

- **How?**  
  Business logic depends only on repository interfaces (inside `modules/`).  
  Concrete implementations (like `PrismaUserRepository`) live inside `infra/database/`.

- **Benefits:**  
  ✅ Swapping database providers (e.g., from Prisma to Sequelize or raw SQL) requires only creating a new repository implementation  
  ✅ No changes needed in the business logic or use cases

---

### Request Context (Per-Request Scoped Data)

- **Why?**  
  To provide **request-scoped context** (like `Accept-Language` for internationalization) throughout the application **without manually passing it between layers**.

- **How?**  
  Using **AsyncLocalStorage**, a context is created for each incoming HTTP request.  
  Any part of the app (use cases, error adapters, services) can access the context at runtime.

- **Benefits:**  
  ✅ Clean and uncluttered function signatures  
  ✅ No need to pass request metadata manually through every layer

---

### DTO Validation with Zod

- **Why?**  
  To ensure incoming HTTP request data adheres to the expected structure and data types.

- **How?**  
  Each DTO uses **Zod schemas** for validation.  
  If validation fails, a **ZodErrorAdapter** converts the error into the standard API error response format.

- **Benefits:**  
  ✅ Automatic input validation at the controller layer  
  ✅ Consistent, translatable error messages

---

### Global Error Middleware

- **Why?**  
  To have a single, centralized place responsible for handling all unhandled errors from any part of the application.

- **How?**  
  The middleware iterates through all registered ErrorAdapters.  
  The first adapter that returns `canHandle() === true` will process the error and return a standardized API error response.

- **Benefits:**  
  ✅ Predictable error output for API consumers  
  ✅ No risk of leaking stack traces or internal error details  
  ✅ Ready for extension as the system grows

---

### Summary

This architecture ensures that:

✅ Business logic remains independent from frameworks and infrastructure  
✅ Infrastructure can evolve without affecting core business processes  
✅ Error handling is centralized, predictable, and easily extensible  
✅ The project remains maintainable, testable, and scalable over time

## How I created this template (step by step)

This README also serves as my own guide to replicate this setup in the future.

### Steps:

1. Initialize project:
   npm init -y

2. Install TypeScript and create tsconfig.json:
   npm install -D typescript @types/node  
   npx tsc --init

3. Install TSX for development:
   npm install -D tsx

4. Configure ESLint + Prettier:
   npm install -D eslint prettier eslint-plugin-prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser

5. Create eslint.config.mjs and integrate with Prettier

6. Set up Husky:
   npm install -D husky
   npx husky init
   npm run prepare

7. Edit .husky/pre-commit to run your checks:
   npm run pre-commit-check

8. Install Jest + ts-jest + @types/jest:
   npm install -D jest ts-jest @types/jest  
   npx ts-jest config:init

9. Install Prisma + Zod:
   npm install @prisma/client zod  
   npm install -D prisma

10. Create the basic folder structure: modules/, infra/, common/, and **tests**/

## 📦 Commit Types (Conventional Commits)

| Type       | When to use                                                             | Example                                                      |
| ---------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| `feat`     | When you **add a new feature**                                          | `feat: add user creation endpoint`                           |
| `fix`      | When you **fix a bug**                                                  | `fix: fix unique email constraint issue on user creation`    |
| `chore`    | For **non-business logic tasks** (e.g., configs, dependencies, tooling) | `chore: update Prisma dependencies`                          |
| `refactor` | When you **refactor code** without changing its external behavior       | `refactor: extract validation logic into a helper`           |
| `test`     | When you **add or update tests**                                        | `test: add unit test for CreateUserUseCase`                  |
| `style`    | For **style-only changes** (formatting, spaces, indentation, etc.)      | `style: fix indentation in express.service.ts`               |
| `docs`     | When you **add or update documentation**                                | `docs: update folder structure in README`                    |
| `ci`       | For **CI/CD-related changes** (e.g., workflows, pipelines, husky)       | `ci: add GitHub Actions workflow for deployment`             |
| `perf`     | When you **improve performance**                                        | `perf: improve user query performance by adding email index` |
| `revert`   | When you **revert a previous commit**                                   | `revert: feat: add JWT authentication middleware`            |

## Author

Created by **Gustavo Silveira** <br/>
[LinkedIn](https://www.linkedin.com/in/gustavo-silveira-06601b57/)

---
