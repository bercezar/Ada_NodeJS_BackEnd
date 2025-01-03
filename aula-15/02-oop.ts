import { Produto } from "../aula-14/01-classes";

interface EstabelecimentoInterface {
  endereco: string;
  setor: string;
  retornaProdutos: () => string[]; // Retorna um array
  diminuirFilaDeEspera: () => void;
}

interface Remedio extends Produto {
  receitaObrigatoria?: boolean;
}

interface ReceitaInterface {
  remedios: string[];
  crm: string;
}
interface FarmaciaInterface extends EstabelecimentoInterface {
  compraRemedioPrescrito: (
    receita: ReceitaInterface,
    produtosAcomprar: string[]
  ) => void;
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

class Farmacia extends Estabelecimento implements FarmaciaInterface {
  constructor(
    public endereco: string,
    public setor: string,
    protected produtos: Remedio[],
    filaDeEspera?: number
  ) {
    super(endereco, setor, produtos, filaDeEspera);
  }

  public compraRemedioPrescrito(
    receita: ReceitaInterface,
    produtosAcomprar: string[]
  ) {
    const remediosDisponiveis = this.retornaProdutos().filter((produto) =>
      produtosAcomprar.includes(produto)
    );

    if (remediosDisponiveis.length === 0)
      console.log("Infelizmente não temos os remédios em estoque");

    const remediosComReceita = remediosDisponiveis.filter((produto) =>
      receita.remedios.includes(produto)
    );

    console.log({ remediosDisponiveis });
    console.log({ remediosComReceita });
  }
}

const farmacia = new Farmacia("Rua Dr dos remédios - N°1029", "Farmaceutico", [
  { nome: "Dorflex", valor: 4.99, receitaObrigatoria: false },
  { nome: "RivoTril", valor: 10.9, receitaObrigatoria: true },
  { nome: "Vitamina C", valor: 5.5, receitaObrigatoria: false },
  { nome: "Dipirona", valor: 4.34, receitaObrigatoria: false },
]);

farmacia.retornaProdutos();
farmacia.compraRemedioPrescrito(
  {
    remedios: ["Vitamina C", "Dipirona", "B12"],
    crm: "6519-CRMRJ",
  },
  ["Dipirona", "B12"]
);
