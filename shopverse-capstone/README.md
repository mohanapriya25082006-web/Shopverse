# ShopVerse — Full-Stack E-Commerce Capstone

A beginner-friendly full-stack product catalog built with React + Vite, React Router, Spring Boot, Spring Data JPA, and PostgreSQL.

## Features
- Responsive product catalog with search and category filters
- Product detail pages and client-side routing
- Shopping cart stored in browser localStorage
- REST API for product listing and product details
- PostgreSQL persistence, with H2 available for local quick-start
- Environment-based configuration for deployment
- Production frontend build with Vite asset minification

> This is a capstone starter, not a payment-processing system. Do not collect real card details. Add authentication, payment-provider integration, inventory reservation, rate limiting, and production monitoring before accepting real orders.

## Project structure
```text
shopverse-capstone/
├── frontend/                 # React application
└── backend/                  # Spring Boot REST API
```

## Requirements
- Node.js 20+
- Java 21
- Maven 3.9+
- PostgreSQL 15+ (optional for local H2 profile)

## 1. Run the backend (H2 local database)
PowerShell:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
If Maven Wrapper is not present on your machine, use:
```powershell
mvn spring-boot:run
```
API: `http://localhost:8080/api/products`

The default local profile uses an in-memory H2 database and seeds sample products.

## 2. Run the frontend
Open a second PowerShell terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## 3. Build for production
```powershell
cd frontend
npm run build
```
The optimized static site is written to `frontend/dist`.

## 4. Deploy
### Backend — Render
1. Push this project to a GitHub repository.
2. Create a new **Web Service** in Render and select the repository.
3. Set the Root Directory to `backend`.
4. Build command: `./mvnw clean package` (or `mvn clean package` if using a Maven build environment).
5. Start command: `java -jar target/shopverse-api-1.0.0.jar`.
6. Add environment variables:
   - `SPRING_PROFILES_ACTIVE=prod`
   - `DATABASE_URL=jdbc:postgresql://<host>:5432/<database>`
   - `DB_USERNAME=<database-user>`
   - `DB_PASSWORD=<database-password>`
   - `CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>`
7. Attach a managed PostgreSQL database and use its internal connection details.

### Frontend — Vercel
1. Import the same GitHub repository into Vercel.
2. Set Root Directory to `frontend`.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variable `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api`.
7. Redeploy after setting the variable.

For a single-page app, add `frontend/vercel.json` (included) so direct navigation to `/products/1` rewrites to `index.html`.

## API
- `GET /api/products` — all products; optional `q` and `category` query parameters
- `GET /api/products/{id}` — one product
- `GET /api/health` — health check

## Notes
- The frontend falls back to sample catalog data if the API is temporarily unavailable, so the UI remains explorable during development.
- The cart is browser-local and is not synchronized across devices.
- Before production launch, configure a persistent database, HTTPS, backups, monitoring, secure authentication, and a real payment provider.
