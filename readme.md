📅 Noruz 1405 Scheduler
A lightweight, full-stack web application designed for families to coordinate their holiday visits and hosting schedule during the Noruz 1405 vacations.

✨ Features
Dual-Shift Calendar: 14-day view (1 to 14 Farvardin) with Day and Night slots.

User Authentication: Simple name-based login with persistent sessions using localStorage.

Ownership Protection: Users can only delete the entries they have personally created.

Modern UI: Glassmorphism design with a blurred background and responsive layout for mobile/desktop.

Real-time Updates: Backend-driven data storage in a JSON file.

🛠️ Tech Stack
Frontend: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript.

Backend: Node.js, Express.js.

Database: Local JSON file (data.json).

Design: Vazirmatn Persian font, Backdrop-blur effects.

🚀 Quick Start
1. Prerequisites
Ensure you have Node.js installed.

2. Installation
Clone the repository:

Bash
git clone https://github.com/Amirbmn/noruz-scheduler.git
cd noruz-scheduler
Install dependencies:

Bash
npm install
3. Configuration
Ensure the API_URL in the <script> tag of index.html matches your server address:

JavaScript
const API_URL = 'http://localhost:3000/api/entries';
4. Running the App
Start the server:

Bash
node server.js
The application will be available at http://localhost:3000.

📁 Project Structure
server.js: Express server and REST API endpoints.

public/index.html: The main UI and frontend logic.

data.json: Storage file for reservation entries.

public/haftsin.jpg: Background image.