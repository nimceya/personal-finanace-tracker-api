const { z } = require("zod");

const transactionSchema = z.object({
  title: z.string().min(2),

  amount: z.number(),

  type: z.enum([
    "income",
    "expense",
  ]),

  category: z.string().min(2),
});

module.exports = transactionSchema;