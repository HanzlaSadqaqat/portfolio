import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const ProfileSchema = new Schema<IProfile>({
  name: { type: String, required: true },
  initials: { type: String, required: true },
  role: { type: String, required: true },
  tagline: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, default: "/resume.pdf" },
  social: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
});

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
