import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  school: string;
  period: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  period: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);
