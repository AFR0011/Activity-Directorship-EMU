"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Club from "../database/models/club.model"
 
// TODO: filter results from getUserClubs and getEventClubs

export const getClubs = async () => {
    try {
        await connectToDatabase();
        const clubs = await Club.find();
        return JSON.parse(JSON.stringify(clubs));
    } catch(e) {
        handleError(e)
    }
}

export const getUserClubs = async () => {
    try {
        await connectToDatabase();
        const clubs = await Club.find();
        return JSON.parse(JSON.stringify(clubs));
    } catch(e) {
        handleError(e)
    }
}

export const getEventClubs = async () => {
    try {
        await connectToDatabase();
        const clubs = await Club.find();
        return JSON.parse(JSON.stringify(clubs));
    } catch(e) {
        handleError(e)
    }
}

