# 📅 Event Management Platform (MERN Stack)

A **full-stack Event Management Platform** built using the **MERN stack**, where users can create events, browse events, RSVP with capacity constraints, and manage their own events.  
This project was developed as part of an **internship / technical assignment** and strictly follows all the requirements mentioned in the provided assignment document.

---

## 🔗 Live Deployment Links

- **Frontend (Vercel):**  
  https://eventify-ten-teal.vercel.app/
- **Backend API (Vercel):**  
  https://backend-eventify.vercel.app/api/events

- **Backend API Test Endpoint:**  
 https://backend-eventify.vercel.app/api/events 

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (Memory Storage)
- Cloudinary (Image Hosting)

### Deployment
- Vercel (Frontend)
- Vercel Serverless Functions (Backend)

---

## 🎯 Project Objectives (As per Assignment)

The main objectives of this project are:

- Implement secure user authentication
- Allow users to create and manage events
- Implement an RSVP system with capacity limits
- Prevent duplicate RSVPs and overbooking
- Enforce proper authorization rules
- Build a clean and responsive UI
- Deploy the application to production

All the above objectives have been **fully implemented**.

---

## 🔐 Authentication & Authorization

### User Authentication
- Users can **register and log in**
- Authentication is handled using **JSON Web Tokens (JWT)**
- JWT token is stored in `localStorage`
- Protected routes require a valid token

### Authorization Rules
- Only authenticated users can:
  - Create events
  - RSVP to events
- Only the **event creator** can:
  - Edit the event
  - Delete the event

Authorization is enforced on **both frontend and backend**.

---

## 📅 Event Management Features

### 1️⃣ Create Event
Authenticated users can create events with the following fields:
- Title
- Description
- Date
- Location
- Capacity
- Event image

📌 Event images are uploaded directly to **Cloudinary** using Multer’s **memory storage**, avoiding local file system usage (serverless-safe).

---

### 2️⃣ View All Events
- All users can view the list of available events
- Events are displayed in a responsive grid layout
- Clicking an event opens a **dedicated event detail page**

---

### 3️⃣ Event Detail Page
Each event has a separate page that displays:
- Event image
- Full description
- Location and date
- Current attendee count
- RSVP / Leave / Edit / Delete actions based on user role

---

## 🎟️ RSVP System (Core Feature)

The RSVP system is implemented carefully to handle real-world edge cases.

### RSVP Rules
- Only logged-in users can RSVP
- A user **cannot RSVP more than once**
- Event capacity is strictly enforced
- Users can **leave (Un-RSVP)** an event

---

### Button Behavior Logic (Frontend UX)

| User State | Button Display |
|---------|---------------|
Not logged in | Login to RSVP |
Logged in, not joined | RSVP |
Logged in, already joined | Leave Event |
Event full | Event Full (disabled) |

This ensures a clear and intuitive user experience.

---

### 🚨 Capacity & Concurrency Handling

To prevent race conditions when multiple users RSVP simultaneously:

- Backend uses **atomic MongoDB update operations**
- Conditions checked before RSVP:
  - User is not already an attendee
  - Attendee count is less than capacity
- The update happens in a **single database operation**

This guarantees:
- No overbooking
- No duplicate RSVPs
- Data consistency under concurrent requests

---

## 🔁 Un-RSVP (Leave Event)

- Users who joined an event can leave it
- Attendee count updates immediately
- UI refreshes automatically after the action

---

## 🗑️ Delete Event (With Confirmation)

- Delete button is visible **only to the event creator**
- A confirmation modal prevents accidental deletion
- Backend verifies ownership before deleting the event

---

## ✏️ Edit Event

- Only the event creator can edit the event
- Existing event data is pre-filled in the edit form
- After updating, the user is redirected to the event detail page

---

## 🔔 Notifications (React Toastify)

All browser alerts are replaced with **React Toastify notifications**.

Examples:
- RSVP successful
- Event is full
- Already joined event
- Login required
- Unauthorized action

This improves UX by providing non-blocking feedback.

---

## 👤 My Events Dashboard

The **My Events** page displays:
- Events created by the logged-in user
- Events the user has RSVP’d to

This helps users manage their participation easily.

---

## 🎨 UI / UX

- Built with **Tailwind CSS**
- Fully responsive design
- Clean and minimal layout
- Conditional buttons based on user role
- Separate pages for:
  - Events list
  - Event detail
  - Create event
  - Edit event
  - My events

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`client/.env`)
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api

```
▶️ Run the Project Locally
Backend
cd server
npm install
npm start

Frontend
cd client
npm install
npm run dev

🚀 Deployment Details
Backend Deployment

Deployed on Vercel as a serverless function

Express app is exported instead of using app.listen()

Environment variables configured via the Vercel dashboard

Frontend Deployment

Deployed on Vercel using the Vite preset

vercel.json added to handle React Router page refresh

Axios base URL configured using environment variables

🧠 Key Learnings

JWT-based authentication & authorization

Real-world RSVP and capacity handling

MongoDB atomic operations

Serverless-safe file uploads

Clean frontend UX decisions

End-to-end MERN deployment

👨‍💻 Author

Rahul Reddy
Full Stack Web Developer (MERN)
