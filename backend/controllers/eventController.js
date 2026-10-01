
import mongoose from "mongoose";
import Event from "../models/Event.js";


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


export const getEvents = async (req, res) => {
  try {
    // Sort by date ascending so the soonest events appear first.
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("getEvents error:", error.message);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};


export const getEvent = async (req, res) => {
  const { id } = req.params;

  // Reject malformed ids early with a clear 400 error.
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid event id" });
  }

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("getEvent error:", error.message);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};


export const createEvent = async (req, res) => {
  try {
    // Only accept the five expected fields from the request body.
    // This prevents clients from injecting arbitrary fields.
    const { title, venue, date, organizer, expectedAttendees } = req.body;

    const newEvent = await Event.create({
      title,
      venue,
      date,
      organizer,
      expectedAttendees,
    });

    // 201 Created — include the newly created document in the response.
    res.status(201).json(newEvent);
  } catch (error) {
    // Mongoose validation errors have `name === "ValidationError"`.
    // Return 400 with a readable message for those.
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ message: "Validation failed", errors: messages });
    }

    console.error("createEvent error:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
};


export const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid event id" });
  }

  try {
    const { title, venue, date, organizer, expectedAttendees } = req.body;

    // `new: true` makes Mongoose return the UPDATED document.
    // `runValidators: true` re-runs the schema validators on update.
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, venue, date, organizer, expectedAttendees },
      { new: true, runValidators: true, omitUndefined: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ message: "Validation failed", errors: messages });
    }

    console.error("updateEvent error:", error.message);
    res.status(500).json({ message: "Failed to update event" });
  }
};


export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid event id" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Return a small confirmation payload plus the deleted doc.
    res.status(200).json({
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    console.error("deleteEvent error:", error.message);
    res.status(500).json({ message: "Failed to delete event" });
  }
};