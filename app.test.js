import request from "supertest";
import app from "./server";

// const axios = require('axios');
// jest.mock('axios');

describe("POST /api/login", () => {
  describe("given a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/login").send({
        username: "admin",
        password: "1234",
      });
      expect(response.statusCode).toBe(200);
    });
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/api/login").send({
        username: "admin",
        password: "1234",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
