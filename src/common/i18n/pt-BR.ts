import { Messages } from "./types";

export const ptBR: Messages = {
  validation: {
    string: {
      required: "O campo é obrigatório.",
      invalid: "Valor inválido para texto.",
      minLength: "O campo deve ter pelo menos {min} caracteres.",
      fullName: "Informe nome e sobrenome.",
    },
    number: {
      required: "O campo numérico é obrigatório.",
      invalid: "Valor inválido para número.",
      min: "O valor mínimo permitido é {min}.",
    },
    email: {
      required: "O e-mail é obrigatório.",
      invalid: "Formato de e-mail inválido.",
    },
  },

  errors: {
    generic: {
      validation: "Erro de validação nos dados enviados.",
      internal: "Erro interno do servidor.",
      routeNotFound: "Rota não encontrada.",
      invalidBody:
        "Corpo da requisição inválido ou ausente. Verifique o Content-Type e o formato JSON.",
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
};
