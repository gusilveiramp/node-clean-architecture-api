# Node Clean Architecture API

A clean and scalable Node.js API template built with TypeScript, Express, and Prisma, following **Clean Architecture** and **SOLID** principles.

Designed as a production-ready starter for modern backend applications with modularity, testability, and infrastructure independence.

---

## ✨ Features

- ✅ TypeScript + Express setup
- ✅ Modular folder structure following **Clean Architecture**
- ✅ Prisma ORM with PostgreSQL support
- ✅ Zod for schema validation and runtime type safety
- ✅ Centralized error handling with **Error Adapters**
- ✅ Background job processing with **BullMQ + Redis** (Queue Workers module)
- ✅ HTTP transport layer abstraction with support for future adapters (Express, Fastify, etc)
- ✅ Built-in internationalization (**i18n**) with request-scoped language detection
- ✅ Jest for unit and E2E testing
- ✅ ESLint + Prettier for linting and formatting
- ✅ Husky for Git hooks (pre-commit checks)
- ✅ Ready for CI/CD, production scaling, and infrastructure swap (ORM, Queue, HTTP layer, etc.)

---

## 📂 Project Structure

```bash

## 📂 Project Structure

├── .env                                  # Project environment variables
├── .env.example                          # Example environment variables for setup reference
├── .gitignore
├── client.http                           # HTTP client requests for testing APIs (e.g., REST Client in VSCode)
├── commitlint.config.ts                  # Commit lint rules
├── docker-compose.yml                    # Docker services (Postgres, etc.)
├── eslint.config.mjs                     # ESLint configuration
├── package.json
├── package-lock.json
├── README.md                             # Yep, that's me
├── tsconfig.json
│
📁 prisma/                                 # Prisma migrations and schema
│
📁 src/
├── app.module.ts                         # Application bootstrapper (loads all infra and modules)
│
├── 📁 modules/                            # Domain layer (business logic and use cases)
│   └── 📁 users/
│       ├── dtos/                          # Zod DTOs for input validation (request body, params, etc.)
│       ├── entities/                      # Domain entities (pure business models)
│       ├── repositories/                  # Repository interfaces (contracts, no implementation here)
│       ├── use-cases/                     # Application use cases (e.g., create, update, list users)
│       └── user.controller.ts             # HTTP controller for user-related endpoints
│
├── 📁 infra/                              # Infrastructure layer: database, HTTP server, configs, testing setup
│   ├── 📁 config/
│   │   └── env.ts                         # Parses and validates .env variables using Zod
│   │
│   ├── 📁 database/
│   │   ├── database.interface.ts          # DB abstraction interface
│   │   ├── database.module.ts             # Binds repository implementations and Prisma service
│   │   └── 📁 prisma/
│   │       ├── prisma.service.ts          # Prisma client instance and connection management
│   │       ├── 📁 mappers/                # Converts Prisma models to domain entities
│   │       │   └── user.mapper.ts
│   │       └── 📁 repositories/           # Prisma-specific repository implementations
│   │           └── user.repository.ts
│   │
│   ├── 📁 http/
│   │   ├── http.interface.ts              # HTTP interface definitions (Request, Response types, etc.)
│   │   ├── http.module.ts                 # Exposes HTTP-layer dependencies (Express, routers, etc.)
│   │   ├── 📁 express/
│   │   │   ├── express.service.ts         # Express app setup and server start
│   │   │   ├── 📁 adapters/
│   │   │   │   └── express-router.adapter.ts   # Express-specific HTTP adapter (HttpRouter implementation)
│   │   │   └── 📁 middlewares/            # Express middlewares
│   │   │       ├── global-error.middleware.ts     # Centralized error handler
│   │   │       ├── request-context.middleware.ts  # Initializes AsyncLocalStorage context
│   │   │       └── route-not-found.middleware.ts  # Handles unknown routes (404)
│   │   │
│   │   └── 📁 routes/
│   │       ├── healthcheck.routes.ts      # Infra-specific routes like healthcheck, status, etc.
│   │       └── users.routes.ts             # User module routes
│   │
│   ├── 📁 queues/
│   │   ├── queue.interface.ts             # Queue abstraction interface (decouples infrastructure from business logic)
│   │   ├── queue.module.ts                # Queue lifecycle manager (init/shutdown for workers)
│   │   ├── queue.bootstrap.ts             # Standalone bootstrapper to run queue workers as a separate process
│   │   └── 📁 bullmq/
│   │       ├── bullmq-queue.service.ts    # BullMQ implementation of the Queue interface
│   │       └── 📁 workers/                # Queue workers (e.g., email, file processing)
│   │           └── email.worker.ts
│   │
│   └── 📁 testing/                        # Testing infrastructure (Jest configs, E2E setup)
│       ├── jest.config.ts
│       ├── jest.e2e.config.ts
│       ├── setup.ts                       # Unit and Integration test setup
│       └── setup.e2e.ts                   # E2E test setup (test DB cleanups, migrations, etc.)
│
├── 📁 common/                             # Cross-cutting concerns and shared utilities
│   ├── 📁 context/
│   │   └── request-context.ts             # Per-request context (locale, requestId, etc.) using AsyncLocalStorage
│   │
│   ├── 📁 errors/
│   │   ├── adapters/                      # Error adapters (Prisma, Zod, body-parser, etc.)
│   │   │   ├── body-parser-error-adapter.ts
│   │   │   ├── prisma-error-adapter.ts
│   │   │   └── zod-error-adapter.ts
│   │   ├── custom-error.ts                # Custom error class for manual error throws
│   │   ├── error-adapter.interface.ts     # Adapter interface for error adapters
│   │   ├── error-response.ts              # Standardizes error response shape
│   │   └── types.ts                       # Error-related types
│   │
│   ├── 📁 i18n/                           # Internationalization (i18n) system for multi-language support
│   │   ├── en-US.ts                      # English translations
│   │   ├── pt-BR.ts                      # Brazilian Portuguese translations
│   │   ├── index.ts                      # Language selector and i18n helpers
│   │   └── types.ts                      # i18n message type contracts
│   │
│   └── 📁 utils/
│       └── validate-request.ts            # Utility for validating request body and params together using Zod


```

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/gusilveiramp/node-clean-architecture-api.git
cd node-clean-architecture-api
npm install
```

### 2. Set up the environment

```bash
cp .env.example .env
# Then edit your `.env` file as needed
```

### 3. Run in development mode

```bash
npm run dev
```

### 4. Run tests

```bash
npm test              # Run unit and integration tests
npm run test:e2e      # Run end-to-end tests
npm run test:watch    # Watch mode
npm run test:cov      # Generate test coverage report
```

> The E2E tests use a separate Jest config and a dedicated Postgres schema for isolation.

After running the coverage command, you can open the report locally by opening this file in your browser:

```
./coverage/lcov-report/index.html
```

### 5. Run lint and format

```bash
npm run lint
```

> Husky will also run automatically on pre-commit.

---

## 🐳 Running with Docker (Optional)

If you prefer, you can run the project inside Docker.

```bash
docker compose up -d
```

After that:

```bash
npx prisma migrate deploy
```

Access your API on:

`API: http://localhost:3333`

