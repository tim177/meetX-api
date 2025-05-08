# MeetX API

A simple RESTful API for managing activities and bookings.

## 📬 Postman Collection

You can explore and test the API endpoints using the Postman collection below:

🔗 [MeetX API Collection on Postman](https://api.postman.com/collections/42108534-043fc83f-1a3e-42cf-a13a-2eaba24d43a3?access_key=PMAT-01JTPJNR7353SVK2H3E083ARYR)

Import this collection into your Postman workspace to start making requests to the MeetX API.

## Overview

MeetX API allows users to register, log in, view activities, and book them. The API includes public endpoints for viewing activities and protected endpoints for user authentication and bookings.

## 📬 Postman Collection

You can explore and test the API endpoints using the Postman collection below:

🔗 [MeetX API Collection on Postman](https://api.postman.com/collections/42108534-043fc83f-1a3e-42cf-a13a-2eaba24d43a3?access_key=PMAT-01JTPJNR7353SVK2H3E083ARYR)


## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/meetx-backend-api.git
   cd meetx-backend-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/meetx
   JWT_SECRET_KEY=your_super_secret_key_here
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "userName": "super",
  "email": "super@admin.com",
  "password": "password123"
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "super@admin.com",
  "password": "password123"
}
```

### Activities

#### Get All Activities (Public)

```
GET /api/activities
```

#### Create Activity

```
POST /api/activities/create
Content-Type: application/json

{
  "title": "Coding Bootcamp",
  "description": "A one-day hands-on coding bootcamp for students.",
  "location": "Graphic Era University",
  "dateTime": "2025-05-15T10:00:00.000Z"
}
```

### Bookings (Protected Routes)

These endpoints require authentication. Include the JWT token in the request header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Create Booking

```
POST /api/bookings
Content-Type: application/json

{
  "activityId": "681bdf14a48b4d8c2840f956"
}
```

#### Get User's Bookings

```
GET /api/bookings
```

## Models

### User

- userName (String, required)
- email (String, required, unique)
- password (String, required, min length: 8)

### Activity

- title (String, required)
- description (String, required)
- location (String, required)
- dateTime (Date, required)

### Booking

- activity (ObjectId, reference to Activity)
- user (ObjectId, reference to User)
- bookedAt (Date, default: now)

## Error Handling

All API endpoints return appropriate status codes and error messages:

- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error

## Development

To run the server in development mode with nodemon:

```bash
npm run dev
```

## Testing

You can test the API endpoints using tools like Postman or the REST Client extension in VS Code.

## License

This project is licensed under the MIT License.
