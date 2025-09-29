import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  password: varchar('password', {length: 97}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
