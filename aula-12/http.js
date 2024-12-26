const http = require("node:http");

const sports = ["soccer", "car racing", "basketball", "tennis"];
const server = http.createServer(async (request, response) => {
  // http.IncomingMessage, http.ServerResponse -> argumentos request e response
  const { method, statusCode, url } = request;

  request.headers.accept = "*";
  request.headers.allow = "*";

  const bodyPromise = new Promise((resolve, reject) => {
    // resolve -> ok
    // rejec -> error
    let body;

    request.on("data", (data) => {
      body = JSON.parse(data);
    });
    request.on("end", (data) => {
      resolve(body); // resultado da Promise
    });
  });

  try {
    if (url === "/") {
      response.write(
        "<div><h1>Hello World!</h1><p>http server on port 3000</p></div>"
      );
    } else if (url === "/api/sports") {
      if (method === "GET") {
        response.write(JSON.stringify(sports));
      }

      if (method === "POST") {
        const body = await bodyPromise;
        const { name } = body;
        if (
          !sports
            .map((sport) => sport.toLowerCase())
            .includes(name.toLowerCase())
        )
          sports.push(name.toLowerCase());
        response.write(name.toLowerCase());
      }
    } else {
      response.statusCode = 404;
      response.write(`<div><h1>Página não encontrada</h1></div>`);
    }
  } finally {
    response.end();
    return;
  }
});

server.listen(3000, "localhost", () => {
  console.log("Servidor rodando: porta http://localhost:3000");
});
