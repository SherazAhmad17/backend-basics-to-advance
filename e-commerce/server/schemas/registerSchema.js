import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(3, "name must be at least 3 characters"),
    email: z.string().email("invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters"),
    phone: z.string().min(10, "phone must be at least 10 characters"),
    address: z.string().min(5, "address must be at least 5 characters"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
});

export default registerSchema;
