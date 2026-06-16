import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperience>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  bullets: [{ type: String }],
  order: { type: Number, default: 0 },
});

export default mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);
