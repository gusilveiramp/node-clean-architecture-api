import request from "supertest";
import { HttpModule } from "../../../infra/http/http.module";
import { redisClient } from "../../../infra/config/redis.config";
import { QueueModule } from "../../../infra/queue/queue.module";

const app = HttpModule.getAppInstance();

describe("UserController E2E", () => {
  let createdUserId: number;

  afterAll(async () => {
    await QueueModule.shutdown();
    await redisClient.quit();
  });

  it("should create a user (POST /users)", async () => {
    const response = await request(app).post("/users").send({
      name: "Gustavo",
      email: "gustavo@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Gustavo");
    expect(response.body.email).toBe("gustavo@example.com");

    createdUserId = response.body.id;
  });

  it("should return all users (GET /users)", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("users");
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.total).toBeGreaterThanOrEqual(1);
  });

  it("should update a user (PUT /users/:user_id)", async () => {
    const response = await request(app).put(`/users/${createdUserId}`).send({
      name: "Gustavo Updated",
      email: "updated@example.com",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Gustavo Updated");
    expect(response.body.email).toBe("updated@example.com");
  });

  it("should return 400 for invalid body (POST /users)", async () => {
    const response = await request(app).post("/users").send({
      name: 123, // nome como número (inválido)
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("should return 404 when updating non-existent user (PUT /users/:user_id)", async () => {
    const response = await request(app).put("/users/99999").send({
      name: "Nonexistent",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("Nenhum usuário encontrado");
  });
});
