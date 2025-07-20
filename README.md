# 🧭 AI Travel Planner

An AI-powered travel planning web application built with **React** and **Firebase**. The app helps users create personalized travel itineraries based on their preferences using Google Gemini AI. Whether you're planning a weekend getaway or a long vacation, our AI helps you make the most out of your trip.

---

## ✨ Features

- 🔐 User Authentication with Firebase
- 🗺️ Location-based autocomplete for better user input
- 🧠 Google Gemini AI integration for intelligent itinerary generation
- 🖼️ Images and links for each suggested place
- 📍 Google Maps direction support
- 📝 View and manage your saved trips

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page-level screens (Home, CreateTrip, MyTrips)
├── service/             # Firebase configuration and setup
├── utils/               # Utility functions and constants
├── App.jsx              # App routing and layout
└── main.jsx             # React app entry point
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-travel-planner.git
cd ai-travel-planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable **Authentication** (Email/Password)
- Create a **Firestore Database**
- Copy your Firebase config into `src/service/firebaseConfig.js`

### 4. Google Gemini API Setup

- Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a `.env` file in the root:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

### 5. Run the App

```bash
npm run dev
```

---

## 👥 Developed By

- **Nofil Abbas**  
- **Muhammad Junaid**

---

## 📦 Deployment

You can deploy this app on platforms like **Vercel**, **Netlify**, or **Firebase Hosting**.

---


