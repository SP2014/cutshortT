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
#### Profile
```
Endpoint: /me
Authorization: Bearer <TOKEN FROM LOGIN>
Method: GET
```
