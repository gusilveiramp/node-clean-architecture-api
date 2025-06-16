import { Messages } from "./types";

export const ptBR: Messages = {
  errors: {
    generic: {
      validation: "Erro de validação nos dados enviados.",
      internal: "Erro interno do servidor.",
      routeNotFound: "Rota não encontrada.",
    },
    zod: {
      name: {
        required: "O nome é obrigatório.",
        min: "O nome deve ter pelo menos {value} caracteres.",
        fullName: "Informe nome e sobrenome.",
      },
      email: {
        required: "O e-mail é obrigatório.",
        invalid: "Formato de e-mail inválido.",
      },
    },
    database: {
      unique: (field) => `Este ${field} já foi cadastrado.`,
      notFound: "Registro não encontrado.",
      genericDb: "Erro de banco de dados.",
    },
  },
  fields: {
    email: "e-mail",
    name: "nome",
    username: "nome de usuário",
  },
};
