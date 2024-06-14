import { z } from "zod";

export const profileSchema = z.object({
full_name: z.string({message: "Nama harus berupa string!"}),
username: z.string({message: "Username harus berupa string!"}),
bio: z.string({message: "Bio harus berupa string!"}),
photo_profile: z.any()
});