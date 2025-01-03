export type Produto = {
  nome: string;
  valor: number;
};

/*
  class Estabelecimento {
    private endereco: string;
    private setor: string;
    private produtos: Produto[];
    constructor(endereco: string, setor: string, produtos: Produto[]) {
      this.endereco = endereco;
      this setor = setor;
      this.produtos = produtos;
    }
  }
  */

class EstabelecimentoBase {
  // Mais prático a criação da classe
  private _filaDeEspera = 10;

  constructor(
    public endereco: string,
    public setor: string,
    public produtos: Produto[],
    filaDeEspera?: number // Significa que pode ou não ser fornecido ao criar a instância
  ) {
    this.filaDeEspera = filaDeEspera ?? this._filaDeEspera;
  }

  get filaDeEspera() {
    return this._filaDeEspera;
  }

  set filaDeEspera(fila: number) {
    if (fila <= 0) return;
    this._filaDeEspera = fila;
  }

  retornaProdutos() {
    return this.produtos.map((produto) => produto.nome);
  }

  diminuirFilaDeEspera() {
    if (this._filaDeEspera === 0) return;

    this._filaDeEspera -= 1;
  }
}

// Criando um objeto pela classe Estabelecimento
const padaria2 = new EstabelecimentoBase(
  "Rua y do x, 199 - bloco P",
  "Alimentação",
  [
    { nome: "coca-cola", valor: 4.99 },
    { nome: "queijo", valor: 1.9 },
    { nome: "biscoito", valor: 5.5 },
    { nome: "suco", valor: 4.34 },
  ],
  14
);

const padaria3 = new EstabelecimentoBase(
  "Rua do Avião, 121",
  "Alimentação",
  []
);

// Criando de forma simples um objeto
const padaria = {
  endereco: "Rua x do y, 182 - bloco S",
  setor: "Alimentação",
  produtos: [
    { nome: "pão", valor: 2.99 },
    { nome: "café", valor: 3.9 },
    { nome: "leite", valor: 1.5 },
    { nome: "pão recheado", valor: 5.34 },
  ],
  retornaProdutos() {
    return this.produtos.map((produto) => produto.nome);
  }, // Usar desta forma por boas práticas

  //   listaProdutos: () => {
  //     return padaria.produtos.map((produto) => produto.nome);
  //   },
};

// console.log(padaria);
// console.log(padaria.retornaProdutos());
// console.log(padaria2);

// padaria2.diminuirFilaDeEspera();
// padaria2.diminuirFilaDeEspera();
// padaria2.diminuirFilaDeEspera();

// console.log(padaria);

console.log(padaria3);
console.log(padaria2);
