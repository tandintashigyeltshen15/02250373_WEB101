# README.md

## File Upload Implementation (Frontend)

### Overview

This project is a simple frontend file upload system built using React (Next.js). The goal was to create an easy-to-use interface where users can select or drag and drop files, while also checking if the files meet certain requirements like type and size. At this stage, the backend is not yet connected, so the upload process is not fully functional.

## Setup Instructions

1. Create a new Next.js project:

npx create-next-app file-upload
cd file-upload

2. Install the required dependencies:

npm install react-hook-form formidable axios react-dropzone

3. Run the project:

npm run dev

## Features Implemented

* A file upload form using React Hook Form
* File validation (checking file type and size)
* Drag-and-drop feature using react-dropzone
* Upload progress tracking using axios (UI-level)


## Project Structure

* pages/index.js → Contains the main user interface
* pages/api/upload.js → Placeholder for backend API


## Result

The frontend part of the application is working as expected. Users can interact with the UI, select files, and see validations. However, since the backend is not connected yet, the files cannot actually be uploaded. This part will be completed in WEB102 Practical 3.


# Reflection.md

## Documentation

In this practical, I worked on building the frontend of a file upload system using React and Next.js. I used react-hook-form to handle form inputs and validation, which made managing the form much easier. I also used axios to simulate file upload requests and track progress.

To make the interface more interactive, I added a drag-and-drop feature using react-dropzone. I also implemented file validation to ensure that only files with the correct type and size can be selected.

## Reflection

### What I Learned

Through this practical, I gained a better understanding of how file uploads work on the frontend side. I learned how to handle forms more efficiently, validate user input, and improve user experience with features like drag-and-drop.

I also understood how different libraries can work together to simplify development and make the application more interactive.

### Challenges Faced

One challenge I faced was understanding how the file upload process actually works between the frontend and backend. Since the backend is not connected yet, it was difficult to see the complete flow.

I also found it a bit tricky to implement validation correctly and manage multiple libraries at the same time.

### How I Overcame Them

I overcame these challenges by going through documentation, trying out examples, and testing each feature step by step. Breaking the task into smaller parts helped me understand how everything fits together.


