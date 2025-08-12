# Lost & Found Backend
## DEMO VIDEO ##
## Demo Video

[Watch the demo video here](https://youtu.be/jm144aEKUlQ)

This is the backend server for the Lost & Found application. It handles user authentication, item management (posting, viewing, and deleting lost/found items), and serves as the API for the frontend. See the live project frontend and full-stack features here: [CodeSandbox Lost & Found](https://codesandbox.io/p/sandbox/lostnfound-cgj6mw).

---

## Purpose

The Lost & Found backend provides a secure and efficient platform for users to report, find, and manage lost or found items. It aims to facilitate the process of recovering lost belongings and re-connecting lost items with their rightful owners in public spaces such as campuses, offices, or communities.

---

## Features

- **User Authentication:**  
  - Secure signup and login using email and password.
  - Passwords are hashed using bcrypt.
  - JWT-based authentication for protected routes.

- **Lost & Found Item Management:**  
  - Users can post new lost or found items with details like title, description, location, and status.
  - All users (including unregistered users) can view all listed items.
  - Filter items by status (`lost` or `found`) via query parameters.
  - Only logged-in users can add new items or delete items they created.
  - Each item is associated with the posting user (owner's name and email available).

- **API Endpoints:**  
  - `/api/auth/signup`: Register a new user.
  - `/api/auth/login`: Authenticate and receive a JWT token.
  - `/api/items`: View all items or filter by status (public route).
  - `/api/items` (POST): Add a new item (protected route).
  - `/api/items/:id` (DELETE): Delete an item (protected, only by the owner).

- **Frontend Integration:**  
  - Built to work seamlessly with a React frontend ([see CodeSandbox](https://codesandbox.io/p/sandbox/lostnfound-cgj6mw)).
  - CORS enabled for cross-origin requests.

---

## Technologies Used

- **Node.js** and **Express.js**: Server framework and routing.
- **PostgreSQL**: Relational database to store users and items.
- **bcrypt**: Secure password hashing.
- **jsonwebtoken (JWT)**: Authentication and route protection.
- **dotenv**: Manage environment variables securely.
- **CORS**: Enables secure cross-origin requests.
- **React Using Hooks (frontend, see CodeSandbox)**: User interface and interaction.
- **Browse Routes**: For efficient navigation between pages .
  
---

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Aditya22022/lost-and-found-backend.git
   cd lost-and-found-backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file with:
   ```
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=your_database
   JWT_SECRET=your_secret_key
   ```

4. **Start the server**  
   ```bash
   node server.js
   # or
   npm start
   ```

5. **Frontend**  
   - See and interact with the full-stack app at [CodeSandbox Lost & Found](https://codesandbox.io/p/sandbox/lostnfound-cgj6mw).

   **Screenshots of the website in working**
<img width="700" height="300" alt="Screenshot 2025-08-12 112920" src="https://github.com/user-attachments/assets/fb63cd29-690b-4236-bd81-8325764cb1ef" />
-
<img width="700" height="300" alt="Screenshot 2025-08-12 112933" src="https://github.com/user-attachments/assets/b4837af6-6cef-4e08-a385-730495db3443" />
-
<img width="700" height="300" alt="Screenshot 2025-08-12 112949" src="https://github.com/user-attachments/assets/504994cf-ffb2-4358-bef4-a2156971bba6" />
-
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/4751b356-f5f6-4240-863f-94fd5d792697" />

-
<img width="700" height="300" alt="Screenshot 2025-08-12 113027" src="https://github.com/user-attachments/assets/80aad480-eab4-4a81-9063-c4b2980eadcc" />






NOTE : I still have plans to improve this project by adding certain features and also this hasnt been uploaded on cloud/render/vercel etc ..it has only been deployed into local database only as of now. THANK YOU.
---

