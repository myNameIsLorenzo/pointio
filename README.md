# Fastify Mongoose Demo

This is a demo project to show how to use Fastify with Mongoose.

## Initial Setup

```bash
cp .env.dist .env
```

```bash
npm install
```

## Docker container

Start container
```bash
make up
```

Stop container
```bash
make down
```

## Start local server

```bash
make app-dev
```

## Launch tests

```bash
make test
```

## Use cases

### Register a new user

```bash
curl -X POST \
  'http://localhost:4000/api/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "string",
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string"
}'
```

### Login

It returns a JWT token that you can use to authenticate your requests.

```bash
curl -X POST \
  'http://localhost:4000/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "string",
  "password": "string"
}'
```

### Get logged user info

```bash
curl -X 'GET' \
  'http://localhost:4000/api/users/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```

### Get all devices

```bash
curl -X 'GET' \
  'http://localhost:4000/api/devices/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```

### Get device by id

```bash
curl -X 'GET' \
  'http://localhost:4000/api/devices/<device_id>' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```

### Create a new device

```bash
curl -X 'POST' \
  'http://localhost:4000/api/devices/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "a new device",
  "address": "10.20.20.1"
}'
```

### Update a device

```bash
curl -X 'PUT' \
  'http://localhost:4000/api/devices/<device_id>' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "a new device",
  "address": "10.20.20.1"
}'
```

### Delete a device

```bash
curl -X 'DELETE' \
  'http://localhost:4000/api/devices/<device_id>' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json'
}'
```

### Activate a device

```bash
curl -X 'PATCH' \
  'http://localhost:4000/api/devices/<device_id>/activate' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json'
}'
```

### Deactivate a device

```bash
curl -X 'PATCH' \
  'http://localhost:4000/api/devices/<device_id>/deactivate' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json'
}'
```
