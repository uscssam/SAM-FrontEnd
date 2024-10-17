# Defina a imagem base (Node) para compilar o projeto Angular
FROM node:14 AS build

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o arquivo package.json para instalar as dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto
COPY . .

# Execute o build da aplicação Angular
RUN npm run build --prod

# Defina a imagem base (Nginx) para servir os arquivos estáticos
FROM nginx:1.21

# Copie os arquivos de build da aplicação Angular para o diretório padrão do Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponha a porta 8081
EXPOSE 8081
