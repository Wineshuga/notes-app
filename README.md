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

## ⚙️ Get Started

  Go to the **backend** folder for API setup and run instructions.
  Go to the **frontend** folder for React app setup and run instructions.

## Links to Sub-READMEs
- [Backend README](./backend/README.md)  
- [Frontend README](./frontend/README.md)

## 📈 Future Improvements (Bonus Ideas)

* Add pagination for large datasets
* Add input validation layer
* Add API authentication layer (JWT or API keys)

---

## 👤 Author

Built as a serverless full-stack project demonstrating AWS + Cloudflare integration and modern frontend deployment practices.
