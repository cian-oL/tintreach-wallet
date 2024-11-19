import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("invoices", (table) => {
    table.increments("id").primary();
    table.string("payment_request").notNullable().unique();
    table.integer("value").notNullable();
    table.string("memo");
    table.integer("fees");
    table.boolean("send").notNullable();
    table.boolean("settled").notNullable();
    table.timestamp("settle_date").defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("invoices");
}
