# TikTok Web Clone

## Overview
This project is a simple TikTok-style web interface created using Next.js and React. The goal of the project was to understand how modern web applications are structured and how different components work together in a React-based framework.

The application includes a basic layout similar to the TikTok web version, with a sidebar for navigation, a header with search functionality, and several pages such as login, signup, profile, and upload.

Although the project does not include real video uploading or authentication, it demonstrates the structure and functionality of a modern frontend web application.

## Technologies Used
The project was built using the following technologies:

- Next.js
- React
- Tailwind CSS
- React Icons
- React Hook Form

## Main Features
Some of the key features included in this project are:

- Sidebar navigation similar to TikTok
- Multiple pages such as Home, Following, Explore, Live, Upload, Profile, Login, and Signup
- Form validation for login and signup
- Basic video feed layout
- Responsive layout using Tailwind CSS

## Project Structure
tiktok-clone
 |
src  
 ├ app  
 │ ├ Explore  
 │ ├ following 
 │ ├ live 
 │ ├ login 
 │ ├ Profile
 │ ├SignUp
 | └upload
 |
 |
 ├ components  
 │ ├ layout  
 │ │ └ MainLayout.jsx  
 │ └ ui  
 │ ├ VideoCard.jsx  
 │ └ VideoFeed.jsx  

## Running the Project

1. Install dependencies:

npm install

2. Start the development server:

npm run dev

3. Open the project in your browser:

http://localhost:3000

## Form Validation
The login and signup forms include basic validation checks such as:

- Required input fields
- Valid email format
- Password length requirements
- Password confirmation check
- Terms and conditions checkbox


