# Cashi API

Personal finance API for Cashi startup. Built with TypeScript, Hono, Prisma, Zod, Docker, and PostgreSQL.

## Features

- REST API for managing categories and transactions
- N-Layer architecture: routes, controllers, repositories, schemas
- Data validation with Zod
- Database ORM with Prisma
- Docker Compose for PostgreSQL database

## Tech Stack

- **TypeScript**: Type-safe JavaScript
- **Hono**: Lightweight web framework
- **Prisma**: Database ORM
- **Zod**: Schema validation
- **Docker**: Containerization
- **PostgreSQL**: Database

## Project Structure

```
src/
├── controllers/     # Business logic layer
├── repositories/    # Data access layer
├── routes/          # API routes
├── schemas/         # Validation schemas
└── index.ts         # Application entry point
prisma/
└── schema.prisma    # Database schema
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cashi_ipss
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the database:
   ```bash
   npm run docker:up
   ```

4. Generate Prisma client:
   ```bash
   npm run db:generate
   ```

5. Run database migrations:
   ```bash
   npm run db:migrate
   ```

## Running the Application

### Development
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Transactions
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction by ID
- `POST /transactions` - Create new transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction
- `GET /transactions/balance` - Get account balance

## Testing with Bruno

Bruno is a lightweight API testing tool. The project includes a Bruno collection with pre-configured requests for all endpoints.

### Setup Bruno

1. Download and install Bruno from [bruno.app](https://www.usebruno.com/)
2. Open Bruno and import the collection from `bruno/` folder in the project root
3. Select the "local" environment (configured for `http://localhost:3000`)

### Available Requests

The collection includes requests for:
- **Categories**: CRUD operations (Create, Read, Update, Delete)
- **Transactions**: CRUD operations + balance calculation
- Sample data for testing (income/expense transactions)

### Running Tests

1. Start the API server: `npm run dev`
2. Start PostgreSQL: `npm run docker:up`
3. Open Bruno and run the requests in order (seq numbers indicate recommended order)

Note: Some requests use hardcoded IDs (1, 2) for simplicity. Adjust as needed based on your data.

## Database

The database is managed with Docker Compose. To stop the database:

```bash
npm run docker:down
```

To view the database in Prisma Studio:

```bash
npm run db:studio
```
