import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  tech: string[];
  status: "live" | "beta" | "wip";
  github?: string;
  live?: string;
  order: number;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tech: [{ type: String }],
  status: { type: String, enum: ["live", "beta", "wip"], default: "wip" },
  github: { type: String, default: "" },
  live: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
