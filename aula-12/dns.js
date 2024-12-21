const dns = require("node:dns"); // Domain Name System

// --> Traduz nomes de domínio em endereços de IP

const urlSearch = "google.com";
dns.resolve4(urlSearch, (err, addresses) => {
  if (err) {
    console.log("URL não encontrada");
    return;
  }
  console.log(addresses);
});

// Função resolve4 -> Recebe dois parâmetros, err e callback:
/* 
err: um erro durante a execução
callback: (addresses) lista de endereços IP resultantes
*/

// Podemos fazer de forma assíncrona

async function bootstrap() {
  // Fluxo linear, sem necessidade de callbacks
  const adresses = await dns.promises.resolve4(urlSearch);
  console.log(adresses);
}

bootstrap();
