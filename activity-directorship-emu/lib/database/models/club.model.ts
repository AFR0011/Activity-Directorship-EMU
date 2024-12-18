import { model, models, Schema } from "mongoose";

export interface IClub extends Document {
    _id: string;
    name: string;
    description: string;
    category: { _id: string, title: string };
    imageUrl: string;
    president: { _id: string, username: string, photo: string}
}


const ClubSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    imageUrl: { type: String },
    president: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { collection: 'clubs', timestamps: true });


const Club = models.Club || model('Club', ClubSchema);

export default Club;