import mongoose, { Schema, Document } from "mongoose";

export interface IAutomation extends Document {
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
  order: number;
}

const AutomationSchema = new Schema<IAutomation>({
  title: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  stack: [{ type: String }],
  impact: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Automation ||
  mongoose.model<IAutomation>("Automation", AutomationSchema);
