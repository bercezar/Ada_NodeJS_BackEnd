import express from "express";
import { config } from "dotenv";
import path from "path";
import { readFileSync, writeFile, writeFileSync } from "fs";
import { randomUUID } from "crypto";
import dbJson from "./server.json";

config();

type User = {
  id: string;
  name: string;
  age: number;
};
type CreateUserDTO = Omit<User, "id">;

const url = process.env.API_BASE_URL ?? "http://localhost";
const port = process.env.API_PORT ?? 3300;
const app = express();
app.use("/client", express.static(path.join(__dirname, "public")));
// Enviando o home.html para o servidor e exibi-lo

const dbJsonPath = path.resolve(process.cwd(), "server.json");
const users: User[] = dbJson.users;

app.get("/api", (request, response) => {
  response.status(200).send("<h1>API Base URL</h1>");
});

app.get("/api/users", (request, response) => {
  response.json(users);
});

app.post("/api/users", async (request, response) => {
  const { name, age }: CreateUserDTO = request.body;

  if (!name || (age && Number(age) < 0)) {
    throw new Error("O usuário a ser criado precisa de nome e idade");
  }
  const user = { id: randomUUID(), name, age };
  users.push(user);

  writeFileSync(dbJsonPath, JSON.stringify({ users }));

  response.status(201).json(user);
});

app.delete("/api/users/:id", async (request, response) => {
  const { id } = request.params;
  if (!id) {
    throw new Error("O usuário a ser deletado precisa de um id");
  }

  const updatedUsers = users.filter((user) => user.id !== id);
  writeFileSync(
    dbJsonPath,
    JSON.stringify({ ...dbJson, users: updatedUsers }, null, 2)
  );

  response.status(404).json();
});

app.listen(port, () => {
  console.log(`Server running on ${url}:${port}`);
});
