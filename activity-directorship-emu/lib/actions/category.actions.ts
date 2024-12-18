"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"


export const getEventCategories = async () => {
    try {
        await connectToDatabase();
        const categories = await Category.find({type: "event"});
        return JSON.parse(JSON.stringify(categories));
    } catch(e) {
        handleError(e)
    }
}

export const getClubCategories = async () => {
    try {
        await connectToDatabase();
        const categories = await Category.find({type: "club"});
        
        return JSON.parse(JSON.stringify(categories));
    } catch(e) {
        handleError(e)
    }
}

export const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
  }

