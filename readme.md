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

🔐 Admin Access
Users who log in with the username admin gain full control over the schedule, including the ability to delete any entry regardless of who created it.

🚀 Quick Start
1. Prerequisites
Ensure you have Node.js installed.

2. Installation
Clone the repository:
git clone https://github.com/Amirbmn/invitation-scheduler.git
cd noruz-scheduler
Install dependencies:
npm install

3. Configuration
Ensure the API_URL in the <script> tag of index.html matches your server address:
const API_URL = 'http://localhost:3000/api/entries';

4. Running the App
Start the server:

node server.js
The application will be available at http://localhost:3000.


📦 Dependencies & Setup (package.json)
This project uses Node.js and Express for the backend logic.

Core Dependencies:

express: The web framework used to handle API requests and serve static files.

cors: Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to communicate with the API.

Engines: * Optimized for Node.js 16.x or higher.

Available Scripts:

npm start: Runs the server using node server.js.


📁 Project Structure

public/index.html: The main UI and frontend logic.

public/haftsin.jpg: Background image.

data.json: Storage file for reservation entries.

server.js: Express server and REST API endpoints.

package.json
