import mongoose from 'mongoose';
import { CategoryType } from '../types/category.type';
const { Schema } = mongoose;

const categorySchema = new Schema<CategoryType>(
  {
    name: { type: String, trim: true, max: 128, required: true },
    description: { type: String, trim: true, required: true },
    topics: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<CategoryType>('Category', categorySchema);

export default Category;
