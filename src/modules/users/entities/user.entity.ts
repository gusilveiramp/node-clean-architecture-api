export class UserEntity {
  id?: number;
  name!: string;
  email!: string;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  // Partial<T> é um utilitário do TypeScript que transforma todas as propriedades de T em opcionais.
  constructor(partial: Partial<UserEntity>) {
    // Pega todas as propriedades do objeto passado e copia para o objeto destino
    Object.assign(this, partial);
  }
}

// 📌 Primeiro: o que o ? faz?
// Quando você escreve:
// export class UserEntity {
//   id?: number;
//   ...
// }

// Você está dizendo:
// “id pode ou não estar presente numa instância completa dessa classe.”
// Ou seja, isso afeta a estrutura da classe — mas não o tipo aceito pelo construtor por padrão.

// 🎯 Agora, por que usamos Partial<UserEntity> no construtor?
// Porque o Partial<T> muda o tipo aceito pelo argumento partial. Exemplo:

// ❌ Sem Partial:
// constructor(data: UserEntity) {}
// Aqui o TypeScript exigiria todos os campos obrigatórios (ex: name, email), mesmo se eles tiverem ! no corpo da classe.

// ✅ Com Partial<UserEntity>:
// constructor(data: Partial<UserEntity>) {}
// Agora você pode passar um objeto incompleto, só com os campos que quiser. Por exemplo:
// new UserEntity({ name: "Gustavo" }); // funciona

// 🧠 E por que usamos Object.assign(this, partial)?
// Porque é uma forma prática de fazer isso:
// this.name = partial.name;
// this.email = partial.email;
// this.id = partial.id;
// // etc.

// Ou seja, o Partial permite que o argumento tenha os campos opcionais,
// e o Object.assign aplica esses campos à instância.

// ✅ Resumindo com uma frase:
// Os ? na entidade tornam as propriedades opcionais no objeto final,
// o Partial<> torna os campos opcionais no construtor,
// e o Object.assign() aplica tudo de forma prática.

// Nesse caso:
// Partial<UserEntity>

// Vira isso:
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   created_at?: Date;
//   updated_at?: Date | null;
//   deleted_at?: Date | null;
// }

// então, mesmo que no original (UserEntity) name e email sejam obrigatórios ( ! ),
// ao aplicar Partial<UserEntity> elas se tornam opcionais temporariamente, ou seja - apenas para uso no construtor.

// E o que Object.assign(this, partial) faz?
// Ele pega as propriedades de partial e copia para a instância atual (this), ou seja, é como se você fizesse:
// this.id = partial.id;
// this.name = partial.name;
// this.email = partial.email;
// etc.

// Só que automaticamente.

// E tudo isso permite o que?
// Isso permite fazer algo bem prático e limpo como:
// new UserEntity({ name: 'Gustavo', email: 'gus@teste.com' });
// Mesmo sem passar o id, created_at, etc., porque todas as props estão opcionais dentro do construtor.
