import { Produto } from "../aula-14/01-classes";

interface EstabelecimentoInterface {
  endereco: string;
  setor: string;
  retornaProdutos: () => string[]; // Retorna um array
  diminuirFilaDeEspera: () => void;
}

class Estabelecimento implements EstabelecimentoInterface {
  protected _filaDeEspera = 10;

  constructor(
    public endereco: string,
    public setor: string,
    protected produtos: Produto[],
    filaDeEspera?: number
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

  public retornaProdutos() {
    return this.produtos.map((produto) => produto.nome);
  }

  diminuirFilaDeEspera() {
    if (this._filaDeEspera === 0) return;

    this._filaDeEspera -= 1;
  }
}

const supermercado = new Estabelecimento(
  "Rua y do x, 199 - bloco P",
  "Alimentação",
  [
    { nome: "coca-cola", valor: 4.99 },
    { nome: "queijo", valor: 1.9 },
    { nome: "biscoito", valor: 5.5 },
    { nome: "suco", valor: 4.34 },
  ],
  8
);

class Farmacia extends Estabelecimento implements EstabelecimentoInterface {
  constructor(
    public endereco: string,
    public setor: string,
    protected produtos: Produto[],
    filaDeEspera?: number
  ) {
    super(endereco, setor, produtos, filaDeEspera);
  }
}
