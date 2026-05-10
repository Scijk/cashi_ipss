# API de Cashi

API de finanzas personales para la startup Cashi. Construida con TypeScript, Hono, Prisma, Zod, Docker y PostgreSQL.

## Características

- API REST para gestionar categorías y transacciones
- Arquitectura N-Layer: rutas, controladores, repositorios, esquemas
- Validación de datos con Zod
- ORM de base de datos con Prisma
- Docker Compose para base de datos PostgreSQL

## Tecnologías

- **TypeScript**: JavaScript con tipos seguros
- **Hono**: Framework web ligero
- **Prisma**: ORM de base de datos
- **Zod**: Validación de esquemas
- **Docker**: Contenedorización
- **PostgreSQL**: Base de datos

## Estructura del Proyecto

```
src/
├── controllers/     # Capa de lógica de negocio
├── repositories/    # Capa de acceso a datos
├── routes/          # Rutas de la API
├── schemas/         # Esquemas de validación
└── index.ts         # Punto de entrada de la aplicación
prisma/
└── schema.prisma    # Esquema de base de datos
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   cd cashi_ipss
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la base de datos:
   ```bash
   npm run docker:up
   ```

4. Genera el cliente de Prisma:
   ```bash
   npm run db:generate
   ```

5. Ejecuta las migraciones de base de datos:
   ```bash
   npm run db:migrate
   ```

## Ejecutando la Aplicación

### Desarrollo
```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

### Producción
```bash
npm run build
npm start
```

## Endpoints de la API

### Categorías
- `GET /categories` - Obtener todas las categorías
- `GET /categories/:id` - Obtener categoría por ID
- `POST /categories` - Crear nueva categoría
- `PATCH /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría

### Transacciones
- `GET /transactions` - Obtener todas las transacciones
- `GET /transactions/:id` - Obtener transacción por ID
- `POST /transactions` - Crear nueva transacción
- `PATCH /transactions/:id` - Actualizar transacción
- `DELETE /transactions/:id` - Eliminar transacción
- `GET /transactions/balance` - Obtener resumen de balance de cuenta (totalIncome, totalExpense, balance)

## Pruebas con Bruno

Bruno es una herramienta ligera para probar APIs. El proyecto incluye una colección de Bruno con solicitudes preconfiguradas para todos los endpoints.

### Configurar Bruno

1. Descarga e instala Bruno desde [bruno.app](https://www.usebruno.com/)
2. Abre Bruno e importa la colección desde la carpeta `bruno/` en la raíz del proyecto
3. Selecciona el ambiente "local" (configurado para `http://localhost:3000`)

### Solicitudes Disponibles

La colección incluye solicitudes para:
- **Categorías**: Operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
- **Transacciones**: Operaciones CRUD + cálculo de balance
- Datos de ejemplo para pruebas (ingresos/gastos)

### Ejecutando Pruebas

1. Inicia el servidor de la API: `npm run dev`
2. Inicia PostgreSQL: `npm run docker:up`
3. Abre Bruno y ejecuta las solicitudes en orden (los números de secuencia indican el orden recomendado)

Nota: Algunas solicitudes usan IDs fijos (1, 2) para simplicidad. Ajusta según sea necesario basado en tus datos.

## Base de Datos

La base de datos está gestionada con Docker Compose. Para detener la base de datos:

```bash
npm run docker:down
```

Para ver la base de datos en Prisma Studio:

```bash
npm run db:studio
```
