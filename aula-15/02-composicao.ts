type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T;
type AnimalProps = GConstructor<{ nome: string; idadeEmMeses: number }>;
// AnimalProps -> Especialização de GConstructor, exigindo que o construtor retorne um objeto com nome e idadeEmMeses

function MixinAnimal<TBase extends AnimalProps>(superClasse: TBase) {
  // Mixin ->  Funções que recebem uma classe como entrada e retornam uma nova classe com funcionalidades adicionadas
  return class extends superClasse {
    constructor(...args: any) {
      super(args[0]);
    }
    comer() {
      console.log(`NHEEC... ${this.nome} comeu!`);
    }
  };
}

interface Animal {
  /* 
  Em TypeScript, uma interface não possui atributos no sentido de armazenar valores ou estado diretamente, mas pode definir propriedades e métodos que as classes que implementam essa interface devem obrigatoriamente incluir.
  */
  nome: string;
  idadeEmMeses: number;
  comer: () => void;
}

class Cachorro implements Animal {
  public nome: string;
  public idadeEmMeses: number;
  constructor({ nome, idadeEmMeses }: { nome: string; idadeEmMeses: number }) {
    this.nome = nome;
    this.idadeEmMeses = idadeEmMeses;
  }

  comer() {
    console.log(`NHEEC... ${this.nome} comeu!`);
  }

  latir() {
    console.log(`AUUUAUU... ${this.nome} latiu!`);
  }

  andar() {
    console.log(`${this.nome}... andou!`);
  }
}

class K9 extends Cachorro implements Animal {
  constructor(
    public nome: string,
    public idadeEmMeses: number,
    public treinado: boolean
  ) {
    super({ nome, idadeEmMeses });
  }

  farejar() {
    if (this.treinado)
      console.log(`${this.nome} - treinado: ${this.treinado} : Está farejando`);
    else
      console.log(
        `${this.nome} - treinado: ${this.treinado} : Não está farejando`
      );
  }
}

const cachorro = new Cachorro({ nome: "Max", idadeEmMeses: 132 });
const caoDeGuarda = new K9("Rico", 48, true);
const caoDeGuarda2 = new K9("Tito", 58, false);
const caoDomestico = new (MixinAnimal(Cachorro))({
  nome: "Max Willians",
  idadeEmMeses: 132,
});

cachorro.comer();
caoDeGuarda.farejar();
caoDeGuarda2.farejar();

caoDomestico.comer();

/* 
-- Herança --
Representada pela relação entre K9 e Cachorro: 
          K9 é uma subclasse de Cachorro, o que significa que ela carrega todas as funcionalidades da classe base.

-- Composição --
Usada com MixinAnimal:
          MixinAnimal combina funcionalidades de forma modular e flexível. É possível aplicar MixinAnimal a várias classes, sem necessidade de alterar a classe original ou criar subclasses.
*/
