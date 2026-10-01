
import { useState, useEffect } from "react";

// Empty form template — used for the initial state and after submit.
const EMPTY_FORM = {
  title: "",
  venue: "",
  date: "",
  organizer: "",
  expectedAttendees: "",
};

function EventForm({ onSubmit, submitting, submitSucceeded }) {
  // Store the current values of every form field.
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Store client-side validation errors (before sending to the API).
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitSucceeded) {
      setFormData(EMPTY_FORM);
      setErrors({});
    }
  }, [submitSucceeded]);

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

    // Send numbers as numbers, not strings.
    const payload = {
      title: formData.title.trim(),
      venue: formData.venue.trim(),
      date: formData.date,
      organizer: formData.organizer.trim(),
      expectedAttendees: Number(formData.expectedAttendees),
    };

    onSubmit(payload);
  };

  return (
    <div className="form-card">
      <h2>Add New Event</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Intramurals 2026"
            />
            {errors.title && <small className="message error">{errors.title}</small>}
          </div>

          {/* Venue */}
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              id="venue"
              name="venue"
              type="text"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. School Gymnasium"
            />
            {errors.venue && <small className="message error">{errors.venue}</small>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <small className="message error">{errors.date}</small>}
          </div>

          {/* Organizer */}
          <div className="form-group">
            <label htmlFor="organizer">Organizer</label>
            <input
              id="organizer"
              name="organizer"
              type="text"
              value={formData.organizer}
              onChange={handleChange}
              placeholder="e.g. Student Affairs Office"
            />
            {errors.organizer && (
              <small className="message error">{errors.organizer}</small>
            )}
          </div>

          {/* Expected attendees */}
          <div className="form-group">
            <label htmlFor="expectedAttendees">Expected Attendees</label>
            <input
              id="expectedAttendees"
              name="expectedAttendees"
              type="number"
              min="0"
              value={formData.expectedAttendees}
              onChange={handleChange}
              placeholder="e.g. 500"
            />
            {errors.expectedAttendees && (
              <small className="message error">{errors.expectedAttendees}</small>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Adding..." : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;