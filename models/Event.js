const mongoose = require("mongoose");

// Schema for individual slots
const slotSchema = new mongoose.Schema({
  slotStart: { type: String, required: true }, // Start time of the slot (UTC)
  slotEnd: { type: String, required: true }, // End time of the slot (UTC)
  date: { type: String, required: true }, // Date of the slot (UTC)
  slotID: { type: Number }, // Unique ID for the slot
  available: { type: Boolean }, // Whether the slot is available
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  timeZone: { type: String, required: true },
  userId: { type: String, required: true },
  slotMinutes: { type: Number, required: true },
  eventId: { type: String },
  totalSlots: [slotSchema]  // Array of slot objects,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
