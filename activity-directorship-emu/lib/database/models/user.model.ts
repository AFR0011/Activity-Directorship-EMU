import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true }, // For Clerk Auth
    email: { type: String, required: true, unique: true },
    username: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String },
    role: { type: String, enum: ["student", "admin"], required: true },
}, { collection: 'users', timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;