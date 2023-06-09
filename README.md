# cutshortT

## Quick Start

### Start Dev!

Running `yarn install` will get all dependencies installed. After completed run command below to run the development server.

> yarn dev

### Lint via tslint

> yarn prettier

## Demo

#### Development
http://159.89.173.56:5000/api

### Authentication
#### Register
```
Endpoint: /auth/register
Method: POST
Request:
  {
    email: '',
    name: '',
    password: '',
    passwordConfirm: ''
  }
```

#### Login
```
Endpoint: /auth/login
Method: POST
Request:
  {
    email: '',
    password: ''
  }
```
### Profile

#### Current User
```
Endpoint: /me
Authorization: Bearer <TOKEN FROM LOGIN>
Method: GET
```

#### All Users (Admin privilege)
```
Endpoint: /
Authorization: Bearer <TOKEN FROM LOGIN>
Method: GET
```

### Todos
#### Create
```
Endpoint: /api/todos
Method: POST
Request:
  {
    title: '',
    description: ''
  }
```

#### Edit
```
Endpoint: /api/todos/{todoId}
Method: PUT
Request:
  {
    title: '', // Optional
    description: '', // Optional
    completed: true/false // Optional
  }
```

#### Delete
```
Endpoint: /api/todos/{todoId}
Method: DELETE
```

#### Get All (Admin prevelige)
```
Endpoint: /api/todos
Method: GET
```

#### Get Todo for user
```
Endpoint: /api/todos/user/{userId}
Method: GET
```

### Posts
#### Create
```
Endpoint: /api/posts
Method: POST
Request:
  {
    text: ''
  }
```

#### Comment
```
Endpoint: /api/posts/{postId}/comment
Method: POST
Request:
  {
    text: ''
  }
```

#### Get All Posts (Admin prevelige)
```
Endpoint: /api/posts
Method: GET
```

#### Get Posts for user
```
Endpoint: /api/posts/user/{userId}
Method: GET
```

#### Delete
```
Endpoint: /api/posts/{postId}
Method: DELETE
```

