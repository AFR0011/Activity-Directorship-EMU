import { model, models, Schema } from "mongoose";

// Feedback Schem, used for clubs and events
const FeedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {type: String, enum: ["club", "event"], required: true},
    reference: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String },
}, { collection: 'feedbacks', timestamps: true });

const Feedback = models.Feedback || model('Feedback', FeedbackSchema);

export default Feedback;