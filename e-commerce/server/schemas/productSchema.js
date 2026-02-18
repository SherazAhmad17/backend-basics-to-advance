import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(3, "name must be at least 3 characters"),
    description: z.string().min(5, "description must be at least 5 characters"),
    price: z.number().positive("price must be greater than 0"),
    category: z.string().min(1, "category is required"),
    stock: z.number().nonnegative("stock cannot be negative"),
    sku: z.string().min(3, "sku must be at least 3 characters"),
});

export default productSchema;
