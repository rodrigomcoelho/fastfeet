<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="../fastfeet.png" width="300px" />
</h1>

FastFeet é o seu aplicativo de entregas favorito, onde você pode adicionar entregadores, destinatários. Um app onde você encontrará os entregadores mais eficientes entregando um serviço de qualidade. FastFeet é um projeto de conclusão de curso da turma [Bootcamp GoStack](https://rocketseat.com.br/gostack) da [Rockeseat](https://rocketseat.com.br/) e contém módulos completos de administração de receitas, chefes e usuários.

## Começando
Para começar a instalar o `FastFeet` você precisará de alguns softwares/programas instalados em sua maquina ou em um container do [docker](https://www.docker.com/).

### Pré-requisito
A aplicação FastFeet foi desenvolvida
 utilizando Node.js, ReactJS e React Native e um banco de dados relacional.
Lista de softwares necessários para executar aplicação.

1. [Node.js](https://nodejs.org/)
2. [Postgres](https://www.postgresql.org/)
3. [Redis](https://redis.io/)

Esses programas são excecionais para o funcionamento do programa.

### Instalação
- Primeiro passo é você clonar o projeto para um diretório em tua maquina (você decide onde ficará).
- Abra o terminal ou o PowerShell se estiver utilizando o Windows e execute o comando abaixo.

```
git clone https://github.com/rodrigomcoelho/fastfeet/
```

## Configurando o backend

O primeiro será criar um banco de dados. Qualquer gerenciador do postgres pode ser utilizado, pgAdmin, postbird, etc.
A banco pode ser criado pela IDE ou utilizando o comando abaixo:

```sql
create database fastfeet;
```

Agora será necessário criar um arquivo `.env` no diretório raiz do projeto (backend) com as configurações abaixo:

**Todas as configurações do exemplo devem ser alteradas para as configurações do _teu ambiente local_.**

Exemplo:
```
# Geral
NODE_ENV=development
APP_URL=http://localhost:3333

# Auth
APP_SECRET=minhasenhasecretaqui

# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_NAME=fastfeet

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Mail
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=
MAIL_PASS=

# Sentry (produção)
SENTRY_DSN=
```

Se preferir você pode utilizar o arquivo `.env.example` presente no projeto como um exemplo a se basear na criação do `.env`.

Agora com o diretório backend presente na maquina e o banco de dados criado, será necessário abrir o terminal, acessar a pasta `fastfeet/backend` e executar os comandos abaixo:

Instalar as dependências
```sh
yarn
```

### Populando o banco

O projeto foi criado utilizando o Sequelize portanto as tabelas e seu relacionamentos serão criadas automaticamente ao utilizar os comandos abaixo:

Criar as tabelas relacionais
```sh
yarn sequelize db:migrate
```
Popular o banco de dados com o usuário administrador
```sh
yarn sequelize db:seed:all
```
Executar o projeto
```sh
yarn dev
```

Esse programa software também consta com um modulo desaboplado para controle da fila de emails, para ativa-la, execute o comando abaixo em outra janela do terminal

```sh
yarn queue
```

## :memo: Licença

**Rodrigo Coelho** – rodrigo.coelho@hotmail.com.br

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.

[https://github.com/rodrigomcoelho/](https://github.com/rodrigomcoelho/)

## Contribuição

1. Faça o _fork_ do projeto (<https://github.com/rodrigomcoelho/fastfeet/fork>)
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/new-feature`)
3. Faça o _commit_ (`git commit -am 'Add some feature'`)
4. _Push_ (`git push origin feature/new-feature`)
5. Crie um novo _Pull Request_
