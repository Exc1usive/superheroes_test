const request = require("supertest");
const mongoose = require("mongoose");

const Superhero = require("./models/superhero.js");
const server = require("./server.js");

const api = request(server.server);

beforeAll(async () => {
  let testSuperhero = new Superhero({
    nickname: "GET_ONE_TEST",
    real_name: "real_name",
    origin_description: "origin_description",
    superpowers: "superpowers",
    catch_phrase: "catch_phrase",
  });
  await testSuperhero.save();
});

describe("Unit test", () => {
  test("GET all", async () => {
    await api
      .get("/api/superheroes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("GET one", async () => {
    const superheroes = await Superhero.find({});

    const lastSuperhero = superheroes[superheroes.length - 1].toJSON();

    const resSuperhero = await api
      .get(`/api/superheroes/${lastSuperhero._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(JSON.stringify(resSuperhero.body._id)).toEqual(`\"${lastSuperhero._id}\"`);
  });

  test("All superheroes have id", async () => {
    const items = await api.get("/api/superheroes");

    for (let item of items.body) {
      expect(item._id).toBeDefined();
    }
  });
});

afterAll(async () => {
  Superhero.findOneAndDelete({ nickname: "GET_ONE_TEST" }, () => null);
  mongoose.connection.close();
  server.server.close();
});
