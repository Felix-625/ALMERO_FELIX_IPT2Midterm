function EventList({ events, loading, onEdit, onDelete }) {
  
  if (loading) {
    return (
      <div className="list-card">
        <h2>School Events</h2>
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="list-card">
        <h2>School Events</h2>
        <div className="empty-state">
          <strong>No school events found.</strong>
          <span>Add your first event using the form above.</span>
        </div>
      </div>
    );
  }

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="list-card">
      <h2>School Events ({events.length})</h2>

      <table className="event-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Organizer</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.venue}</td>
              <td>{formatDate(event.date)}</td>
              <td>{event.organizer}</td>
              <td>{event.expectedAttendees}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(event)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;