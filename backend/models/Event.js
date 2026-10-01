

import mongoose from "mongoose";


const eventSchema = new mongoose.Schema(
  {
    // Title of the event, e.g. "Intramurals 2026".
    // Required, must be a non-empty string, trimmed of whitespace.
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Event title must be at least 3 characters"],
    },

    // Where the event will take place, e.g. "School Gymnasium".
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },

    // When the event will happen.
    // Stored as a native Date object in MongoDB.
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    // Person, department, or group responsible for the event.
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },

    // Estimated number of people who will attend.
    // Must be a non-negative number.
    expectedAttendees: {
      type: Number,
      required: [true, "Expected attendees is required"],
      min: [0, "Expected attendees cannot be negative"],
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` timestamps.
    // Useful for ordering events by creation time.
    timestamps: true,
  }
);


const Event = mongoose.model("Event", eventSchema);

export default Event;