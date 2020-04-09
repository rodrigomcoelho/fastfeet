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

## Configurando o mobile

Nota
> Esse projeto foi totalmente criado para funcionar exclusivamente no plataforma **Android**, não havendo qualquer configuração adicional que facilite o funcionando no iOS.

Agora será necessário criar um arquivo `.env` no diretório raiz do projeto (mobile) com as configurações abaixo:

**Todas as configurações do exemplo devem ser alteradas para as configurações do _teu ambiente local_.**

Exemplo:
```
# Axios URL 10.0.3.2 (Genymotion)
# Axios URL 10.0.2.2 (Android Studio)
API_HOST=http://10.0.3.2:3333

# IP de sua Maquina para Reacotron Config
COMPUTER_IP=192.168.1.10
```

Se preferir você pode utilizar o arquivo `.env.example` presente no projeto como um exemplo a se basear na criação do `.env`.

Para iniciar o projeto, dentro da pasta `fastfeet/mobile` execute os comandos abaixo:

Instalar dependências
```sh
yarn
```

####  Com o emulador aberto execute os comandos abaixo:

Construir a aplicação no **Android**
```sh
yarn react-native run-android
```
Iniciar o programa
```sh
yarn react-native start
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
