

import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import EventModal from "../components/EventModal";
import ConfirmModal from "../components/ConfirmModal";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api";

function Dashboard() {
  // List of events returned by the backend.
  const [events, setEvents] = useState([]);

  // True while the initial fetch is running.
  const [loading, setLoading] = useState(true);

  // True while a create/update/delete request is in flight.
  const [submitting, setSubmitting] = useState(false);

  // Flipped to true briefly after a successful create so the
  // add-form knows to clear itself.
  const [createSucceeded, setCreateSucceeded] = useState(false);

  // The event being edited (non-null = edit modal is open).
  const [editingEvent, setEditingEvent] = useState(null);

  // The event pending deletion (non-null = confirm modal is open).
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Success/error banner messages.
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      setErrorMessage(
        `Could not load events: ${error.message}. Is the backend running?`
      );
    } finally {
      setLoading(false);
    }
  };

  // Load events once on mount.
  useEffect(() => {
    loadEvents();
  }, []);

  // Auto-dismiss success/error banners after 3 seconds.
  useEffect(() => {
    if (!successMessage && !errorMessage) return;
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  const handleCreate = async (payload) => {
    try {
      setSubmitting(true);
      setErrorMessage("");
      setCreateSucceeded(false);

      await createEvent(payload);
      setSuccessMessage("Event added successfully.");
      // Signal to the form that it should clear itself.
      setCreateSucceeded(true);

      await loadEvents();
    } catch (error) {
      setErrorMessage(`Save failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (event) => {
    setEditingEvent(event);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSaveEdit = async (payload) => {
    if (!editingEvent) return;
    try {
      setSubmitting(true);
      setErrorMessage("");
      await updateEvent(editingEvent._id, payload);
      setSuccessMessage("Event updated successfully.");
      setEditingEvent(null);
      await loadEvents();
    } catch (error) {
      setErrorMessage(`Update failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenDelete = (event) => {
    setDeletingEvent(event);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;
    try {
      setSubmitting(true);
      setErrorMessage("");
      await deleteEvent(deletingEvent._id);
      setSuccessMessage("Event deleted successfully.");
      setDeletingEvent(null);
      await loadEvents();
    } catch (error) {
      setErrorMessage(`Delete failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>School Event Scheduler</h1>
        <p>Manage school events: add, view, edit, and delete.</p>
      </header>

      {successMessage && (
        <div className="message success">{successMessage}</div>
      )}
      {errorMessage && <div className="message error">{errorMessage}</div>}

      {/* Add-only inline form */}
      <EventForm
        onSubmit={handleCreate}
        submitting={submitting}
        submitSucceeded={createSucceeded}
      />

      {/* List of events (with Edit + Delete buttons) */}
      <EventList
        events={events}
        loading={loading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Edit modal */}
      <EventModal
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSave={handleSaveEdit}
        submitting={submitting}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        event={deletingEvent}
        onCancel={() => setDeletingEvent(null)}
        onConfirm={handleConfirmDelete}
        submitting={submitting}
      />
    </div>
  );
}

export default Dashboard;