// src/common/errors/i18n/pt-BR.ts
import { Messages } from "./types";

export const ptBR: Messages = {
  errors: {
    generic: {
      validation: "Erro de validação nos dados enviados.",
      internal: "Erro interno do servidor.",
      routeNotFound: "Rota não encontrada.",
      invalidBody:
        "Corpo da requisição inválido ou ausente. Verifique o Content-Type e o formato JSON.",
    },
    zod: {
      id: {
        required: "O ID do usuário é obrigatório.",
        invalidType: "O ID deve ser um número.",
      },
      name: {
        required: "O nome é obrigatório.",
        min: "O nome deve ter pelo menos 3 caracteres.",
        fullName: "Informe nome e sobrenome.",
        invalidType: "O nome deve ser um texto.",
      },
      email: {
        required: "O e-mail é obrigatório.",
        invalid: "Formato de e-mail inválido.",
        invalidType: "O e-mail deve ser um texto.",
      },
    },

    database: {
      unique: (field) => `Este ${field} já foi cadastrado.`,
      notFound: "Registro não encontrado.",
      genericDb: "Erro de banco de dados.",
      users: {
        notFound: "Nenhum usuário encontrado.",
      },
    },
  },
  // fields: {
  //   email: "e-mail",
  //   name: "nome",
  //   username: "nome de usuário",
  // },
};
