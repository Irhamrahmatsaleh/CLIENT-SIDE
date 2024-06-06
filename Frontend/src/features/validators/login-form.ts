import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email harus berupa string!" })
    .email({ message: "Mohon masukkan email yang valid!" }),
  password: z.string({ message: "Email harus berupa string!" }),
});