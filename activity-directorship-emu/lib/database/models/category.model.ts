import { Document, model, models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface ICategory extends Document {
    _id: string;
    title: string;
}

const CategorySchema = new Schema({
    title: { type: "string", required: true, unique: true }
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;