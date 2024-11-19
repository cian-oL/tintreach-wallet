import { Knex } from "knex";

import { Invoice } from "../../models/Invoice";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("invoices").del();

  // Inserts seed entries
  const invoiceSeeds: Invoice[] = [
    {
      id: 1,
      payment_request: "lnbcrt1u1p...",
      memo: "yo",
      value: 100,
      settled: false,
      send: false,
      created_at: new Date(),
      user_id: 1,
    },
    {
      id: 2,
      payment_request: "lnbcrt2u1p...",
      value: 100,
      fees: 10,
      send: true,
      settled: true,
      settle_date: new Date(),
      created_at: new Date(),
      user_id: 2,
    },
  ];

  await knex("invoices").insert(invoiceSeeds);
}
