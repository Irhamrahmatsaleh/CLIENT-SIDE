import { z } from "zod";

export const resetSchema = z.object({
  password: z.string({ message: "Password harus berupa string!" }),
  c_password: z.string({ message: "Password harus berupa string!" }),
});