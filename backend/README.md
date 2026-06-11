# Notes App Backend (AWS Serverless)

A simple serverless backend for a notes application built with AWS Lambda, API Gateway, and DynamoDB using AWS SAM.

---

## 🧱 Architecture

* **AWS Lambda** → Handles CRUD operations
* **API Gateway (REST)** → Exposes HTTP endpoints
* **DynamoDB** → Stores notes data
* **AWS SAM** → Infrastructure as Code + deployment

---

## 📌 Features

* Create a note
* Get all notes
* Update a note
* Delete a note
* CORS enabled for frontend integration

---

## 📁 Project Structure

```
.
├── createNote.js
├── getNotes.js
├── updateNote.js
├── deleteNote.js
├── db.js
├── template.yaml
└── package.json
```

---

## 🚀 Prerequisites

Make sure you have:

* AWS account
* AWS CLI installed and configured
* AWS SAM CLI installed
* Node.js (v18+ recommended)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd notes-app-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure AWS credentials

```bash
aws login
```

You will be redirect for authentication

---

### 4. Build the project

```bash
sam build
```

---

### 5. Deploy to AWS

```bash
sam deploy --guided
```

During setup:

* Stack name: `notes-app`
* Region: choose your AWS region
* Confirm changes: Yes
* Allow SAM to create IAM roles: Yes

---

## 🌐 API Endpoints

After deployment, you will get an API Gateway URL like:

```
https://xxxxx.execute-api.us-east-1.amazonaws.com/Prod
```

### Endpoints

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| POST   | /notes      | Create a note  |
| GET    | /notes      | Get all notes  |
| PUT    | /notes/{id} | Update a note  |
| DELETE | /notes/{id} | Delete a note  |

---

## 🧪 Testing Example (curl)

### Create note

```bash
curl -X POST <API_URL>/notes \
-H "Content-Type: application/json" \
-d '{"title":"Test","content":"Hello"}'
```

### Get all notes

```bash
curl <API_URL>/notes
```

---

## 🔐 CORS

CORS is enabled for all routes:

* Origin: `*`
* Methods: `GET, POST, PUT, DELETE, OPTIONS`

---

## 🧹 Notes

* Each Lambda function is independent
* DynamoDB table name: `Notes`
* Primary key: `id`

---

## 📦 Deployment Notes

If you remove a Lambda or endpoint:

* Also remove it from `template.yaml`
* Then redeploy with `sam deploy`

---

## 🧠 Tech Stack

* AWS Lambda
* API Gateway
* DynamoDB
* Node.js
* AWS SAM

---
