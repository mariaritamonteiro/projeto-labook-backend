# Projeto labook

 ## O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

# Índice
- <a href="#layout">layout
- <a href="#requisiçoes-paths">Requisições(Paths)
- <a href="#documentação-postman">Documentação Postaman
- <a href="#tecnologias-ultilizadas"> Tecnologias Ultilizadas
- <a href="#acesso-ao-projeto"> Acesso ao Projeto
- <a href="#desenvolvedor"> Desenvolvedor(a)

# Layout 
- Estrutura das pastas

![estrutura-das-pasta](./src/assents/estrutura_pages.png)

# Requisições(Paths)
## Requisições para cadastro
- /users/signup
## Requisições para login
- /users/login
## Requisições de criação e acesso.
- /posts
## Requisições de Like e Dislake
- /posts/:id/like

# Exemplos de Requisições
# Signup
- Endpoint público resposável pela criação de cadastra de usuários. Devolve um token jwt.
```
// request POST /users/signup
// body JSON
{
  "name": "Mary",
  "email": "mary@email.com",
  "password": "mary123"
}

// response
// status 201 CREATED
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNjUzZjVkLTkzYzYtNDdmNC04YzEzLTkyOWY1OTc5MDhhNCIsIm5hbWUiOiJNYXJ5Iiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5MzI0NDMwNywiZXhwIjoxNjkzODQ5MTA3fQ.-gk4c7XYCterVbZipQ04tS2jC44yHloCD5w7fqPydEI"
}
```
# Login
- Endpoint público responsável pela verificação de acesso do usuário. Devolve um token jwt.
```
// request POST /users/login
// body JSON
{
  "email": "mary@email.com",
  "password": "mary123"
}

// response
// status 200 OK
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNjUzZjVkLTkzYzYtNDdmNC04YzEzLTkyOWY1OTc5MDhhNCIsIm5hbWUiOiJNYXJ5Iiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5MzI0NDMwNywiZXhwIjoxNjkzODQ5MTA3fQ.-gk4c7XYCterVbZipQ04tS2jC44yHloCD5w7fqPydEI"
}

```
# Create post
- Endpoint protegido, responsável pela criação de posts, requer um token jwt para acessá-lo.
```
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Hoje entrego esse projeto!"
}

// response
// status 201 CREATED
```

# Get posts
- Endpoint protegido, responsável pela vizualização dos posts criados pelos usuários, requer um token jwt para acessá-lo .
```
   // request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    [
    {
        "id": "e672c914-e05a-4ad9-bb4b-5d2598dca528",
        "content": "Sou o nenezinho da mamãe!!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-08-28T17:40:05.747Z",
        "updatedAt": "2023-08-28T17:40:05.747Z",
        "creator": {
            "id": "76f8a90e-e4e2-4839-8a54-e483884298f5",
            "content": "Alladin"
        }
    },
    {
        "id": "4ea5e0e7-412b-4bbf-826d-581046effb35",
        "content": "Preciso estudar mais!!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-08-28T17:41:53.614Z",
        "updatedAt": "2023-08-28T17:41:53.614Z",
        "creator": {
            "id": "3111b9c0-b51a-465d-b595-59e1e95cd620",
            "content": "Ana"
        }
    },
    {
        "id": "c40a8efa-308e-4866-a682-b6e126d4666d",
        "content": "Hoje entrego esse projeto!!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-08-28T17:43:03.225Z",
        "updatedAt": "2023-08-28T17:43:03.226Z",
        "creator": {
            "id": "3a653f5d-93c6-47f4-8c13-929f597908a4",
            "content": "Mary"
        }
    },
    {
        "id": "a3ff8678-eede-4c51-bc99-34dbb20dfccc",
        "content": "Sou a mamãe da Mary!!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-08-28T17:44:16.552Z",
        "updatedAt": "2023-08-28T17:44:16.552Z",
        "creator": {
            "id": "768c909c-e0b1-4093-ba83-d5f2beb6fd22",
            "content": "Julia"
        }
    }
]
]
```

# Edit post
- Endpoint protegido, resposável pela edição de um post, requer um token jwt para acessá-lo.
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```
// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": ""Preciso estudar muito para aprender React!""
}

// response
// status 200 OK
```
# Delete post
- Endpoint protegido, resposável por excluir um post, requer um token jwt para acessá-lo.
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.
```
// request DELETE /posts/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
```
# Like (funcionalidade 1)
- Endpoint protegido, reponsável por dá like em um post, requer um token jwt para acessá-lo.
- Quem criou o post não pode dar like ou dislike no mesmo.

- Caso dê um like em um post que já tenha dado like, o like é desfeito.
- Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.

- Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
- Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.


```
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

# Dislike (funcionalidade 2)
- Endpoint protegido, reponsável por dá dislike em um post, requer um token jwt para acessá-lo.
```
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```
# Documentação Postman
[Click aqui para ter acesso a documentação do Postman.](https://documenter.getpostman.com/view/26594514/2s9Y5ZwhNX)

# Tecnologias Ultilizadas
Conteúdos abordados:

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex 
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

# Acesso ao Projeto
## Pré Requisitos
È necessario ter instalado na máquina as seguintes ferramentas: <b>Git, Node.js.<b>

## Rodando o Back End (servidor)
```bash
# Clone este repositório
$ git clone <>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3003 - acesse <http://localhost:3003>
```
# Desenvolvedor(a)
<img style="width:200px" src="./src/assents/desenvolvedora.jpeg" >
<br><br>
<b>Maria Rita Monteiro<b>




