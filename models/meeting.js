import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
  title: String,
  email: String,
  lead: String,
  members: Number,
  room: Number,
  start: Date,
  end: Date,
  date: Date,
});
export const meetingModel = mongoose.model("Meetings", meetingSchema);
