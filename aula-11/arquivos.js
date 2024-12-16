const path = require("node:path");
const fs = require("node:fs");

const filePath = path.join(process.cwd(), "aula-11", "texto.txt");
console.log(filePath);

const fileOutPath = path.join(process.cwd(), "aula-11", "textoReMap.txt");

// Leitura de arquivo
fs.readFile(filePath, {}, (err, data) => {
  if (err) {
    console.log(`Erro na leitura do arquivo de caminho ${filePath}`);
    return;
  }

  const texto = data.toString();
  const linhas = texto.split("\n");

  linhas.forEach((linha, index) => console.log(`${index + 1} - ${linha}`));

  const linhasReMap = linhas.map((linha, index) => `${index + 1} - ${linha}`);

  // Escrita de arqivo
  fs.writeFile(fileOutPath, linhasReMap.join("\n"), {}, (erro) => {
    if (err) {
      console.log(`Erro na escrita do arquivo de caminho ${filePath}`);
      return;
    }
  });
});
