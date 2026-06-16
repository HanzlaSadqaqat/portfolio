import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  order: number;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
  url: { type: String, default: "#" },
  tags: [{ type: String }],
  order: { type: Number, default: 0 },
});

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
