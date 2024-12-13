
import { model, models, Schema } from "mongoose";

const MembershipSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    role: { type: String, enum: ["member", "board", "coordinator", "treasurer", "president"]}
}, { collection: 'memberships', timestamps: true });

const Membership = models.Membership || model('Membership', MembershipSchema);

export default Membership;