# 🧭 INTours API

This is a very common Node.js practice project implemented by me with Indian tours and additional features like filtering and sorting.

A simple and flexible **Node.js + Express REST API** for managing and filtering tour data.
Supports filtering, sorting, pagination, and full CRUD operations.

---

## 🚀 Features

- Filter tours by:
  - Region
  - State
  - Name
  - Rating (ascending / descending)

- Combine filters logically
- Pagination support
- Full CRUD operations (Create, Read, Update, Delete)
- Clean and predictable response structure
- Easily extendable

---

## 📁 Project Structure

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
├── routes
│   └── tourRouter.js
│   └── userRouter.js
│
├── controllers/
│   └── filterController.js
│   └── tourController.js
│   └── userController.js
│
├── app.js
├── server.js
│
├── .prettierrc
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## 🛠️ Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start the server

```bash
npm start
```

Server runs on:

```
http://localhost:8000
```

---

## 📡 API Endpoints

---

### ✅ Get all tours

```
GET /api/v1/tours
```

---

### ✅ Get a tour by ID

```
GET /api/v1/tours/:id
```

---

### ✅ Create a new tour

```
POST /api/v1/tours
```

**Body example:**

```json
{
  "Name": "New Tour",
  "State": "Delhi",
  "Zone": "Northern",
  "Google review rating": 4.5
}
```

---

### ✅ Update a tour (PATCH)

```
PATCH /api/v1/tours/:id
```

**Body example:**

```json
{
  "Name": "Updated Tour Name",
  "Google review rating": 4.8
}
```

✔ Only updates provided fields
✔ Keeps existing values intact

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

### Filter by name (partial match)

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

## 📦 Response Structure

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

| Filter   | Behavior                |
| -------- | ----------------------- |
| `region` | Filters tours by region |
| `state`  | Filters tours by state  |
| `name`   | Filters tours by name   |
| `rating` | Sorts tours by rating   |

All filters can be combined.

---

## 🧪 Example Requests

```bash
curl "http://localhost:8000/api/v1/tours?region=Northern"
curl "http://localhost:8000/api/v1/tours?state=Delhi"
curl "http://localhost:8000/api/v1/tours?rating=d"
curl "http://localhost:8000/api/v1/tours?region=Northern&state=Delhi&rating=d"
```

---

## 🧩 Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- Postman (testing)

---

## 🚧 Future Improvements

- Pagination metadata
- Request validation
- Centralized error handling
- Database integration (MongoDB / PostgreSQL)
- Authentication & authorization

---

## ✅ Status

✔ Actively developed
✔ Clean architecture
✔ Easy to extend

---
