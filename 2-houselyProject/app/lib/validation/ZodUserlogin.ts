import z from "zod";
export const ZodUserLogin = z.object({
  email: z.email({ message: "email is not valid" }).nonempty(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "password most have [a-Z,0-9,@$!%*#?&,]" }
    )
    .min(8, "password need to 8 characters")
    .nonempty(),
});
