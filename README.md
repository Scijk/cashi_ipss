# 🏦 API de Cashi

API REST de finanzas personales para la startup Cashi. Sistema modular para gestionar categorías y transacciones con validaciones completas y arquitectura escalable.

**Desarrollado con:** Claude Haiku 4.5 (GitHub Copilot)

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints de la API](#endpoints-de-la-api)
- [Pruebas con Bruno](#pruebas-con-bruno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Información Importante](#información-importante)

## ✨ Características

- ✅ API REST completa para gestionar categorías y transacciones
- ✅ Arquitectura N-Layer: rutas → controladores → repositorios → esquemas
- ✅ Validación robusta de datos con Zod
- ✅ ORM de base de datos con Prisma
- ✅ Docker Compose para base de datos PostgreSQL
- ✅ Validaciones de dependencias (no se pueden eliminar categorías con transacciones)
- ✅ Validaciones de registros existentes
- ✅ Manejo completo de errores HTTP

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **TypeScript** | ^5.0.0 | JavaScript con tipado estático |
| **Hono** | ^4.0.0 | Framework web minimalista y rápido |
| **Prisma** | ^5.0.0 | ORM para base de datos |
| **Zod** | ^3.22.0 | Validación de esquemas TypeScript-first |
| **PostgreSQL** | 15 | Base de datos relacional |
| **Docker** | 20+ | Contenedorización |
| **Docker Compose** | 1.29+ | Orquestación de contenedores |
| **tsx** | ^4.0.0 | Executor de TypeScript para desarrollo |

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** versión 18 o superior: [Descargar](https://nodejs.org/)
- **npm** versión 9 o superior (incluido con Node.js)
- **Docker Desktop**: [Descargar](https://www.docker.com/products/docker-desktop)
- **Git**: [Descargar](https://git-scm.com/)

Verifica las versiones:
```bash
node --version      # Debe ser v18.0.0 o superior
npm --version       # Debe ser 9.0.0 o superior
docker --version    # Debe estar instalado
docker-compose --version  # Debe estar instalado
```

## 🚀 Instalación

### Paso 1: Clonar el Repositorio

```bash
git clone <repository-url>
cd cashi_ipss
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias especificadas en `package.json`:
- `@hono/node-server`: Servidor Node.js para Hono
- `@prisma/client`: Cliente de Prisma
- `hono`: Framework web
- `zod`: Validación de esquemas

## ⚙️ Configuración

### Paso 1: Iniciar la Base de Datos

```bash
npm run docker:up
```

Este comando iniciará un contenedor PostgreSQL con la siguiente configuración:

```
Puerto: 5432
Usuario: cashi_user
Contraseña: cashi_password
Base de datos: cashi_db
```

**Nota:** Los datos se persisten en un volumen de Docker llamado `postgres_data`.

### Paso 2: Generar el Cliente de Prisma

```bash
npm run db:generate
```

Este comando genera el cliente de Prisma basado en el esquema de base de datos.

### Paso 3: Ejecutar las Migraciones

```bash
npm run db:migrate
```

Este comando ejecuta todas las migraciones pendientes y crea las tablas en la base de datos:
- Tabla `Category`: Almacena categorías de transacciones
- Tabla `Transaction`: Almacena las transacciones con referencias a categorías

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm run dev
```

Inicia el servidor en modo desarrollo con recarga automática (hot reload).
- API disponible en: `http://localhost:3000`
- Habilita debugging y logs detallados

### Modo Producción

```bash
npm run build
npm start
```

1. `npm run build`: Compila TypeScript a JavaScript en la carpeta `dist/`
2. `npm start`: Inicia el servidor compilado

## 📡 Endpoints de la API

### Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/categories` | Obtener todas las categorías |
| `GET` | `/categories/:id` | Obtener categoría por ID |
| `POST` | `/categories` | Crear nueva categoría |
| `PATCH` | `/categories/:id` | Actualizar categoría |
| `DELETE` | `/categories/:id` | Eliminar categoría (solo si no tiene transacciones) |

**Ejemplo: Crear una categoría**
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Comida"}'
```

### Transacciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/transactions` | Obtener todas las transacciones |
| `GET` | `/transactions/:id` | Obtener transacción por ID |
| `POST` | `/transactions` | Crear nueva transacción |
| `PATCH` | `/transactions/:id` | Actualizar transacción |
| `DELETE` | `/transactions/:id` | Eliminar transacción |
| `GET` | `/transactions/balance` | Obtener resumen de balance |

**Ejemplo: Crear una transacción**
```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "type": "expense",
    "description": "Comida en restaurante",
    "date": "2026-05-10T15:30:00.000Z",
    "categoryId": 1
  }'
```

**Ejemplo: Obtener balance**
```bash
curl http://localhost:3000/transactions/balance
```

Respuesta:
```json
{
  "totalIncome": 1000.00,
  "totalExpense": 250.50,
  "balance": 749.50
}
```

### Códigos de Respuesta HTTP

- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Validación fallida (datos inválidos)
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: No se puede completar la acción (ej: eliminar categoría con transacciones)

## 🧪 Pruebas con Bruno

Bruno es una herramienta ligera y moderna para probar APIs. El proyecto incluye una colección de Bruno con solicitudes preconfiguradas.

### Requisitos

- Descargar Bruno: [https://www.usebruno.com/](https://www.usebruno.com/)

### Configuración en Bruno

1. Abre Bruno
2. Haz clic en "Open Collection"
3. Navega a la carpeta `bruno/` del proyecto
4. Selecciona `bruno.json`

### Usar la Colección

1. En Bruno, ve a la sección "Environments"
2. Selecciona el entorno `local`
3. Las variables están preconfiguradas:
   - `base_url`: http://localhost:3000

4. Ejecuta las solicitudes predefinidas:
   - Create Category
   - Create Income Transaction
   - Create Expense Transaction
   - Get All Categories
   - Get All Transactions
   - Get Balance
   - Update Category
   - Update Transaction
   - Delete Transaction
   - Delete Category

## 📁 Estructura del Proyecto

```
cashi_ipss/
├── src/
│   ├── controllers/              # Lógica de negocio y manejo de solicitudes
│   │   ├── categoryController.ts
│   │   └── transactionController.ts
│   ├── repositories/             # Capa de acceso a datos
│   │   ├── categoryRepository.ts
│   │   └── transactionRepository.ts
│   ├── routes/                   # Definición de rutas de la API
│   │   ├── categoryRoutes.ts
│   │   └── transactionRoutes.ts
│   ├── schemas/                  # Esquemas de validación con Zod
│   │   ├── categorySchema.ts
│   │   └── transactionSchema.ts
│   └── index.ts                  # Punto de entrada de la aplicación
├── prisma/
│   ├── schema.prisma             # Esquema de base de datos
│   └── migrations/               # Historial de migraciones
├── bruno/                        # Colección de pruebas con Bruno
│   ├── bruno.json
│   ├── environments/
│   └── *.bru                     # Solicitudes individuales
├── docker-compose.yml            # Configuración de Docker Compose
├── package.json                  # Dependencias y scripts del proyecto
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Este archivo
```

## ℹ️ Información Importante

### Variables de Entorno (Opcional)

Si deseas personalizar las credenciales de PostgreSQL, puedes crear un archivo `.env`:

```env
DATABASE_URL="postgresql://cashi_user:cashi_password@localhost:5432/cashi_db?schema=public"
```

Nota: El `docker-compose.yml` ya contiene estas credenciales por defecto.

### Comandos Útiles

```bash
# Desarrollo
npm run dev                  # Inicia servidor con hot reload
npm run db:migrate          # Ejecuta migraciones
npm run db:generate         # Regenera cliente Prisma
npm run db:push             # Sincroniza esquema con BD
npm run db:studio           # Abre Prisma Studio (interfaz visual)

# Docker
npm run docker:up           # Inicia contenedores
npm run docker:down         # Detiene y elimina contenedores

# Producción
npm run build               # Compila a JavaScript
npm start                   # Inicia servidor compilado
```

### Detener la Aplicación

Para detener la aplicación y la base de datos:

```bash
# Detener servidor (Ctrl+C en la terminal)
# Detener base de datos
npm run docker:down
```

### Troubleshooting

**Error: "Port 5432 already in use"**
```bash
# El puerto está en uso, detén el contenedor anterior
npm run docker:down
npm run docker:up
```

**Error: "Cannot find module 'prisma'"**
```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

**Error: "Migration failed"**
```bash
# Regenera el cliente Prisma
npm run db:generate
npm run db:migrate
```

## 📝 Información del Desarrollo

- **Agente de IA utilizado:** Claude Haiku 4.5 (GitHub Copilot)
- **Propósito:** API REST para gestión de finanzas personales
- **Arquitectura:** N-Layer con separación de responsabilidades
- **Validaciones:** Completas en controllers y repositories
- **Versionado:** Próximamente (v1.0.0)

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
