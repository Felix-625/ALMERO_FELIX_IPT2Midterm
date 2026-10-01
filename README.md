@'
# School Event Scheduler

> A full-stack web application for managing school events — add, view, edit, and delete events, all persisted in MongoDB.

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Express%20%2B%20MongoDB-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

---

## Table of Contents

1. [Purpose](#purpose)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Event Fields](#event-fields)
5. [Architecture](#architecture)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [How to Run](#how-to-run)
9. [Environment Variables](#environment-variables)
10. [Using the Application](#using-the-application)
11. [Troubleshooting](#troubleshooting)
12. [Author](#author)
13. [License](#license)

---

## Purpose

The School Event Scheduler is a full-stack web application that allows school staff, administrators, or authorized users to manage school events in one central place.

Users can:

- Add a new school event
- View all school events
- Edit an existing event
- Delete an event

All event data is stored persistently in MongoDB.

---

## Features

### User Features

- ➕ Add Event
- 📋 View Events
- ✏️ Edit Event
- 🗑️ Delete Event
- 🔔 Success and error messages
- 🎨 Futuristic dark-themed interface
- 📱 Responsive design

### Technical Features

- React with Hooks
- React Router
- Vite
- Express.js REST API
- MongoDB
- Mongoose
- Environment variables
- Client-side validation
- Server-side validation
- Error handling

---

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- React Router
- CSS3

### Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv
- nodemon

### Database

- MongoDB

### Tools

- Git
- GitHub
- MongoDB Compass
- Visual Studio Code

---

## Event Fields

| Field | Type | Required | Validation |
|---|---|---|---|
| Title | String | Yes | Minimum 3 characters |
| Venue | String | Yes | Required |
| Date | Date | Yes | Valid date |
| Organizer | String | Yes | Required |
| Expected Attendees | Number | Yes | Non-negative number |

MongoDB/Mongoose also creates:

- `_id` — unique event identifier
- `createdAt` — creation timestamp
- `updatedAt` — last update timestamp

---

## Architecture

The application uses a three-tier architecture:

```text
┌─────────────────────────────┐
│       React + Vite          │
│     localhost:5173          │
│                             │
│  Dashboard / Forms / UI     │
└──────────────┬──────────────┘
               │
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│      Node + Express         │
│     localhost:5000          │
│                             │
│      REST API / Routes      │
└──────────────┬──────────────┘
               │
               │ Mongoose
               ▼
┌─────────────────────────────┐
│          MongoDB            │
│          Port 27017         │
│                             │
│   school_event_scheduler    │
└─────────────────────────────┘


## Project Structure

ALMERO_FELIX_IPT2Midterm/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventForm.jsx
│   │   │   ├── EventList.jsx
│   │   │   ├── EventModal.jsx
│   │   │   └── ConfirmModal.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── eventController.js
│   │
│   ├── models/
│   │   └── Event.js
│   │
│   ├── routes/
│   │   └── eventRoutes.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md

## API Endpoints

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/api/events`     | Retrieve all events |
| GET    | `/api/events/:id` | Retrieve one event  |
| POST   | `/api/events`     | Create a new event  |
| PUT    | `/api/events/:id` | Update an event     |
| DELETE | `/api/events/:id` | Delete an event     |

## How to Run
## Prerequisit

    Install:

    Node.js 18 or newer
    npm
    MongoDB
    Git
    MongoDB Compass (optional)

## Using the Application

### Adding an Event

Fill in all required fields.
Click Add Event.
The event is saved to MongoDB.
The new event appears in the event list.

### Viewing Events
The dashboard displays all saved events with:
Title
Venue
Date
Organizer
Expected attendees

### Editing an Event
Click Edit.
Modify the event information.
Click Save Changes.

### Deleting an Event
Click Delete.
Confirm the deletion.
The event is removed from the database.

## AUTHOR

Felix Almero

IPT2 Midterm Practical Test
