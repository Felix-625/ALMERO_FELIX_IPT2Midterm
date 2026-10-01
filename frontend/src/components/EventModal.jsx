
import { useState, useEffect } from "react";

function EventModal({ event, onClose, onSave, submitting }) {
  // Local form state — populated from the event whenever it changes.
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: "",
    organizer: "",
    expectedAttendees: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!event) return;
    setFormData({
      title: event.title || "",
      venue: event.venue || "",
      // input[type="date"] wants YYYY-MM-DD.
      date: event.date ? event.date.slice(0, 10) : "",
      organizer: event.organizer || "",
      expectedAttendees: String(event.expectedAttendees ?? ""),
    });
    setErrors({});
  }, [event]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, submitting]);

  // If there is no event, render nothing (modal is closed).
  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.organizer.trim()) newErrors.organizer = "Organizer is required";

    const attendees = Number(formData.expectedAttendees);
    if (formData.expectedAttendees === "") {
      newErrors.expectedAttendees = "Expected attendees is required";
    } else if (Number.isNaN(attendees)) {
      newErrors.expectedAttendees = "Must be a valid number";
    } else if (attendees < 0) {
      newErrors.expectedAttendees = "Cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      title: formData.title.trim(),
      venue: formData.venue.trim(),
      date: formData.date,
      organizer: formData.organizer.trim(),
      expectedAttendees: Number(formData.expectedAttendees),
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !submitting) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <div className="modal-header">
          <h2 id="edit-modal-title">Edit Event</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="edit-title">Event Title</label>
              <input
                id="edit-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <small className="message error">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-venue">Venue</label>
              <input
                id="edit-venue"
                name="venue"
                type="text"
                value={formData.venue}
                onChange={handleChange}
              />
              {errors.venue && <small className="message error">{errors.venue}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-date">Date</label>
              <input
                id="edit-date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <small className="message error">{errors.date}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-organizer">Organizer</label>
              <input
                id="edit-organizer"
                name="organizer"
                type="text"
                value={formData.organizer}
                onChange={handleChange}
              />
              {errors.organizer && (
                <small className="message error">{errors.organizer}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edit-attendees">Expected Attendees</label>
              <input
                id="edit-attendees"
                name="expectedAttendees"
                type="number"
                min="0"
                value={formData.expectedAttendees}
                onChange={handleChange}
              />
              {errors.expectedAttendees && (
                <small className="message error">{errors.expectedAttendees}</small>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;