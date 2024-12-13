"use server"

import { connectToDatabase } from '@/lib/database'
import Event from '@/lib/database/models/event.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model' //Does DB even have this ???
import { handleError } from '@/lib/utils'
import { CreateEventParams } from '@/types'

const populateEvent = async (query: any) => {
    return query
        .populate({ path: 'organizer', model: 'User', select: '_id firstName lastName' })
        .populate({ path: 'category', model: 'Category', select: '_id name' })

}



export const createEvent = async ({ ...event }:
    CreateEventParams) => {
    try {
        await connectToDatabase();

        const organizers = await User.find({ _id: { $in: event.organizerId } });
        if (!organizers) {
            throw new Error("Organizer not found!");
        }

        const newEvent = await Event.create({ ...event });

        return JSON.parse(JSON.stringify(newEvent));
    } catch (e) {
        handleError(e);
    }
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));

        if (!event) {
            throw new Error("Event not found!");
        }

        return JSON.parse(JSON.stringify(event))
    } catch (e) {
        handleError(e);
    }
}

export const getAllEvents = async ({ ' query, limit = 6, page, category'}: GetAllEventParams) => {
    try {
        await connectToDatabase();
        const conditions = {};
        const eventsQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),

        }


    } catch (e) {
        handleError(e);
    }
}