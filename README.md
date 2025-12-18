AI Chat Assistant – Hands-on Lab
===============================

This project is a simple AI Chat Assistant built using:
- Node.js (Backend)
- React + Tailwind CSS (Frontend)
- Google Gemini (AI Model)

The repository contains both server and client code.

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------

/server   → Backend (Node.js, Google Gemini API)
/client   → Frontend (React, Tailwind CSS)

--------------------------------------------------
PREREQUISITES
--------------------------------------------------

1. Node.js (v18 or above)
   https://nodejs.org

2. Git
   https://git-scm.com

3. A Google account (for Gemini API key)

--------------------------------------------------
STEP 1: CLONE THE REPOSITORY
--------------------------------------------------

Open terminal and run:

git clone <GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER_NAME>

--------------------------------------------------
STEP 2: BACKEND SETUP (SERVER)
--------------------------------------------------

1. Navigate to server folder:

cd server

2. Install dependencies:

npm install

3. Create environment file:

Create a file named `.env` inside the server folder.

4. Add the following content to `.env`:

GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
PORT=3000

(Note: Do not add quotes)

--------------------------------------------------
STEP 3: GET GOOGLE GEMINI API KEY
--------------------------------------------------

1. Go to Google AI Studio:
   https://aistudio.google.com

2. Login using your Google account

3. Click on "Get API key" or "Create API key"

4. Create or select a project

5. Copy the generated API key

6. Paste the key into the `.env` file

--------------------------------------------------
STEP 4: START BACKEND SERVER
--------------------------------------------------

From the server folder, run:

npm start

Server will run on:
http://localhost:3000

--------------------------------------------------
STEP 5: FRONTEND SETUP (CLIENT)
--------------------------------------------------

Open a new terminal window.

1. Navigate to client folder:

cd client

2. Install dependencies:

npm install

3. Start the frontend app:

npm run dev

4. Open browser and go to:

http://localhost:5173

--------------------------------------------------
STEP 6: VERIFY APPLICATION
--------------------------------------------------

1. Header with logos should appear
2. Chat input box at the bottom
3. Type a message and click Send
4. AI response should be displayed

--------------------------------------------------
COMMON ISSUES
--------------------------------------------------

1. API key error
   - Ensure `.env` file exists inside server folder
   - Restart server after updating `.env`

2. Backend not responding
   - Check server is running on port 3000

3. Frontend cannot connect to backend
   - Verify backend URL in frontend code

--------------------------------------------------
LAB OBJECTIVE
--------------------------------------------------

By completing this lab, students will:
- Run a full-stack application
- Use environment variables securely
- Integrate Google Gemini API
- Understand client-server communication

--------------------------------------------------
END OF README
--------------------------------------------------
