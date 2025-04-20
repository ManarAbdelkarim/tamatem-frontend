# 🎮 Tamatem Store - Frontend

A responsive and authenticated client application built with **Next.js** for the Tamatem Store backend API.

This app allows users to log in, view products, filter by location, make purchases, and view order receipts — all secured via JWT authentication.

---

## 🚀 Features

- 🔐 JWT-based authentication using access & refresh tokens
- 🌍 Product listing with pagination and filtering by location (`JO` / `SA`)
- 📄 Product details with purchase button
- 🧾 Receipt page after purchase
- 🔄 Automatic token refreshing via interceptor
- 🔒 Protected routes with middleware and `AuthGuard`
- 💅 Styled using Tailwind CSS

---

## 📦 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [JWT Decode](https://www.npmjs.com/package/jwt-decode)
- [js-cookie](https://www.npmjs.com/package/js-cookie)

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```
    git clone git@github.com:ManarAbdelkarim/tamatem-frontend.git
    cd tamatem-frontend
```

### 2. Install dependencies

```
npm install
```
### 3. Run the development server

```
npm run dev
```

Open http://localhost:3000 in your browser.

Make sure the backend API is running on http://localhost:8000

Route                     | Description
---------------------------|------------------------------------------
/login                    | Login page (username/password)
/products                 | List all products (with filtering)
/products/:id             | Product details page
/products/:id/receipt?order=| Receipt page after purchase

## 🔐 Authentication Flow

- On login, access & refresh tokens are stored in localStorage and access_token in cookie

- Protected pages check token validity using:

    - Axios interceptor (for API calls)

    - AuthGuard component (for route-level protection)

- If the token is expired and refresh token is valid, a new token is fetched automatically

## ✨ Author
**Manar Abdelkarim**

**GitHub: @ManarAbdelkarim**

