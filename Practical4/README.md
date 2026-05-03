### Practical 4

## Connecting TikTok Frontend to Backend

# Overview
 
 > This practical connects the Next.js TikTok clone frontend (built in Practical 1) to the Express.js backend. The goal was to replace all mock/static data with real API calls, implement JWT-based authentication, and enable social features like following users, viewing a personalized feed, and liking videos.

 > Note: Since the TikTok clone was already set up during Practical 1, all Practical 4 work was done within that same project to avoid duplication.

# Project Structure

> The project follows a standard Next.js App Router structure with services, contexts, and components separated by concern:

tiktok-clone/
├── src/
│   ├── app/
│   │   ├── following/page.jsx        # Following feed page
│   │   ├── explore-users/page.jsx    # User discovery page
│   │   ├── profile/[userId]/page.jsx # Dynamic profile page
│   │   └── upload/page.jsx           # Video upload page
│   ├── components/
│   │   ├── ui/VideoCard.jsx          # Individual video component
│   │   ├── ui/VideoFeed.jsx          # Feed with infinite scroll
│   │   └── auth/AuthModal.jsx        # Auth modal
│   ├── contexts/authContext.jsx      # Global auth state
│   ├── services/videoService.js      # Video API calls
│   ├── services/userService.js       # User API calls
│   └── lib/api-config.js             # Axios instance
# Setup Instructions

Prerequisites
•	Node.js v18+
•	Backend server running (Express.js + Prisma)
•	PostgreSQL database set up

# Step 1: Install Dependencies
Run the following in the project root:
npm install axios jwt-decode react-hot-toast @tanstack/react-query

# Step 2: Configure Environment Variables
Create a .env.local file in the project root:
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Step 3: Start the Backend Server
cd tiktok-server
npm run dev
Ensure the backend is running on port 8000 before starting the frontend.

# Step 4: Start the Frontend
npm run dev
Visit http://localhost:3000 in your browser.

## Features Implemented

# Authentication
•	User registration and login using JWT tokens
•	Auth state managed globally via React Context
•	Token stored in localStorage and attached to every request via Axios interceptors
•	Protected routes redirect unauthenticated users

# Video Feed
•	For You feed fetches all videos from the backend
•	Cursor-based infinite scrolling pagination
•	Videos pause automatically when scrolled out of view
•	Like/unlike videos (requires login)

# Following System
•	Discover users on the Find Users page
•	Follow and unfollow users
•	Following feed shows only videos from followed users
•	Empty state shown when not following anyone or no videos posted

# User Profiles
•	Dynamic profile pages at /profile/[userId]
•	Shows uploaded videos, follower count, and following count
•	Follow/unfollow button on other users' profiles
•	Edit profile (name, bio, avatar) on own profile

# Key Files Explained

> src/lib/api-config.js
Sets up a centralised Axios instance pointing to the backend. A request interceptor automatically attaches the JWT token from localStorage to every outgoing request. A response interceptor handles 401 errors by clearing the token and redirecting to login.

> src/contexts/authContext.jsx
Provides global authentication state (current user, login/logout functions, isAuthenticated flag) to the entire app using React Context. Wrapped around the app in layout.js.

> src/services/videoService.js
Contains all video-related API calls: fetching the For You feed, fetching the Following feed, liking/unliking, fetching comments, and uploading videos.

> src/services/userService.js
Contains all user-related API calls: fetching profiles, following/unfollowing, getting followers/following lists, and updating profiles.

> src/components/ui/VideoFeed.jsx
Uses @tanstack/react-query's useInfiniteQuery to fetch and paginate videos. Switches between the For You and Following feeds based on the feedType prop passed in.

> src/components/ui/VideoCard.jsx
Displays an individual video with user avatar, caption, video player, and like/comment/share buttons. Uses IntersectionObserver to pause videos when they leave the viewport.

# Backend Routes Used

Method    	Endpoint        	       Description
POST	   /api/users/register	      Register a new user
POST	   /api/users/login	          Login and receive JWT
GET        /api/users/:id	          Get user profile
GET	       /api/users/:id/followers	  Get user's followers
GET	       /api/users/:id/following	  Get user's following list
POST	   /api/users/:id/follow	  Follow a user
DELETE	   /api/users/:id/follow	  Unfollow a user
GET	       /api/videos	              Get all videos (For You feed)
GET	       /api/videos/following	  Get videos from followed users
POST	   /api/videos/:id/like	      Like a video
DELETE	   /api/videos/:id/like	      Unlike a video

# Testing the Application
1.	Register at least two separate accounts
2.	Upload videos with different accounts
3.	Follow users via the Find Users page
4.	Check the Following feed — videos from followed users should appear
5.	Like videos and verify the count updates
6.	Visit user profiles by clicking on usernames or avatars
7.	Log out and log back in to verify token persistence

# Common Issues & Fixes

> Following feed shows empty
Ensure the /api/videos/following route is defined before the /:id route in videoRoutes.js. Also make sure req.user.id is parsed with parseInt() in the controller, since JWT payloads return IDs as strings.

> Like button not working
The like routes were accidentally commented out in videoRoutes.js. The fix was to uncomment:
router.post('/:id/like', protect, videoController.toggleVideoLike);
router.delete('/:id/like', protect, videoController.toggleVideoLike);

> Autoplay error in browser
Browsers block autoplay until the user interacts with the page. The solution was to remove autoplay entirely and instead let users click the play button manually. Videos still pause automatically when scrolled out of view using IntersectionObserver.

> Profile page 404
The file must be located at exactly src/app/profile/[userId]/page.jsx with square brackets in the folder name. Without the brackets, Next.js does not recognise it as a dynamic route.




