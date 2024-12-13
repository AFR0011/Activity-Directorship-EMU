import { model, models, Schema } from "mongoose";

const EventRegistrationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { collection: 'eventRegistrations', timestamps: true });

const EventRegistration = models.EventRegistration || model('EventRegistration', EventRegistrationSchema);

export default EventRegistration;