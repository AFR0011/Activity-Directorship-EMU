"use server"

import { createCategoryParams } from "@/types" //IMPLEMENT THIS LATER (OR REMOVE IF WE DON'T NEED THIS FUNCTIONALITY)
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"

export const createCategory = async ({categoryName }: CreateCategoryParams) => { //AS mentioned, we don't have this so either add this to DB or remove all codes related to it.
    try {
        await connectToDatabase();
        const newCategory = await Category.create({ name: categoryName });
        
        return JSON.parse(JSON.stringify(newCategory));
    } catch(e) {
        handleError(e)
    }
}

export const getAllCategories = async () => {
    try {
        await connectToDatabase();
        const categories = await Category.find();
        
        return JSON.parse(JSON.stringify(categories));
    } catch(e) {
        handleError(e)
    }
}