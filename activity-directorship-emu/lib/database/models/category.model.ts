import { Document, Model, model, models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface ICategory extends Document {
    _id: string;
    title: string;
    type: string;
}

// Category schema, used for clubs and events
const CategorySchema = new Schema({
    title: { type: "string", required: true, unique: true },
    type: { type: "string", enum: ["event", "club"], required: true}
}, {collection: "category"});

const Category = models.Category || model('Category', CategorySchema);

export default Category;