# 🗺 Projeto "Aprove-me"

<h2 align="center">
   <a href="https://nestjs.com/" target="_blank" rel="noopener">Nest.JS</a> | <a href="https://nextjs.org/" target="_blank" rel="noopener">Next.JS</a>
</h2>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg?logo=typescript">
</p>

<h3 align="center">
  <a href="#-sobre">Sobre o projeto</a>
  <span> · </span>
  <a href="#-tecnologias-utilizadas">Tecnologias utilizadas</a>
  <span> · </span>
  <a href="#-primeiros-passos">Primeiros passos</a>
  <span> · </span>
  <a href="#-padroes-contribuir">Padrões do projeto</a>
  <span> · </span>
  <a href="#-to-do-&-prazos">To Do & Prazos</a>
  <span> · </span>
  <a href="#-licença">Licença</a>
</h3>

## 💭 Sobre

O *Aprove-me* foi criado para automatizar o cadastro de recebíveis de um cliente da Bankme, que diariamente movimenta um alto volume desses documentos. Antes, o processo era manual e sobrecarregava a equipe de operações, além de ser suscetível a erros. Os recebíveis representam documentos de dívidas a receber, essenciais para o fluxo comercial da Bankme com esse cliente. Com o *Aprove-me*, o cadastro torna-se rápido e eficiente, reduzindo a carga de trabalho, minimizando erros e garantindo uma integração fluida e confiável dos dados no sistema.
## 👨‍💻 Tecnologias Utilizadas

- <a href="https://nextjs.org/" target="_blank" rel="noopener">Next.JS</a>;
- <a href="https://nestjs.com" target="_blank" rel="noopener">Nest.JS</a>;
- <a href="https://www.docker.com/" target="_blank" rel="noopener">Docker</a>;
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript</a>.

## ⁉ Primeiros passos

### 🤔 Pré-requisitos

Para conseguir utilizar o projeto e contribuir nele, basta seguir as instruções abaixo:

- O **<a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a>** é **OBRIGATÓRIO** para executar esse projeto e é **RECOMENDADO** usar a versão LTS.
- O **<a href="https://www.docker.com/" target="_blank" rel="noopener">Docker</a>** é **OBRIGATÓRIO** para executar esse projeto.
- O **<a href="https://www.npmjs.com/" target="_blank" rel="noopener">NPM</a>** ou **<a href="https://yarnpkg.com/" target="_blank" rel="noopener">Yarn</a>** são **OBRIGATÓRIO** para o gerenciamento dos pacotes da aplicação.
- O **<a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a>** é **OBRIGATÓRIO** para o controle de versão do projeto.

### 📝 Passo a passo

Primeiro clone o repositório em seu computador, por meio do terminal utilizando o comando:

1. Clonando o repositório

```sh
  # Clone o repositório
  $ git clone https://github.com/juniel-filappi/aprove-me.git
  # Entre na pasta raiz da aplicação
  $ cd aprove-me
```

2. Iniciando o Projeto back

```sh
  # Entre na pasta do projeto back
  $ cd back
  # Instale as dependências da aplicação
  $ yarn # ou npm install
  # Execute o generate do prisma
  $ yarn prisma generate
  # Execute o comando abaixo para iniciar o projeto
  $ yarn start
  # Inicie o container do docker
  $ docker-compose up -d
```

2. Iniciando o Projeto front

```sh
  # Entre na pasta do projeto back
  $ cd front
  # Instale as dependências da aplicação
  $ yarn # ou npm install
  # Execute o comando abaixo para iniciar o projeto
  $ yarn dev
```

Para verificar o banco de dados, rode o comando abaixo
```sh
$ yarn prisma studio
```

## 💯 Padrões do projeto

- Orientação a objetos;
- SOLID

## TODO & Prazos
### Backend
- [ ] Nível 1 - Validação
- [ ] Nível 2 - Persistência
- [ ] Nível 3 - Testes
- [x] Nível 4 - Autenticação
- [x] Nível 5 - Gerenciamento de permissões
- [x] Nível 6 - Infra e Doc
- [ ] Nível 7 - Lotes
- [ ] Nível 8 - Resiliência
- [ ] Nível 9 - Cloud
- [ ] Nível 10 - Infra as a Code

### Frontend
- [ ] Nível 1 - Cadastro
- [ ] Nível 2 - Conectando na API
- [ ] Nível 3 - Listando
- [ ] Nível 4 - Autenticação
- [ ] Nível 5 - Testes

---

<sup> Feito com 💙 por 👾<a href="https://github.com/juniel-filappi/" target="_blank" rel="noopener">Juniel</a> ® 2024.</sup>