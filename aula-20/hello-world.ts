import express from "express";
import { config } from "dotenv";
import path from "path";
import { readFileSync } from "fs";

config();

interface IUser {
  name: string;
  age: number;
}
const url = process.env.API_BASE_URL ?? "http://localhost";
const port = process.env.API_PORT ?? 3300;
const app = express();
app.use("/client", express.static(path.join(__dirname, "public")));
// Enviando o home.html para o servidor e exibi-lo

const users: IUser[] = [
  {
    name: "Fulano",
    age: 20,
  },
  {
    name: "Ciclano",
    age: 21,
  },
];

app.get("/", (request, response) => {
  const homePagePath = path.join(__dirname, "home.html");
  const homePage = readFileSync(homePagePath);

  response.send(homePage); // Mandando o arquivo html para baixar
});

app.get("/api/users", (request, response) => {
  response.json(users);
});

app.listen(port, () => {
  console.log(`Server running on ${url}:${port}`);
});
