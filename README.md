# Labeddit
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#diagram">Diagram</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#roadmap">RoadMap</a></li>
    <li>
      <a href="#methods">Estructure REST</a>
      <ul>
        <li><a href="#methods">Methods</a></li>
        <li><a href="#response">Response</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#frontend-repository">FrontEnd Repository</a></li>    
    <li>
      <a href="#exemples-requests">Exemples requests</a>
      <ul>
     <details>
    <summary>Users</summary>
      <ul>
        <li><a href="#signup">Signup</a></li>
        <li><a href="#login">Login</a></li>
       <li><a href="#delete-user">Delete User</a></li>
      </ul>
    </details>
    <details>
    <summary>Posts</summary>
      <ul>
        <li><a href="#get-posts">Get posts</a></li>
        <li><a href="#create-new-post">Create new post</a></li>
       <li><a href="#edit-post">Edit post</a></li>
       <li><a href="#delete-post">Delete post</a></li>
       <li><a href="#reaction-post ">Reaction Post </a></li>
      </ul>
    </details>
         <details>
    <summary>Comments</summary>
      <ul>
        <li><a href="#get-comments">Get comments</a></li>
        <li><a href="#create-new-comment">Create new comment</a></li>
       <li><a href="#edit-comment">Edit comment</a></li>
       <li><a href="#delete-comment">Delete comment</a></li>
       <li><a href="#reaction-comment ">Reaction comment </a></li>
      </ul>
    </details>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


## About the project
Labeddit is a social network with the goal of connecting and interacting between posts from its users. Anyone who signs up for the app can create, like, and comment on posts.<br/>

## Built With

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Layered architecture
- UUID
- Password hashed
- Autentication and autozrization
- Router
- Postman



# Diagram

[![Diagram][product-screenshot]][diagram-url]
## Documentation
Ducumentation of the API with instrutions on how to use the endpoints avalible for the Labeddit aplication 
<br>

