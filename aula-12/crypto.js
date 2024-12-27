const crypto = require("node:crypto");

const key = crypto.randomBytes(8).toString("hex"); //Geração de bytes aleatórios
console.log(key); //2 caracteres por byte, pois cada byte é representado por dois dígitos hexadecimais

const uuid = crypto.randomUUID(); //Identificador único global no formato padrão UUID v4
console.log(uuid);

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
}); // A chave privada é usada para descriptografar mensagens criptografadas com a chave pública
// A chave pública é usada para criptografar mensagens que apenas a chave privada pode descriptografar

console.log(privateKey, publicKey);

// Explicação didática feita pelo chatGPT para melhor entendimentos de criptografias privadas e públicas
/* 
Exemplo de Fluxo de Funcionalidade
1. Criptografia de Dados (Comunicação Segura)
Cenário: Imagine um cliente enviando informações sensíveis (como um número de cartão de crédito) para um servidor.

Funcionamento:

O servidor possui um par de chaves: pública e privada.
O cliente obtém a chave pública do servidor (geralmente enviada com segurança ou publicada).
O cliente:
Usa a chave pública do servidor para criptografar os dados.
Envia os dados criptografados para o servidor.
O servidor:
Usa sua chave privada para descriptografar os dados recebidos.
Vantagem: A chave pública pode ser compartilhada sem comprometer a segurança, porque apenas a chave privada correspondente pode descriptografar os dados.
*/
