import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  coverImage?: string;
  metaDescription?: string;
  order: number;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  tags: [{ type: String }],
  coverImage: { type: String },
  metaDescription: { type: String },
  order: { type: Number, default: 0 },
});

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
