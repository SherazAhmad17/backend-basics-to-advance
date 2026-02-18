import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("invalid email address"),
    password: z.string().min(1, "password is required"),
});

export default loginSchema;
