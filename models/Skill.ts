import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  category: string;
  items: string[];
  order: number;
}

const SkillSchema = new Schema<ISkill>({
  category: { type: String, required: true },
  items: [{ type: String }],
  order: { type: Number, default: 0 },
});

export default mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);
