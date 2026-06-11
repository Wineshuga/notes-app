# Notes App (Serverless CRUD API)

A secure, serverless notes application built with AWS Lambda, API Gateway, DynamoDB, React, and Cloudflare Access authentication.

---

## 🚀 Overview

This project is a full-stack serverless notes application that allows authenticated users to:

* Create notes
* Read all notes
* Update notes
* Delete notes

It demonstrates a clean serverless architecture using AWS and a simple frontend UI for interaction.

---

## 🧱 Architecture

```
Frontend (React + Netlify)
        ↓
Cloudflare Access (Authentication Layer)
        ↓
API Gateway (AWS)
        ↓
AWS Lambda Functions (CRUD Logic)
        ↓
DynamoDB (Data Storage)
```

---

## 🔐 Authentication

Authentication is handled using **Cloudflare Access**.

* Only logged-in users can access the frontend application
* After authentication, users can interact with the UI normally
* API calls are made from the authenticated frontend to AWS API Gateway

Cloudflare Access ensures secure entry into the application without modifying backend logic.

---

## ⚙️ Backend (AWS)

Built using AWS SAM and Lambda functions.

### Endpoints

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| GET    | /notes      | Get all notes |
| POST   | /notes      | Create a note |
| PUT    | /notes/{id} | Update a note |
| DELETE | /notes/{id} | Delete a note |

---

## 🗄️ Database

* Amazon DynamoDB
* Single table design: `Notes`
* Fields:

  * `id` (string)
  * `title` (string)
  * `content` (string)
  * `createdAt` (string)
  * `updatedAt` (string)

---

## 💻 Frontend

* Built with React
* Hosted on Netlify
* Simple UI to fetch and display notes
* Communicates with backend via REST API

---

## 🛠️ Tech Stack

* AWS Lambda
* API Gateway
* DynamoDB
* AWS SAM
* React
* Netlify
* Cloudflare Access

---

## 📌 Notes

* Cloudflare Access is used to secure frontend access
* Backend remains stateless and publicly accessible via API Gateway
* CORS is enabled on API responses
* Designed for simplicity and scalability in a serverless environment

---

## 📈 Future Improvements (Bonus Ideas)

* Add per-user note ownership using Cloudflare Access headers
* Add search functionality (filter by title/content)
* Add pagination for large datasets
* Add input validation layer
* Add API authentication layer (JWT or API keys)

---

## 👤 Author

Built as a serverless full-stack project demonstrating AWS + Cloudflare integration and modern frontend deployment practices.
