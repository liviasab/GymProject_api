# GymSystem API Reference

## Authentication

### Register a new user

- **URL:** `/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Success Response:** `201 Created`
- **Error Response:** `400 Bad Request`

**Note:** The `role` field should be either "MEMBER" or "GYM_OWNER". If not provided, it defaults to "MEMBER".

### Authenticate user

- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "token": "string" }`
- **Error Response:** `400 Bad Request`

## Gyms

### Create a new gym

- **URL:** `/gyms`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "phone": "string",
    "latitude": "number",
    "longitude": "number"
  }
  ```
- **Success Response:** 
  - **Code:** `201 Created`
  - **Content:** `{ "gym": Gym }`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

### Get gym details

- **URL:** `/gyms/:id`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "gym": Gym }`
- **Error Response:** `404 Not Found` or `401 Unauthorized`

### Update gym details

- **URL:** `/gyms/:id`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "phone": "string",
    "latitude": "number",
    "longitude": "number"
  }
  ```
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "gym": Gym }`
- **Error Response:** `400 Bad Request`, `401 Unauthorized`, or `404 Not Found`

### Delete a gym

- **URL:** `/gyms/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `204 No Content`
- **Error Response:** `401 Unauthorized` or `404 Not Found`

### Fetch user's gyms

- **URL:** `/user/gyms`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `page=number`
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "gyms": Gym[] }`
- **Error Response:** `401 Unauthorized`

### List or search gyms

- **URL:** `/gyms`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** 
  - `page=number` (optional, default: 1)
  - `per_page=number` (optional, default: 20)
  - `search=string` (optional)
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    {
      "gyms": Gym[],
      "total": number,
      "page": number,
      "per_page": number,
      "total_pages": number
    }
    ```
- **Error Response:** `401 Unauthorized`

## Turnstiles

### Add turnstile to gym

- **URL:** `/gyms/:gymId/turnstiles`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** 
  - **Code:** `201 Created`
  - **Content:** `{ "turnstile": Turnstile }`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

### Get turnstile QR code

- **URL:** `/turnstiles/:id/qrcode`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "qrCode": "string" }`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

### Get turnstile check-ins

- **URL:** `/turnstiles/:id/check-ins`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `page=number`
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "checkIns": CheckIn[] }`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

### List gym turnstiles

- **URL:** `/gyms/:gymId/turnstiles`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "turnstiles": Turnstile[] }`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

### Delete turnstile

- **URL:** `/turnstiles/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `204 No Content`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

## Check-ins

### Process QR code (Check-in)

- **URL:** `/process-qr`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "qrCode": "string"
  }
  ```
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** `{ "message": "Check-in successful" }`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

**Note:** The balance check for check-ins has been removed. Users can now check in regardless of their account balance.

## Gym Membership

### Register to gym

- **URL:** `/gyms/:id/register`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `201 Created`
- **Error Response:** `400 Bad Request` or `401 Unauthorized`

### Get user's gym memberships

- **URL:** `/user/memberships`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** 
  - `page=number` (optional, default: 1)
  - `per_page=number` (optional, default: 20)
- **Success Response:** 
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    {
      "memberships": [
        {
          "gym": Gym,
          "joinedAt": "string (ISO date)"
        }
      ],
      "total": number,
      "page": number,
      "per_page": number,
      "total_pages": number
    }
    ```
- **Error Response:** `401 Unauthorized`