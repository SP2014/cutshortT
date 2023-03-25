# cutshortT

## Quick Start

### Start Dev!

Running `yarn install` will get all dependencies installed. After completed run command below to run the development server.

> yarn dev

### Lint via tslint

> yarn prettier

## Demo
### This is only a sample api to explore the boilerplate. You can also create your own API based on your requirements.

#### Development
http://localhost:5000/api

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
Method: POST
Request:
  {
    title: '',
    description: ''
  }
```
