# 🧭 INTours API

A simple and flexible **Node.js + Express REST API** for managing and filtering tour data.
Supports filtering by **region, state, name, rating**, and includes pagination support.

---

## 🚀 Features

* Filter tours by:

  * Region
  * State
  * Name (standalone)
  * Rating (ascending / descending)
* Combine filters logically
* Pagination support
* Clean and predictable response structure
* Easily extendable

---

## 📁 Project Structure

```
project/
│
├── dev-data/
│   └── data/
│       └── csvjson.json
│
├── filters/
│   ├── filterByRegion.js
│   ├── filterByState.js
│   ├── filterByRating.js
│   ├── filterByName.js
│   └── index.js
│
├── server.js
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
node server.js
```

Server runs on:

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

### ✅ Filter by region

```
GET /api/v1/tours?region=Northern
```

---

### ✅ Filter by state

```
GET /api/v1/tours?state=Delhi
```

---

### ✅ Filter by name (standalone)

```
GET /api/v1/tours?name=gate
```

---

### ✅ Sort by rating

```
GET /api/v1/tours?rating=d
```

* `a` → ascending
* `d` → descending

---

### ✅ Combine filters

```
GET /api/v1/tours?region=Northern&state=Delhi&rating=d
```

---

## 📦 Response Structure

### When filtering by region:

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

### Without region:

```json
{
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

| Filter   | Behavior                           |
| -------- | ---------------------------------- |
| `name`   | Works alone only                   |
| `region` | Can combine with `state`, `rating` |
| `state`  | Works alone or with region         |
| `rating` | Works with any filter              |

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

* Node.js
* Express.js
* JavaScript (ES6+)

---

## 🚧 Future Improvements

* Add pagination metadata
* Add validation middleware
* Add search across multiple fields
* Add caching
* Add database support (MongoDB / PostgreSQL)

---

