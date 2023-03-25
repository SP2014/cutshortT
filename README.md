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
https://tsnode-rest-dev.herokuapp.com/

#### Production
https://tsnode-rest-prod.herokuapp.com/

### REDIS
#### Create
```
Endpoint: /redis/insert
Method: POST
Request:
  {
    key: 'my-key',
    value: ['value1', 'value2']
  }
```
#### Get
```
Endpoint: /redis/:key
Method: GET
```

### CLIENT
#### Login
```
Endpoint: /login
Method: POST
Request:
  {
    username: '',
    password: ''
  }
```
#### Profile
```
Endpoint: /profile
Authorization: Bearer <TOKEN FROM LOGIN>
Method: GET
```

### ADMIN
#### Login
```
Endpoint: /login/admin
Method: POST
Request:
  {
    username: '',
    password: ''
  }
```
#### Profile
```
Endpoint: /profile/admin
Authorization: Bearer <TOKEN FROM LOGIN>
Method: GET
```



#### Register
```
Endpoint: /register
Method: POST
Request:
  {
    username: '',
    password: '',
    scope: '' <- ADMIN or CLIENT
  }
```
