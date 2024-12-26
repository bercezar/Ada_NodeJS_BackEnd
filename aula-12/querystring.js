const querystring = require("node:querystring");

const Baseurl = "https://decolar.com.br";

const uri = querystring.stringify({
  destino: "Rio de Janeiro",
  temporada: "Carnaval",
});

const urlFinal = `${Baseurl}/${uri}`;
console.log(urlFinal);

// Agrupamentos de dados para buscas URL
