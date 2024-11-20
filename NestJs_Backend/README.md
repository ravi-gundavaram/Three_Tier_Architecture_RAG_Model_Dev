Prerequisites
Node.js (>= 14.x) and npm (>= 6.x): Install from Node.js official site.
PostgreSQL: Ensure a PostgreSQL database is running and accessible.
NestJS CLI: Install globally:

npm install -g @nestjs/cli

===============================================================================================================

Installation
Navigate to the NestJS_Backend directory.
Install the required dependencies:

npm install
Environment Configuration
Create a .env file in the root of the NestJS_Backend directory with the following content:

PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=db_user
DATABASE_PASSWORD=db_password
DATABASE_NAME=db_name

Running the Application
Development Mode
Start the development server:

npm run start:dev
The application will be available at:

http://localhost:3000
Production Mode
Build and run the application:

npm run build
npm run start:prod
API Endpoints
Authentication
Register:

URL: POST /auth/register
Payload:

{
  "username": "user1",
  "password": "password123"
}
Login:

URL: POST /auth/login
Payload:

{
  "username": "user1",
  "password": "password123"
}
Response:

{
  "accessToken": "your_jwt_token"
}
Document Management
List Documents:

URL: GET /documents
Add Document:

URL: POST /documents
Payload:

{
  "docId": "doc1",
  "content": "Document content here."
}
Update Document:

URL: PUT /documents/:id
Payload:

{
  "content": "Updated document content."
}
Delete Document:

URL: DELETE /documents/:id
Testing
Unit Tests
Run the unit tests using:

npm run test
End-to-End Tests
Run the e2e tests using:

npm run test:e2e
Docker Integration
Dockerfile
The Dockerfile is included for containerizing the backend.

Build Docker Image
From the NestJS_Backend directory, build the Docker image:

docker build -t nestjs-backend .
Run Docker Container
Run the container:

docker run -p 3000:3000 --env-file .env nestjs-backend
The application will be accessible at:

http://localhost:3000
Checklist Before Deployment
Ensure .env file is correctly configured for the production environment.
Verify all tests pass using npm run test and npm run test:e2e.
Build the application for production:

npm run build