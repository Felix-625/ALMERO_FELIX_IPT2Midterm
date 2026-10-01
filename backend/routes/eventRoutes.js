

import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Collection-level routes (no :id).
router
  .route("/")
  .get(getEvents)   // GET /api/events
  .post(createEvent); // POST /api/events

// Document-level routes (with :id).
router
  .route("/:id")
  .get(getEvent)     // GET /api/events/:id
  .put(updateEvent)  // PUT /api/events/:id
  .delete(deleteEvent); // DELETE /api/events/:id

export default router;