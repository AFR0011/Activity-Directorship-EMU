import { model, models, Schema } from "mongoose";

const ClubSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., sports, cultural
    imageUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Club President
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });


const Club = models.Club || model('Club', ClubSchema);

export default Club;