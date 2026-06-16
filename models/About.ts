import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  intro: string[];
  highlights: string[];
}

const AboutSchema = new Schema<IAbout>({
  intro: [{ type: String }],
  highlights: [{ type: String }],
});

export default mongoose.models.About ||
  mongoose.model<IAbout>("About", AboutSchema);
