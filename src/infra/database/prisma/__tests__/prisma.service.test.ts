import { PrismaService } from "../prisma.service";

describe("PrismaService", () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();

    // Mock dos métodos da própria PrismaService
    prismaService.$connect = jest.fn().mockResolvedValue(undefined);
    prismaService.$disconnect = jest.fn().mockResolvedValue(undefined);
    prismaService.$executeRawUnsafe = jest.fn().mockResolvedValue(undefined);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it("should connect to the database", async () => {
    await prismaService.connect();
    expect(prismaService.$connect).toHaveBeenCalled();
  });

  it("should disconnect from the database", async () => {
    await prismaService.disconnect();
    expect(prismaService.$disconnect).toHaveBeenCalled();
  });

  it("should drop schema", async () => {
    const schemaName = "test_schema";
    await prismaService.dropSchema(schemaName);
    expect(prismaService.$executeRawUnsafe).toHaveBeenCalledWith(
      `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`,
    );
  });
});
