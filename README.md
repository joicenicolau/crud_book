# Código e Funções - Explicação e exemplos

![Captura de tela de 2023-05-31 16-23-02](https://github.com/joicenicolau/crud_book/assets/112522719/0c9ca6e0-6609-467f-9069-377622e35829)

Recebi um desafio que deveria desenvolver um sistema para uma livraria, neste sistema o usuário deve conseguir gerenciar livros e autores, em Next.js e prisma. 

Tinha como desafio criar duas funcionalidades: 1. No módulo gerência de autores deve ser possível criar e listar autores, sendo que um autor deve ter armazenado seu nome, data de nascimeno e sua biografia; 2. No módulo de livros criar um CRUD de livros, um livro deve ter armazenado seu nome, data de lançamento, uma descrição, a categoria do livro e quais seus autores; 3. Ainda, no módulo de livros, listar os livros por autor. 

Aqui está uma explicação e exemplos das partes principais do código criado:


## Arquivos de Migrations

Os arquivos de migração são usados para criar as tabelas no banco de dados. Existem três arquivos de migração no código fornecido: `CreateTable`, `AddForeignKey` e `DropTable`. Cada arquivo contém uma instrução SQL para executar uma ação no banco de dados. Por exemplo, o arquivo `CreateTable` contém instruções `CREATE TABLE` para criar as tabelas `Author`, `Book` e `_AuthorToBook`. Essas tabelas definem a estrutura do banco de dados e os relacionamentos entre elas.


## Arquivo schema.prisma

O arquivo `schema.prisma` é usado pelo Prisma ORM para definir o esquema do banco de dados e gerar o código do cliente. Ele define os modelos de dados (`Author`, `Book` e `AuthorToBook`) e seus campos, tipos e relacionamentos. Por exemplo, o modelo `Author` possui os campos `id`, `name`, `birthDate`, `biography` e `books`. O modelo `Book` possui os campos `id`, `name`, `releaseDate`, `description`, `category` e `authors`. O modelo `AuthorToBook` possui os campos `id`, `bookId`, `authorId`, uma tabela intermediária.


## Arquivo seed.js

O arquivo `seed.js` é usado para popular o banco de dados com dados iniciais. Ele usa o Prisma Client para criar registros nas tabelas `Author`, `Book` e `AuthorToBook`. Por exemplo, a função `book()` cria um novo registro na tabela `Book` com os dados fornecidos.


## Arquivos da API

Os arquivos `authors.js` e `books.js` são arquivos da API Next.js que definem os endpoints da API para manipular os dados de autores e livros.

O arquivo `authors.js` define dois métodos: `createAuthor` e `handler`. O método `createAuthor` cria um novo autor no banco de dados usando o Prisma Client. O método `handler` é a função principal do endpoint e lida com as requisições POST e GET. No caso de uma requisição POST, o novo autor é criado chamando a função `createAuthor` e o resultado é retornado como resposta. No caso de uma requisição GET, todos os autores são retornados como resposta.

O arquivo `books.js` define quatro métodos: `createBook`, `updateBook`, `filterBooksByAuthor` e `handler`. O método `createBook` cria um novo livro no banco de dados usando o Prisma Client e conecta-o a um autor existente. O método `updateBook` atualiza as informações de um livro existente. O método `filterBooksByAuthor` retorna todos os livros associados a um determinado autor. O método `handler` é a função principal do endpoint e lida com as requisições POST, GET, PUT e DELETE. Dependendo do método da requisição, o endpoint executa a ação correspondente usando os métodos mencionados acima.


## Arquivo Página de Edição de Livro

O arquivo `pages/edit/[id].js` contém o código para a página de edição de um livro em um aplicativo Next.js. Essa página permite editar as informações de um livro e atualizá-lo no servidor por meio de uma requisição PUT.

O componente `EditBook` é definido como uma função. Dentro do componente, o hook `useRouter` é chamado para acessar o objeto `router`, que contém informações sobre a rota atual. A propriedade `query` do objeto `router` é desestruturada para obter o parâmetro `id` da rota, que representa o ID do livro a ser editado.

O estado do componente é inicializado usando o hook `useState`. É criado um estado chamado `book` que contém um objeto com as propriedades `id`, `name`, `releaseDate`, `category` e `description`. O ID do livro é definido como o valor obtido do parâmetro `id` da rota. As outras propriedades são inicializadas com valores vazios.

Em seguida, a função `handleUpdateBook` é definida. Ela é uma função assíncrona que é chamada quando o botão "Update Book" é clicado. Essa função envia uma requisição PUT para o servidor para atualizar as informações do livro.

A função `fetch` é usada para enviar uma requisição PUT para `/api/books`. Os dados do livro a serem atualizados são passados como parte do corpo da requisição em formato JSON. O ID do livro é convertido em número usando o operador de adição unária (+) para garantir que seja enviado como um valor numérico.

Se a resposta da requisição for bem-sucedida, uma mensagem de sucesso é exibida no console. Caso contrário, uma mensagem de erro é exibida com o código de status da resposta.


## Arquivo index.js

O arquivo `index.js` é a página principal da aplicação, por isso, vou aprofundar a explicação dela. Ele usa o React e o Next.js para criar uma interface para interagir com a API. A página exibe um formulário para criar autores e livros. Os dados fornecidos nos campos do formulário são enviados para os endpoints da API correspondentes.

 ### Dependências e Importações
 
- `useState` e `useEffect` da biblioteca `react`: Esses hooks permitem o gerenciamento de estado e efeitos colaterais em componentes funcionais. Todos os estados que usei são locais. Importante ressaltar também, que essas variáveis de estado armazenam vários dados, como valores de entrada, listas de autores e livros, IDs de livro e autor selecionados e critérios de filtro.
- `useRouter` da biblioteca `next/router`: Este hook fornece acesso ao roteador do Next.js, permitindo a navegação e o tratamento de URLs.
- `tailwindcss`: Este é o framework CSS usado para estilizar os componentes.

 ### Funções da API
 
O componente define três funções assíncronas (`listAuthors`, `createBook` e `createAuthor`) responsáveis por interagir com os pontos de extremidade da API no lado do servidor.

- `listAuthors`: Envia uma requisição GET para `/api/authors` e recupera uma lista de autores do servidor. Ela lança um erro se a resposta não for bem-sucedida.

- `createBook`: Envia uma requisição POST para `/api/books` com os dados do livro fornecidos (`name`, `releaseDate`, `description`, `category` e `author`). Ela lança um erro se a resposta não for bem-sucedida.

- `createAuthor`: Envia uma requisição POST para `/api/authors` com os dados do autor fornecidos (`name`, `birthDate` e `biography`). Ela lança um erro se a resposta não for bem-sucedida.

### Manipuladores de Eventos

O componente define vários manipuladores de eventos para envio de formulários, cliques de botões e opções de seleção.

- `handleSubmitAuthor`: Manipula o envio do formulário de criação do autor. Ela chama a função `createAuthor` com os valores de entrada fornecidos e atualiza a lista de autores.

- `handleSubmitBooks`: Manipula o envio do formulário de criação do livro. Ela chama a função `createBook` com os valores de entrada fornecidos e atualiza a lista de livros.

- `handleListBooks`: Lista os livros chamando a função `handleListBooks`. A função envia uma requisição GET para `/api/books` para recuperar uma lista de livros do servidor. Se `filterAuthorId` for fornecido, a função adiciona o parâmetro `?authorId=filterAuthorId` à URL para filtrar os livros pelo autor selecionado.

- `handleEditBook`: Manipula o clique no botão "Editar" de um livro. Ela define o ID do livro selecionado e navega para a página de edição do livro (`/edit/[id]`) usando o roteador do Next.js.

- `handleDeleteBook`: Manipula o clique no botão "Excluir" de um livro. Ela envia uma requisição DELETE para `/api/books?id=book.id` para excluir o livro do servidor. Se a resposta for bem-sucedida, ela redireciona para a página inicial (`/`).

- `handleListAuthors`: Lista os autores chamando a função `listAuthors`. A função envia uma requisição GET para `/api/authors` para recuperar uma lista de autores do servidor.

- `handleClearList`: Limpa as listas de autores e livros, definindo-as como vazias.

- `handleSelectAuthor`: Manipula a seleção de um autor na lista suspensa. Ela define o ID do autor selecionado e atualiza o nome do autor selecionado com base no ID.

- `handleClearFilter`: Limpa o autor selecionado e os critérios de filtro.

 ### Hook useEffect
 
O componente utiliza o hook `useEffect` para executar ações específicas quando dependências específicas mudam.

- `useEffect(() => { handleListBooks(); }, [filterAuthorId]);`: Chama a função `handleListBooks` quando `filterAuthorId` muda. Isso atualiza a lista de livros com base nos critérios de filtro.

 ### Renderização e JSX
 
O código JSX do componente define a estrutura e o layout do HTML renderizado. Ele consiste em vários inputs de formulário, botões e listas.

- O código JSX renderiza duas seções principais:
- 
  1. A seção "Criar Autor" permite ao usuário inserir os detalhes do autor e criar um novo autor.
  2. A seção "Autores" exibe uma lista de autores obtida do servidor.

- Da mesma forma, o código JSX inclui duas seções para criar livros e exibir listas de livros.

- O código JSX também inclui botões para acionar várias ações, como listar autores, limpar listas, filtrar livros por autor e limpar o filtro.

- A renderização condicional é aplicada à lista de livros, mostrando apenas os livros associados ao autor selecionado se um filtro for aplicado.

Observe que o código fornecido não inclui a implementação da página de edição (`/edit/[id]`) ou dos pontos de extremidade da API (`/api/authors` e `/api/books`). Essas partes são assumidas como implementações separadas.


Este README fornece uma visão geral do código e sua funcionalidade. Contudo, gostaria de compartilhar uma breve nota pessoal sobre esse projeto. Foi um desafio interessante para mim, pois embora eu tivesse uma boa base em JavaScript e React, o Next.js possui suas particularidades. Foi extremamente gratificante aprender e superar cada obstáculo que encontrei ao longo do caminho. Mencionar que minha maior dificuldade durante o projeto foi lidar com o Prisma. Já havia trabalhado com ORMs anteriormente, como o Sequelize, mas percebi que houve muitas mudanças na documentação do Prisma. Foi um verdadeiro desafio aprender e dominar essa nova ferramenta.

Além disso, este projeto marcou a minha primeira experiência com o desenvolvimento full stack. Embora eu tenha gostado de trabalhar nele, gostaria de ter tido mais tempo para dedicar à refatoração, ao CSS e aos testes. Mesmo assim, estou feliz com o resultado alcançado.