---

## 📐 Architectural Decisions & Rationale

This project follows **Clean Architecture** and **SOLID** principles. Below are key design decisions and the reasoning behind them.

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

### Queue Workers (Background Processing)

- **Why?**  
  To offload time-consuming or non-blocking tasks (like sending emails, processing files, etc.) to background workers, avoiding performance impacts on HTTP requests.

- **How?**  
  The system uses **BullMQ + Redis** for queue management and background job processing.

- **Where?**  
  All queue-related infrastructure lives inside `/src/infra/queues/`.  
  The **`queue.interface.ts`** defines a generic queue contract to decouple the business logic from the infrastructure.  
  The **BullMQ-specific implementation** lives inside `/bullmq/`.  
  Each queue worker is defined as a separate file inside `/bullmq/workers/`.

- **Execution Flow:**  
  The queue system runs in a **separate Node.js process**, fully independent from the HTTP server.  
  This is handled via a standalone bootstrapper:  
  **`queue.bootstrap.ts` → started via the script `npm run dev:worker`**

- **Benefits:**  
  ✅ Full decoupling between API and background workers  
  ✅ Scalable: You can run multiple worker instances without affecting the API  
  ✅ Pluggable: Easily replace BullMQ with Kafka, RabbitMQ, or any other queue system in the future

