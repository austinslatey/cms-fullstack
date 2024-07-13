# cms-fullstack

## Deployment
View deployed webpage [here](https://cms-fullstack.onrender.com)

## Description
This application is a social media platform where users can create, view, and interact with posts (thoughts). Users can follow other users, add reactions to thoughts, and manage their profiles. The application is built using React for the frontend, Express for the backend, and MongoDB for the database.

## Features
- User authentication and authorization using cookies.

- Create, update, and delete posts.

- Follow/unfollow users.

- Add reactions to posts.

- View user profiles and their posts.

- Responsive design using Bootstrap.

## Installation
1. Clone the repository

2. Install both front and backend dependencies using concurrenly

- `npm install`

3. Start the development server

- `npm run develop`

## Usage 
1. Ensure MongoDB is running on your system.

2. Start the backend server and the frontend development server as described in the installation steps.

3. Open your browser and navigate to http://localhost:3000

### User Authentication
- Users can sign up and log in.

- User sessions are managed using cookies.

### Creating and Managing Posts
- Users can create new posts (thoughts) and view them on their profile page.

- Only the user who created a post can update or delete it.

### Following Users
- Users can follow other users.

- The profile page shows followers and following lists.

### Adding Reactions
- Users can add reactions to posts.

- A modal allows users to enter and submit their reactions.

## API Endpoints

### User Endpoints
- POST /api/users/signup: Create a new user.
- POST /api/users/login: Log in a user.
- GET /api/users/:id: Get user details.
- PUT /api/users/:id: Update user details.

### Thought Endpoints
- GET /api/thoughts: Get all thoughts.
- POST /api/thoughts: Create a new thought.
- GET /api/thoughts/:id: Get a specific thought.
- PUT /api/thoughts/:id: Update a thought.
- DELETE /api/thoughts/:id: Delete a thought.

### Reaction Endpoints
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.


## Troubleshooting

### Common Issues
- Empty Thought List for User: Ensure that the `user_id` field in the `Thought` model references the `User` model instead of using the username field.

- Button Text Display Issues: Adjust CSS to ensure buttons are displayed correctly and not affected by surrounding elements.

### Debugging Tips
- Check the browser console for errors and log output.
- Use Postman or similar tools to test API endpoints directly.