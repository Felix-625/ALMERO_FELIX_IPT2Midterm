

// Base URL of the Express backend.
// In development the backend runs on http://localhost:5000.
const API_BASE = "http://localhost:5000/api/events";


const handleResponse = async (response) => {
  // Try to parse JSON. If parsing fails, fall back to a plain message.
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    // Prefer the backend's own error message when it exists.
    const message =
      (data && (data.message || (data.errors && data.errors.join(", ")))) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};


export const fetchEvents = async () => {
  const response = await fetch(API_BASE);
  return handleResponse(response);
};


export const createEvent = async (eventData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return handleResponse(response);
};


export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return handleResponse(response);
};


export const deleteEvent = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};