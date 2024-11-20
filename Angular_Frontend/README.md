Features
Upload documents for ingestion.
Interface for generating and viewing answers from the RAG backend.
Seamless integration with backend APIs.
Clean and responsive UI designed for ease of use.

=============================================================================================================

Setup Instructions
Prerequisites
Node.js (>=14.x) and npm (>=6.x): Install from Node.js official site.
Angular CLI: Install globally using:

npm install -g @angular/cli
Installation
Navigate to the Angular_Frontend directory and install dependencies:

cd Angular_Frontend
npm install
Running the Application
Development Mode
To start the development server:

ng serve
The application will be available at:


http://localhost:4200
Build for Production
To build the project for production:

ng build --prod
The production build files will be in the dist/ directory.

Environment Configuration
API endpoints and other configurations are located in src/environments/.

Development: src/environments/environment.ts
Production: src/environments/environment.prod.ts
Example environment.ts configuration:

export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:8000' // Backend base URL
};
API Integration
Endpoints Used
Document Ingestion:

Method: POST
URL: /ingest
Payload:

{
  "doc_id": "doc1",
  "content": "This is document content."
}
Question Answering:

Method: GET
URL: /qna
Query Parameter:
question: User's question.
Document Listing:

Method: GET
URL: /documents
Testing
Unit Testing
Run the unit tests using:

ng test
End-to-End Testing
Run the e2e tests using:

ng e2e

Docker Integration
Dockerfile
The Dockerfile is included for deploying the Angular frontend as a containerized application.

Build Docker Image
Navigate to the project directory and run:


docker build -t angular-frontend .
Run Docker Container
To start the container:


docker run -p 4200:80 angular-frontend
The application will be accessible at:

http://localhost:4200
Checklist Before Deployment
Verify all API integrations are working correctly.
Confirm environment files (environment.ts and environment.prod.ts) point to the correct backend URLs.
Run all tests (ng test and ng e2e) to ensure code stability.
