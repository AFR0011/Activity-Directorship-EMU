import { model, models, Schema } from "mongoose";

// Feedback Schema
const FeedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating out of 5
    comments: { type: String },
}, { timestamps: true });

const Feedback = models.Feedback || model('Feedback', FeedbackSchema);

export default Feedback;