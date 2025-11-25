# Assignment Backend

A lightweight **Node.js REST API** for task management. This backend provides user authentication, task management endpoints, and Swagger API documentation.

---

## 📁 Project Structure

```
src/
├─ app.js              # Application entry and server bootstrap
├─ swagger.js          # Swagger/OpenAPI setup
├─ config/db.js        # MongoDB connection logic
├─ controllers/        # Controllers for auth, users, and tasks
├─ routes/v1/          # Route definitions (auth, users, tasks)
├─ models/             # Mongoose models (user.model.js, task.model.js)
├─ middlewares/        # Authentication, validation, error handling
├─ seed/seedAdmin.js   # Script to seed initial admin user
├─ utils/jwt.js        # JWT helper utilities
```

---

## 💻 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **Swagger** for API docs

---

## ⚙️ Prerequisites

- Node.js >= 14 (recommend 16+)
- npm or yarn
- A running MongoDB instance (local or hosted)

---

## 🚀 Quick Setup

1. **Clone the repository**

```bash
git clone <repo-url> assignment-backend
cd assignment-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file** (see below for details)

4. **Run the server**

- Directly with Node:

```bash
node src/app.js
```

- In development with nodemon:

```bash
npx nodemon src/app.js
```

Server listens on the port defined in `PORT` (default: `3000`).

---

## 📦 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/assignment_db

# JWT
JWT_SECRET=your_jwt_secret_here

CLIENT_URL=CLient_url(Front-end);

```

> Adjust values as needed. This file should **not** be committed to version control. Use `.env.example` for safe sharing.

---

## 🗄 Database

- Ensure MongoDB is running and reachable at `MONGO_URI`.
- The app connects using the settings in `src/config/db.js`.

---

## 👤 Seeding an Admin User

To create a default admin user:

```bash
node src/seed/seedAdmin.js
```

Check `src/seed/seedAdmin.js` for the expected environment variables.

---

## 📄 API Documentation (Swagger)

- Swagger is set up in `src/swagger.js`.
- Start the server and navigate to:

```
http://localhost:3000/api-docs
```

> Adjust the port if necessary. Check `src/app.js` if the route differs.

---

## 🔗 Routes Summary

### Auth

- `POST /v1/auth/login` – login
- `POST /v1/auth/register` – register (if implemented)

### Tasks

- `GET /v1/tasks` – list tasks (auth required)
- `POST /v1/tasks` – create task (auth required)

### Users

- `GET /v1/users` – list users (admin or protected)

> See `src/routes/v1/` for full route definitions.

**Protected routes** require JWT in the header:

```
Authorization: Bearer <token>
```

---

## 🛠 Troubleshooting

- **Server fails to start:** check env vars or DB connection.
- **MongoDB connection fails:** verify `MONGO_URI`.
- **Authentication fails:** ensure `JWT_SECRET` is consistent.

---

## 📌 Next Steps / Suggestions

- Add `.env.example` based on the above environment variables.
- Add npm scripts in `package.json`:

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

- Write integration tests and add a test script.

---

## 🔍 Where to Look in Code

- **App bootstrap & middleware:** `src/app.js`
- **DB & models:** `src/config/db.js`, `src/models/`
- **Routes:** `src/routes/v1/`
- **Controllers:** `src/controllers/`
- **Seed data:** `src/seed/seedAdmin.js`
- **Swagger:** `src/swagger.js`

---

## ⚖ License

Add a license (e.g., MIT) by creating a `LICENSE` file.

---

## 📌 Notes

- Consider committing a `.env.example` file so others can quickly see required environment variables.
- The Swagger UI provides interactive documentation for testing endpoints without Postman.
