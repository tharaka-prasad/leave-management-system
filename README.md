# Leave Management System

## Project Overview
This Leave Management System is a web application designed to manage employee leave requests efficiently. It provides functionalities for employees to apply for leaves, and for administrators to manage and track leave records. The backend is built with Laravel, and the frontend is developed using React.

## Setup Instructions

### Backend Setup (Laravel)
1. Navigate to the backend directory:
   ```bash
   cd backend/laravel
   ```
2. Install PHP dependencies using Composer:
   ```bash
   composer install
   ```
3. Copy the example environment file and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set your database credentials in the `.env` file (see Database Credentials section).
5. Generate the application key:
   ```bash
   php artisan key:generate
   ```
6. Run database migrations:
   ```bash
   php artisan migrate
   ```
7. Seed the database with default data:
   ```bash
   php artisan db:seed
   ```
8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend/react
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```


## API Documentation

### Authentication
- **POST** `/api/register`  
  Register a new user.  
  **Request Body:**  
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "password_confirmation": "string"
  }
  ```  
  **Response:**  
  ```json
  {
    "message": "User registered successfully"
  }
  ```

- **POST** `/api/login`  
  Login a user.  
  **Request Body:**  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```  
  **Response:**  
  ```json
  {
    "token": "string",
    "token_type": "Bearer"
  }
  ```

### User
- **GET** `/api/user`  
  Get authenticated user details.  
  **Response:**  
  ```json
  {
    "id": 1,
    "first_name": "Admin",
    "last_name": "User",
    "email": "admin@example.com",
    ...
  }
  ```

- **GET** `/api/all-users`  
  Get list of all users (admin only).  
  **Response:**  
  ```json
  [
    {
      "id": 1,
      "first_name": "Admin",
      "last_name": "User",
      "email": "admin@example.com",
      ...
    },
    ...
  ]
  ```

### Leaves
- **GET** `/api/leaves`  
  Get all leave records.  
  **Response:**  
  ```json
  [
    {
      "id": 1,
      "start_date": "2024-01-01",
      "end_date": "2024-01-05",
      "status": "pending",
      "createdByUser": {
        "id": 1,
        "name": "Admin User"
      }
    },
    ...
  ]
  ```

- **GET** `/api/leaves-current-user`  
  Get leave records of the authenticated user.  
  **Response:** Same as above but filtered by user.

- **POST** `/api/leaves`  
  Create a new leave request.  
  **Request Body:**  
  ```json
  {
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "reason": "string"
  }
  ```  
  **Response:**  
  ```json
  {
    "message": "Leave record created successfully!",
    "record": {
      "id": 2,
      "start_date": "2024-02-01",
      "end_date": "2024-02-05",
      "status": "pending",
      ...
    }
  }
  ```

- **PUT** `/api/leaves/{id}/update`  
  Update a leave request (only if status is pending).  
  **Request Body:** Same as POST /api/leaves.  
  **Response:**  
  ```json
  {
    "message": "Leave record updated successfully!",
    "record": { ... }
  }
  ```

- **PUT** `/api/leaves/{id}/updateStatus`  
  Update leave status (approve/reject).  
  **Request Body:**  
  ```json
  {
    "status": "approved" | "rejected" | "pending"
  }
  ```  
  **Response:**  
  ```json
  {
    "message": "Leave status updated successfully!",
    "record": { ... }
  }
  ```

- **DELETE** `/api/leaves/{id}/delete`  
  Delete a leave record.  
  **Response:**  
  ```json
  {
    "message": "Record deleted successfully!"
  }
  ```

- **GET** `/api/leave-stats`  
  Get leave statistics.  
  **Response:**  
  ```json
  {
    "total": 10,
    "approved": 5,
    "pending": 3,
    "rejected": 2
  }
  ```

## Database Credentials (Localhost Configuration)
Set the following in your `.env` file for local development:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=forge
DB_USERNAME=forge
DB_PASSWORD=
```

## Seeder Instructions
To seed the database with default users, run the following command in the backend directory:

```bash
php artisan db:seed
```

## Default Credentials

| Role     | Email               | Password |
|----------|---------------------|----------|
| Admin    | admin@example.com   | password |
| Employee | employee1@example.com | password |


