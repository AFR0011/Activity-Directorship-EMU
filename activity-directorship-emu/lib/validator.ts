import * as z from "zod";

export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters!"),
    description: z.string()
        .min(3, "Description must be at least 3 characters!")
        .max(400, "Description can be at most 400 characters!"),
    location: z.string()
        .min(3, "Location must be at least 3 characters!")
        .max(300, "Location can be at most 300 characters!"),
    imageUrl: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    resources: z.string(),
    clubId: z.string(),
});
