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
- Husky + lint-staged for Git hooks
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

> Husky and lint-staged will also run automatically on pre-commit.

## Tools & Libraries

- Language: TypeScript
- Framework: Express
- ORM: Prisma
- Validation: Zod
- Linting: ESLint + Prettier
- Testing: Jest + ts-jest
- Git Hooks: Husky + lint-staged
- Dev runner: TSX

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

6. Set up Husky and lint-staged:
   npm install -D husky lint-staged  
   npx husky init  
   npm run prepare

7. Edit .husky/pre-commit:
   npx lint-staged

8. Configure lint-staged in package.json to run eslint --fix

9. Install Jest + ts-jest + @types/jest:
   npm install -D jest ts-jest @types/jest  
   npx ts-jest config:init

10. Install Prisma + Zod:
    npm install @prisma/client zod  
    npm install -D prisma

11. Create the basic folder structure: modules/, infra/, common/, and **tests**/

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
