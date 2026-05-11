-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- Insert example data for testing
INSERT INTO "categories" ("name") VALUES
  ('Comida'),
  ('Transporte'),
  ('Entretenimiento'),
  ('Salario'),
  ('Servicios');

-- Insert example transactions
INSERT INTO "transactions" ("amount", "type", "description", "date", "categoryId") VALUES
  (2500.00, 'income', 'Salario mensual', '2026-05-01T10:00:00.000Z', 4),
  (45.50, 'expense', 'Almuerzo en restaurante', '2026-05-02T12:30:00.000Z', 1),
  (15.00, 'expense', 'Pasaje transporte', '2026-05-02T08:00:00.000Z', 2),
  (120.00, 'expense', 'Entrada al cine', '2026-05-03T19:00:00.000Z', 3),
  (75.00, 'expense', 'Servicio de internet', '2026-05-05T14:00:00.000Z', 5),
  (1500.00, 'income', 'Freelance proyecto', '2026-05-06T16:30:00.000Z', 4),
  (32.75, 'expense', 'Cena con amigos', '2026-05-07T20:15:00.000Z', 1),
  (25.00, 'expense', 'Uber al trabajo', '2026-05-08T07:45:00.000Z', 2);