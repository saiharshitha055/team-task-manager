Team Task Manager (Full-Stack)
A professional web application designed for teams to create projects, assign tasks, and track progress in real-time. This project was developed as a full-stack assignment to demonstrate proficiency in building scalable, deployed applications with secure access controls.

🚀 Live Demo
Live URL: https://alert-gratitude-production-c5ce.up.railway.app

✨ Key Features
Secure Authentication: Fully functional Signup and Login system using JWT (JSON Web Tokens).

Task Management: Create, assign, and track the status of various tasks.

Role-Based Access Control (RBAC): Supports Admin and Member roles to ensure data security and proper workflow management.

Dynamic Dashboard: A comprehensive overview of tasks, current statuses, and overdue items to keep the team on track.

🛠️ Technical Stack
Frontend: React.js with Vite for a fast, component-based user interface.

Backend: Node.js and Express.js providing a robust REST API.

Database: MongoDB (NoSQL) for flexible and scalable data storage.

Security: Bcrypt.js for industry-standard password hashing and secure authentication.

Deployment: Fully deployed and hosted on Railway.

📋 Requirements Fulfilled
REST APIs: Implemented clean endpoints for user authentication and task CRUD operations.

Data Validation: Proper server-side and client-side validations for all inputs.

Relationships: Established clear data relationships between Users, Projects, and Tasks in the database.

Deployment: Mandatory live deployment on Railway ensuring the app is fully functional for selection.

📂 Project Structure
Plaintext
├── frontend/           # React components, Tailwind styling, and routing
├── backend/            # Express server, API routes, and Controllers
├── models/             # Mongoose schemas for Users and Tasks
└── README.md           # Documentation
⚙️ Installation & Local Setup
1.Clone the Repository: git clone https://github.com/saiharshitha055/team-task-manager

2.Install Dependencies: Run npm install in both the /frontend and /backend directories.

3.Environment Variables: Setup your .env with your MONGO_URI, JWT_SECRET, and VITE_API_URL.

4.Run Development Mode: Use npm run dev for the frontend and npm start for the backend.