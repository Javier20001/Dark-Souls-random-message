const request = require("supertest");
const app = require("../index");

describe("Dark Souls Messages API", () => {
  it("should return a random message", async () => {
    const response = await request(app).get("/messages");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toBe("string");
  });

  it("should return 'okey' for /test endpoint", async () => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("okey");
  });

  it("should confirm server is running on / endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      "Servidor de mensajes de Dark Souls está en funcionamiento!"
    );
  });

  it("should handle server errors gracefully", async () => {
    jest.spyOn(global.Math, "random").mockReturnValueOnce(1); // Simula un error
    const response = await request(app).get("/messages");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error del servidor");
    global.Math.random.mockRestore();
  });
});
