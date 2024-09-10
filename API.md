# GymProject API Reference
## Overview
The GymProject API is a RESTful service designed to manage gyms, users, and turnstiles. It provides endpoints for user registration, authentication, gym management, QR code processing, and turnstile operations. This documentation serves as a complete reference, detailing each available route, its purpose, the expected request and response formats, and any necessary authentication and authorization requirements.

### Base URL
All API endpoints are prefixed with the base URL:

```
https://your-domain.com/api/v1
```

## Authentication
The GymProject API uses JWT (JSON Web Tokens) for authenticating requests. To access protected endpoints, you must include a valid JWT token in the `Authorization` header of your HTTP requests.

Example:
```
Authorization: Bearer <your-jwt-token>
```

### Obtaining a JWT Token
To obtain a JWT token, you need to authenticate via the `/login` endpoint with your registered email and password.

### Roles
- **MEMBER**: Basic user role with limited access.
- **GYM_OWNER**: Privileged user role with access to manage gyms and associated resources.

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of an API request:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `204 No Content`: The resource was successfully deleted.
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: The request requires user authentication.
- `403 Forbidden`: The server understood the request but refuses to authorize it.
- `404 Not Found`: The requested resource could not be found.
- `409 Conflict`: The request could not be completed due to a conflict.
- `500 Internal Server Error`: The server encountered an error.

## API Endpoints

### 1. User Registration and Authentication

#### POST `/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `201 Created`: User successfully registered.
- `409 Conflict`: Email already exists.

#### POST `/login`
Authenticate a user and obtain a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`: Returns the JWT token.
- `400 Bad Request`: Invalid email or password.

### 2. Gym Management

#### POST `/gyms`
Create a new gym. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "phone": "string",
  "latitude": "number",
  "longitude": "number"
}
```

**Responses:**
- `201 Created`: Gym successfully created.
- `400 Bad Request`: Validation failed.

#### GET `/gyms/:id`
Retrieve details of a specific gym.

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the gym.

**Responses:**
- `200 OK`: Returns gym details.
- `404 Not Found`: Gym not found.

#### PUT `/gyms/:id`
Update an existing gym. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the gym.

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "phone": "string",
  "latitude": "number",
  "longitude": "number"
}
```

**Responses:**
- `200 OK`: Gym successfully updated.
- `400 Bad Request`: Validation failed.

#### DELETE `/gyms/:id`
Delete a gym. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the gym.

**Responses:**
- `204 No Content`: Gym successfully deleted.
- `400 Bad Request`: Deletion failed.

#### GET `/user/gyms`
Fetch all gyms owned by the authenticated user. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `page`: Page number for pagination (default: 1).

**Responses:**
- `200 OK`: Returns a list of gyms.
- `500 Internal Server Error`: Error fetching gyms.

### 3. Turnstile Management

#### POST `/gyms/:id/turnstiles`
Add a new turnstile to a gym. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the gym.

**Request Body:**
```json
{
  "qrCode": "string"
}
```

**Responses:**
- `201 Created`: Turnstile successfully added.
- `400 Bad Request`: Validation failed.

#### GET `/turnstiles/:id/qrcode`
Get the QR code for a turnstile. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the turnstile.

**Responses:**
- `200 OK`: Returns the QR code.
- `404 Not Found`: Turnstile not found.

#### GET `/turnstiles/:id/check-ins`
Retrieve check-ins for a specific turnstile. (Requires `GYM_OWNER` role)

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the turnstile.

**Responses:**
- `200 OK`: Returns a list of check-ins.
- `404 Not Found`: Turnstile not found.

### 4. QR Code Processing

#### POST `/process-qr`
Process a QR code for gym entry.

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "qrCode": "string"
}
```

**Responses:**
- `200 OK`: QR code processed successfully.
- `400 Bad Request`: Invalid QR code.

### 5. Gym Member Management

#### POST `/gyms/:id/register`
Register a user to a gym.

**Headers:**
```text
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `id`: UUID of the gym.

**Responses:**
- `201 Created`: User successfully registered to gym.
- `400 Bad Request`: Registration failed.
