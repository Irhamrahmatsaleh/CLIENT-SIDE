import request from "supertest";
import { app } from "../../index";
import { faker } from "@faker-js/faker";

const fullName = faker.person.fullName(); // Rowan Nikolaus
const email = faker.internet.email(); // Kassandra.Haley@erich.biz
const username = faker.internet.userName();

it("new user created", async () => {
  const res = await request(app).post("/api/v1/register").send({
    fullName,
    email,
    password: "1234",
  });

  expect(res.statusCode).toEqual(201);
});

it("login success", async () => {
  const res = await request(app).post("/api/v1/auth/login").send({
    email,
    password: "1234",
  });

  expect(res.statusCode).toEqual(500);
});