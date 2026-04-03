# YouTube Home Page Clone using React

## Overview

This project is a simplified recreation of the YouTube home page interface built using 
React.js. The goal of this project is to demonstrate a clear understanding of component-based architecture, reusable UI elements, and responsive design.

Instead of focusing on backend functionality, the project emphasizes clean UI structure, layout design, and frontend logic using mock data.


## Objective

The main objective of this application is to:

- Recreate the layout of the YouTube home page
- Practice building reusable React components
- Implement a responsive design for different screen sizes
- Organize code in a clean and maintainable structure


## Functionality

This application currently supports the following features:

- Displays a list of videos using mock data
- Each video is shown using a reusable **VideoCard component**
- A structured layout with:
  - Navigation bar (logo, search bar, icons)
  - Sidebar (Home, Shorts, Subscriptions, Account)
  - Video grid section
- Responsive design:
  - Sidebar hides on smaller screens
  - Video grid adjusts based on screen size
- Static UI elements like:
  - Search bar (UI only)
  - Upload, notification, and voice icons

> Note: Since his is a frontend-only project. No backend or API integration is used in my assignment.


## Component Structure

The application is built using a modular component structure:


youtube-clone
|
|----Navbar
|  |----Logo
|  |----SearchBar
|  |----Icons(Upload, Notification and voice)
|
|
|----Sidebar
|  |----SidebarItem
|
|
|----Videos
|  |----VideoGrid
|-------VideoCard
> This structure improves reusability and makes the code easier to manage.

## Data Source

This application uses a local mock data file in src/data/video.js


This file contains an array of video objects with properties such as:

- title
- channel
- views
- time
- thumbnail

This approach simulates real-world data without requiring an API.

## Design & Styling

- Built using plain CSS
- Focus on spacing, alignment, and layout
- Styled to resemble YouTube’s interface while keeping implementation simple
- Includes hover effects and visual hierarchy


## Responsive Design

The application is responsive across:

- Desktop → Full layout with sidebar and video grid  
- Tablet → Adjusted grid layout  
- Mobile → Sidebar hidden, single-column videos  

Media queries are used to handle responsiveness.

## Technologies Used

- React.js (Create React App)
- JavaScript (ES6)
- HTML5
- CSS3
- React Icons

## How to Run the Project

1. Clone the repository:

git clone https://github.com/tandintashigyeltshen15/02250373_WEB101.git

2. Navigate into the project folder.

cd youtube-clone

3. Install dependencies

npm install

4. Run the app:

npm start

5. The app will open at

http://localhost:3000