---

### HTTP Layer and Router Abstraction

- **Why?**  
  To allow the project to switch from Express to Fastify (or any other framework) in the future with minimal changes.

- **How?**  
  The project defines a generic `HttpRouter` interface in `/infra/http/http.interface.ts`.  
  The **Express-specific implementation** lives inside `/infra/http/express/adapters/express-router.adapter.ts`.

  Business modules and route files **never import Express types directly**.  
  Instead, they rely on the generic `HttpRouter` and `HttpHandler` types, which are exposed centrally from the `HttpModule`.

- **Where do routes live?**  
  All route registration functions (like `registerUserRoutes`, `registerHealthCheckRoutes`) live inside `/infra/http/routes/`.  
  Each module has its own route registration file (e.g., `user.routes.ts`, `payment.routes.ts`, etc).

- **How are routes registered?**  
  Inside the `ExpressService`, each route registration function is called manually, using the current HTTP adapter.

- **Benefits:**  
  ✅ HTTP framework agnostic (easily swap Express for Fastify or others)  
  ✅ Centralized router management  
  ✅ Consistent pattern for all modules  
  ✅ Clean separation between transport layer and business logic

---

### Composition Root Pattern (Module-Level Dependency Wiring)

- **Why?**  
  To centralize dependency composition for each module, making the system highly decoupled, testable, and infrastructure-agnostic.

- **How?**  
  Each module (like `UserModule`, `PaymentModule`, etc) has a static method (typically called `getXController()`) that wires all necessary dependencies (repositories, queue services, etc) and returns a fully constructed Controller.

- **Where?**  
  Inside each module folder, as a `user.module.ts`, `payment.module.ts`, etc.

- **Example flow for Users:**

| Layer             | Responsibility                                                         |
| ----------------- | ---------------------------------------------------------------------- |
| `DatabaseModule`  | Exposes repositories (ex: `userRepository`)                            |
| `QueueModule`     | Exposes the Queue service                                              |
| `UserModule`      | Wires repositories and services into UseCases                          |
| `UserController`  | Gets all UseCases already injected and ready                           |
| `users.routes.ts` | Simply imports the Controller from `UserModule` and binds it to routes |

- **Benefits:**  
  ✅ Full inversion of control at module level  
  ✅ Clear module composition boundaries  
  ✅ No direct infrastructure imports inside controllers or use cases  
  ✅ Simplifies future DI Container migration if needed  
  ✅ Extremely testable (easy to inject mocks in unit tests)

- **UserModule Example:**

```typescript
export class UserModule {
  static getUserController(): UserController {
    const userRepository = DatabaseModule.userRepository;
    const queueService = QueueModule.queueService;

    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      queueService
    );
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

    return new UserController(
      createUserUseCase,
      updateUserUseCase,
      findAllUsersUseCase
    );
  }
}
```

---

### Internationalization (i18n)

This API supports **multi-language error messages**, making it ready for international projects or apps that serve users from different regions.

- **Why?**  
  To provide error messages and system responses in the client's preferred language.

- **How?**  
  The app reads the `Accept-Language` header from each request and loads the correct translation file (e.g., `pt-BR`, `en-US`) using a request-scoped context.

- **Where?**  
  Translations live inside `/src/common/i18n/`.

- **Benefits:**  
  ✅ Customizable multilingual error messages  
  ✅ Fully translatable API responses (e.g., validation errors, system errors, database errors)  
  ✅ Centralized message management

---

### Summary

This architecture ensures that:

✅ Business logic remains independent from frameworks and infrastructure  
✅ Infrastructure can evolve without affecting core business processes  
✅ Error handling is centralized, predictable, and easily extensible  
✅ The project remains maintainable, testable, and scalable over time

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
