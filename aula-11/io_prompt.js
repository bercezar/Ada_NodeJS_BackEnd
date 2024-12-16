const rl = require("readline");
// Criando uma interface

const prompt = rl.createInterface(
  // Para entrada de dados
  {
    input: process.stdin,
    output: process.stdout,
  }
);

// Método 'question': (query: string, callback: (answer: string))

prompt.question("Qual o seu nome? ", (resposta) => {
  console.log(`O seu nome é ${resposta}`);
  prompt.question("Qual a sua idade? ", (resposta) => {
    console.log(`A sua idade é ${parseInt(resposta)}`);
    prompt.close(); //Deve-se fechar o prompt
  });
});

/*

  Obervação!!
  Ao inserir múltiplos prompts, apenas o primeiro será executado se estiverem separados. O correto é aninhá-los, ou seja, colocar um prompt dentro do outro para garantir que sejam iniciados na ordem desejada

  prompt.question("Qual a sua idade? ", (resposta) => {
  console.log(`A sua idade é ${parseInt(resposta)}`);
  prompt.close();
});

*/

// Para tornar mais dinâmico, com sincronismo e funcionalidade, podemos realizar uma sobrescrita do método 'question'. Criando uma nova Promise()

const promptPromise = {
  question: (pergunta) =>
    new Promise((resolve, reject) => {
      try {
        prompt.question(pergunta, (resposta) => resolve(resposta));
      } catch (error) {
        reject(error);
      }
    }),
  close: () => prompt.close(),
};

async function askUser() {
  const nome = await promptPromise.question("Qual o seu nome? ");
  console.log(`O seu nome é ${nome}`);

  const idade = await promptPromise.question("Qual a sua idade? ");
  console.log(`A sua idade é ${idade}`);

  promptPromise.close();
}

askUser();
