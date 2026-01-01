---
# 🧭 INTours API

A structured and scalable **Node.js + Express REST API** for managing Indian tourist destinations.
This project demonstrates **backend fundamentals**, **clean architecture**, and **multiple implementation strategies** using Git branches.
---

## 📌 Overview

INTours is a backend API that allows users to explore tourist destinations with features such as:

- Filtering
- Sorting
- Pagination
- CRUD operations
- Modular architecture
- MongoDB integration (optional branch)

The project is intentionally designed with **two different backend approaches** to demonstrate architectural flexibility.

---

## ✨ Key Features

- Filter tours by:
  - Region
  - State
  - Name
  - Rating (ascending / descending)

- Combine multiple filters
- Pagination support
- Full CRUD functionality
- Clean and predictable API responses
- Modular folder structure
- Easy to extend and scale

---

## 🧩 Project Structure

```
project/
│
├── dev-data/
│   └── data/
│       └── csvjson.json
│
├── filter/
│   └── filter.js
│
├── routes/
│   ├── tourRouter.js
│   └── userRouter.js
│
├── controllers/
│   ├── filterController.js
│   ├── tourController.js
│   └── userController.js
│
├── models/
│   └── tourModel.js
│
├── app.js
├── server.js
│
├──  config.env
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json
└── README.md
```

---

## 🌿 Branch Structure

This repository contains **two main branches**, each showcasing a different backend approach.

---

### 🔹 `main` — Local Data Version

This branch uses **local in-memory data**.

✔ Best for understanding:

- Core backend logic
- Filtering & sorting mechanics
- API routing and controllers

✔ No database required

---

### 🔹 `mongodb-setup` — Database Version

This branch integrates **MongoDB with Mongoose**.

✔ Uses schema-based models
✔ Persistent data storage
✔ Environment variables
✔ Scalable & production-ready

---

### 🔄 Switching Between Branches

```bash
# Local version
git checkout main

# MongoDB version
git checkout mongodb-setup
```

---

## 🔐 Environment Setup (MongoDB Branch)

When using the `mongodb-setup` branch, create a `.env` file in the root directory:

```env
DATABASE=your_mongodb_connection_string
PORT=8000
```

> ⚠️ `.env` is excluded from version control for security reasons.

---

## ▶️ Running the Project

### Install dependencies:

```bash
npm install
```

### Start the server:

```bash
npm start
```

Server will run at:

```
http://localhost:8000
```

---

## 📡 API Endpoints

### ✅ Get all tours

```
GET /api/v1/tours
```

---

### ✅ Get tour by ID

```
GET /api/v1/tours/:id
```

---

### ✅ Create a new tour

```
POST /api/v1/tours
```

**Example body:**

```json
{
  "Name": "New Tour",
  "State": "Delhi",
  "Zone": "Northern",
  "Google review rating": 4.5
}
```

---

### ✅ Update a tour

```
PATCH /api/v1/tours/:id
```

**Example body:**

```json
{
  "Name": "Updated Tour Name",
  "Google review rating": 4.8
}
```

✔ Only provided fields are updated
✔ Others remain unchanged

---

### ✅ Delete a tour

```
DELETE /api/v1/tours/:id
```

Deletes the tour permanently.

---

## 🔍 Filtering & Sorting

### Filter by region

```
GET /api/v1/tours?region=Northern
```

### Filter by state

```
GET /api/v1/tours?state=Delhi
```

### Filter by name

```
GET /api/v1/tours?name=gate
```

### Sort by rating

```
GET /api/v1/tours?rating=d
```

- `a` → ascending
- `d` → descending

---

### Combine filters

```
GET /api/v1/tours?region=Northern&state=Delhi&rating=d
```

---

## 📦 Sample Response

```json
{
  "meta": {
    "region": "Northern",
    "states": ["Delhi", "Punjab"]
  },
  "data": [
    {
      "Name": "India Gate",
      "State": "Delhi",
      "Zone": "Northern"
    }
  ]
}
```

---

## 🧠 Filtering Rules

| Filter | Description           |
| ------ | --------------------- |
| region | Filters by region     |
| state  | Filters by state      |
| name   | Partial name matching |
| rating | Sorts by rating       |

All filters can be combined.

---

## 🧪 Example Requests

```bash
curl "http://localhost:8000/api/v1/tours?region=Northern"
curl "http://localhost:8000/api/v1/tours?state=Delhi"
curl "http://localhost:8000/api/v1/tours?rating=d"
```

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB (optional branch)
- Mongoose
- JavaScript (ES6+)
- Postman (API testing)

---

## 🚀 Future Improvements

- Pagination metadata
- Authentication & authorization
- Role-based access control
- API versioning
- Centralized error handling
- Docker support

---

## ✅ Project Status

✔ Actively maintained
✔ Clean architecture
✔ Beginner & recruiter friendly

---

## 💡 Why This Project?

This project demonstrates:

- Practical backend development
- Clean code practices
- Real-world API design
- Git branching workflows
- Progressive enhancement

---

## 🤝 Contributions

Feel free to fork, explore, and improve the project.

---

## ⭐ Final Note

This project was built for **learning and experimentation**, while maintaining production-level discipline.

---
