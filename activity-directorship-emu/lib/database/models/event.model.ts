import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string; // Optional
    club: { _id: string, name: string, imageUrl: string };
    organizer: { _id: string, username: string, photo: string };
    startDate: Date;
    endDate: Date;
    location: string;
    participants: [{ _id: string, username: string, photo: string }]; // Array of users
    resources?: string[]; // Optional array of resource links
    createdAt: Date; // Added automatically by timestamps
    updatedAt: Date; // Added automatically by timestamps
}

const EventSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., academic, cultural
    imageUrl: { type: String },
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Event Coordinator
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    resources: [{ type: String }], // Links to slides, videos, etc.
}, { timestamps: true });

const Event = models.Event || model('Event', EventSchema);

export default Event;