FROM node:24

# Define um diretório de trabalho seguro
WORKDIR /home/node/api

# Copia apenas os arquivos de dependência primeiro (para aproveitar cache)
COPY package*.json ./

# Instala dependências em modo dev
RUN npm install

# Copia o restante da aplicação
COPY . .

# Permissões seguras: garante que os arquivos sejam propriedade do usuário node
RUN chown -R node:node /home/node/api

# (Segurança) Executa como usuário não-root
USER node

# Expõe a porta da API
EXPOSE 3333

# Comando padrão para rodar em modo desenvolvimento
CMD ["npm", "run", "dev:api"]
