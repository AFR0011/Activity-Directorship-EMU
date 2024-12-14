import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string; // Optional
    clubs?: { _id: string, name: string, imageUrl: string };
    organizers: { _id: string, username: string, photo: string };
    startDate: Date;
    endDate: Date;
    location: string;
    price: string;
    isFree: boolean;  //I ADDED THIS BECAUSE OF COURSE
    resources?: string[]; // Optional array of resource links
    createdAt: Date; // Added automatically by timestamps
    updatedAt: Date; // Added automatically by timestamps
}

const EventSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // e.g., academic, cultural
    imageUrl: { type: String },
    clubs: { type: Schema.Types.ObjectId, ref: "Club"},
    organizers: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Event Coordinator
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true},
    isFree: { type: Boolean, required: true},
    resources: [{ type: String }], // Links to slides, videos, etc.
}, { collection: 'events', timestamps: true });

const Event = models.Event || model('Event', EventSchema);

export default Event;