[Labook API](https://documenter.getpostman.com/view/24460684/2s93CLttsj)

# RoadMap

- Endpoints
    - Users
        - [ ]  Signup
        - [ ]  Login
        - [ ]  Delete user
    - Posts
        - [ ] Get Posts
        - [ ] Edit Post
        - [ ] Reaction Post
        - [ ] Create new Post
        - [ ] Delete Post
    - Comments
        - [ ] Get Comments of a Post
        - [ ] Edit Comment
        - [ ] Reaction Comment
        - [ ] Create new comment
        - [ ] Delete Comment

- Authentication and authorization
    - [ ]  UUID
    - [ ]  Hashed passwords with Bcrypt.
    - [ ]  tokens JWT
 - Code
    - [ ]  POO
    - [ ]  Layered architecture
    - [ ]  Router in Express
    - [ ]  SOLID
    - [ ]  Clean code

## Methods
Requests for the API must follow HTTP RESTful patterns.
| Methods | Description |
|---|---|
| `GET` | 	Returns information for one or more records. |
| `POST` | Used to create a new record or login access. |
| `PUT` | Updates data for a record or changes its status. |
| `PATCH` | 	Partially updates data for a record. |
| `DELETE` | Removes a record from the system. |


## Response

| Código | Descrição |
|---|---|
| `200` | Request successfully executed (success).|
| `201` | Data created successfully (success).|
| `400` | Validation errors or fields provided do not exist in the system.|
| `404` | Searched record not found (Not found).|
| `409` | The user already exists in the system. (Conflict).|
| `500` | Unexpected error.|


## Getting Started 

Here is an example of instructions on how to set up the project locally.
To have a local copy, follow the steps below:

### Instalation

1. Clone repository
  ```sh
  git clone https://github.com/Afmjuniors/labeddit-back.git
  ```
   
2. Install NPM TypeScript packages 
  ```sh
  npm init -y (create package.json)
  ```
  ```sh
  npm i -g typescript (just once)
  ```
  ```sh
  npm i typescript -D (install typescript in the project)
  ```
  ```sh
  npx tsc -init (create tsconfig.json)
  ```
  
3. Install NPM Express packages 
  
  ```sh
  npm install express
  ```
  ```sh
  npm install @types/express -D
  ```
  
4. Install NPM Cors packages 
  
  ```sh
  npm install cors
  ```
  ```sh
  npm install @types/cors -D
  ```
  
5. Install NPM Node packages 
  
  ```sh
  npm install ts-node-dev -D
  ```
6. Run NPM  Universally Unique Identifier (UUID)

  ```sh
  npm install uuid
   ```
  ```sh
  npm install -D @types/uuid
   ```
7. Run NPM Environment variables (ENV, see .env.exemple)

  ```sh
  npm install dotenv
   ```
8. Run NPM JWT(Token)

  ```sh
  npm install jsonwebtoken
   ```
```sh
  npm install -D @types/jsonwebtoken
   ```
9. Run NPM Bcrypt

  ```sh
  npm i bcryptjs
   ```
 ```sh
  npm i -D @types/bcryptjs
   ```
10. Run NPM Jest

  ```sh
  npm i -D jest @types/jest ts-jest

   ```
11. Run NPM developer

  ```sh
  npm run dev
   ```

## Usage

This application is a Fullstack development of a working social media plataform.
Using a blog format the user can view posts by others users, Like or Dislike them and even comment in a specific post.
To see the application online deployed visti the [vercel](https://labeddit-front.vercel.app/)('https://labeddit-front.vercel.app/')

## FrontEnd-Repository
To see repository of this application [Front-end]('https://github.com/Afmjuniors/labeddit-front) 

# Exemples requests
It isnt necessary to use the email, name, and password in the exemples. However remember to respect th basic struture.

## Signup
Public endpoint for create new user.
```json
// request POST /users/signup
// body JSON
{
    "name":"junior",
    "email":"junior@email.com",
    "password":"123456@Aa"
}

// response
// status 201 CREATED
{
    "message": "Usuario adicionado com sucesso",
    "user": {
        "id": "UUID",
        "name": "junior",
        "email": "junior@email.com",
        "role": "NORMAL",
        "createdAt": Date.now(),
        "updatedAt": Date.now()"
    },
    "token": "token jwt"
}
```

## Login
Public endpoint for login user.
```json
// request POST /users/login
// body JSON
{
  "email": "junior@email.com",
  "password": "123456@Aa"
}

// response
// status 200 OK
    "message": "Login feito com sucesso",
    "user": {
        "id": "UUID",
        "name": "junior"
    },
    "token": "token jwt"
}
```
## Delete User
Protected endpoint for deleted logged user.
```json
// request DELETE /users
// headers.authorization = "token jwt"

// response
// status 200 OK
{
    "message": "Usuario deletado com sucesso"
}
```

## Get posts
Protected endpoint get all posts. required a jwt token.
```json
// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "UUID",
        "content": "Conten of post made in the postman",
        "likes": 0,
        "dislikes": 0,
        "comments": 1,
        "creator": {
            "id": "UUID",
            "name": "Alexandre Machado"
        },
        "userReaction": [
            null
        ],
        "createdAt": "2023-03-11T20:58:49.263Z",
        "updatedAt": "2023-03-11T20:58:49.263Z"
    },
    {
        "id": "UUID",
        "content": "Content as a test made in the postman",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "creator": {
            "id": "UUID",
            "name": "junior"
        },
        "userReaction": [
            null
        ],
        "createdAt": "2023-03-11T20:58:49.263Z",
        "updatedAt": "2023-03-11T20:58:49.263Z"
    }
]
```

## Create new post
Protected endpoint create a new post. required a jwt token.
```json
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "New Post!"
}

// response
// status 201 CREATED
{
    "message": "Post adicionado com sucesso",
    "post": {
        "id": "UUID",
        "content": "New Post!",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "creator": {
            "id": "UUID",
            "name": "junior"
        },
        "userReaction": [
            null
        ],
        "createdAt": Date.now(),
        "updatedAt": Date.now()
    }
}
```

## Edit post
Protected endpoint edit a post. required a jwt token.<br>
Only the creator can edit its content
```json
// request PATCH /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "New content, of the post created by junior"
}

// response
// status 200 OK
{
    "message": "Post adicionado com sucesso",
    "post": {
        "id": "UUID",
        "content": "New content, of the post created by junior",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "creator": {
            "id": "UUID",
            "name": "junior"
        },
        "userReaction": [
            null
        ],
        "createdAt": "2023-03-11T21:05:56.708Z",
        "updatedAt": Date.now()
    }
}
```

## Delete post
Protected endpoint delete a post. required a jwt token.<br>
Only the creator can delete it. ADMIN can delete all posts.

```json
// request DELETE /posts/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
{
    "message": "Post deletado com sucesso"
}
```

## Reaction Post 

Protected endpoint create a new post. required a jwt token.<br>
Case the user had liked the post and do it again, the reaction will be neutral.<br>
Case the user had liked the post and disliked it now, the reaction will be inverse.<br>

### Like (function 1)
```json
// request PUT /posts/:id/reaction
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
{
    "message": "O usuario deu like no post"
}
```

### Dislike (function 2)
```json
// request PUT /posts/:id/reaction
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
{
    "message": "O usuario trocou para dislike"
}
```
### Dislike (function 3)
```json
// request PUT /posts/:id/reaction
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
{
    "message": "O usuario desfez o dislike"
}
```

## Get Comments
Protected endpoint get all comments of an post. required a jwt token.
```json
// request GET /comments/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "UUID",
        "postId": "UUID",
        "content": "New content",
        "likes": 0,
        "dislikes": 1,
        "createdAt": Date.now(),
        "updatedAt": Date.now(),
        "creator": {
            "id": "UUID",
            "name": "Alexandre Machado"
        },
        "userReaction": [
            null
        ]
    }
]
```

## Create new comment
Protected endpoint create a new comment of a post. required a jwt token.
```json
// request POST /comments/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "New content!"
}

// response
// status 201 CREATED
{
    "message": "Post adicionado com sucesso",
    "post": {
        "id": "UUID",
        "content": "New content!",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "creator": {
            "id": "UUID",
            "name": "Alexandre Machado"
        },
        "userReaction": [
            null
        ],
        "createdAt": Date.now(),
        "updatedAt": Date.now()
    }
}
```

## Edit Comment
Protected endpoint create a post. required a jwt token.<br>
Only the creator can edit its content
```json
// request PATCH /comments/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "New content, of the post created by junior"
}

// response
// status 200 OK
{
    "message": "Post adicionado com sucesso",
    "post": {
        "id": "UUID",
        "content": "New content, of the post created by junior",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "creator": {
            "id": "UUID",
            "name": "junior"
        },
        "userReaction": [
            null
        ],
        "createdAt": "2023-03-11T21:05:56.708Z",
        "updatedAt": Date.now()
    }
}
```

## Delete Comment
Protected endpoint delete a comment. required a jwt token.<br>
Only the creator can delete it. ADMIN can delete all posts.

```json
// request DELETE /comments/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
{
    "message": "Post deletado com sucesso"
}
```

## Reaction Comment 

Protected endpoint create a new comment. required a jwt token.<br>
Case the user had liked the comment and do it again, the reaction will be neutral.<br>
Case the user had liked the comment and disliked it now, the reaction will be inverse.<br>

### Like (function 1)
```json
// request PUT /comments/:id/reaction
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
{
    "message": "O usuario deu like no post"
}
```

### Dislike (function 2)
```json
// request PUT /comments/:id/reaction
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
{
    "message": "O usuario trocou para dislike"
}
```
### Dislike (function 3)
```json
// request PUT /comments/:id/reaction
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
{
    "message": "O usuario desfez o dislike"
}
```

## Contact

Alexandre Machado  - afmjuniors@gmail.com



[![Linkedin](https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/afmjuniors/)](https://www.linkedin.com/in/afmjuniors)

## Acknowledgments

* As my last project made by the bootcamp Labenu I would like to thanks them, every single teacher was critical to my learning experience, and the support staff was wornderful.
* Also as the last project by the bootcamp I would like to thanks my colegues form Ammal-A, they were a very unite commuty and I hope that we continue to do so.




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Afmjuniors/labeddit-back.svg?style=for-the-badge
[contributors-url]: https://github.com/Afmjuniors/labeddit-back/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Afmjuniors/labeddit-back.svg?style=for-the-badge
[forks-url]: https://github.com/Afmjuniors/labeddit-back/network/members
[stars-shield]: https://img.shields.io/github/stars/Afmjuniors/labeddit-back.svg?style=for-the-badge
[stars-url]: https://github.com/Afmjuniors/labeddit-back/stargazers
[issues-shield]: https://img.shields.io/github/issues/Afmjuniors/labeddit-back.svg?style=for-the-badge
[issues-url]: https://github.com/Afmjuniors/labeddit-back/issues
[license-shield]: https://img.shields.io/github/license/Afmjuniors/labeddit-back.svg?style=for-the-badge
[license-url]: https://github.com/Afmjuniors/labeddit-back/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/afmjuniors
[product-screenshot]: readme-image/Labeddit.png
[diagram-url]: https://dbdiagram.io/d/63f7e93e296d97641d835a97

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Styled-components]:https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled-url]: https://www.styled-components.com/
[Chakra-UI]: https://img.shields.io/static/v1?style=for-the-badge&message=Chakra+UI&color=319795&logo=Chakra+UI&logoColor=FFFFFF&label=
[Chakra-url]: https://chakra-ui.com/getting-started
[Material-UI]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[Material-url]:https://mui.com/material-ui/getting-started/overview/

[SQLite]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlitetutorial.net/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/pt-br/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white
[Postman-url]: https://www.postman.com/
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]:https://jestjs.io/pt-BR/

