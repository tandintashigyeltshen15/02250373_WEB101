# Project Reflection

## 1. Documentation

In this project, I developed a basic TikTok-style web interface using Next.js and React. The project helped me apply several important concepts in modern web development.

One of the main concepts used was **React components**. Components allow us to divide the user interface into smaller and reusable parts. For example, the layout, navigation sidebar, and UI elements were separated into different components to make the code more organized.

Another concept applied was **Next.js routing**. In Next.js, each folder inside the `app` directory represents a different page or route. By creating folders such as `login`, `signup`, `profile`, and `upload`, I was able to create different pages for the application.

I also used **Tailwind CSS** to style the interface. Tailwind provides utility classes that make it easier to design responsive layouts without writing a lot of custom CSS.

Additionally, I implemented **form validation using React Hook Form**. This allowed the login and signup forms to check user input and display error messages when fields were empty or invalid.

Navigation between pages was handled using **Next.js Link components**, which allow users to move between different pages without reloading the application.

---

## 2. Reflection

### What I Learned

Through this project, I learned how a web application can be structured using Next.js. I gained a better understanding of how components work and how separating code into different files makes a project easier to manage.

I also learned how to create forms with validation using React Hook Form. This helped me understand how to handle user input and prevent invalid data from being submitted.

Another important thing I learned was how routing works in Next.js. By organizing folders correctly inside the `app` directory, I was able to create multiple pages in the application.

---

### Challenges Faced

During the project, I faced several challenges. One of the main issues I encountered was a **404 error when clicking the login button**. This happened because the login page file was not placed in the correct folder structure required by Next.js.

After checking the documentation and reviewing the project structure, I realized that the login page needed to be placed inside:

src/app/login/page.jsx

Once I fixed the folder structure and restarted the development server, the login page started working correctly.

Another challenge I faced was some **typos in class names**, such as incorrect Tailwind CSS classes. These small mistakes caused some layout issues, but I fixed them by carefully checking the code.

# Screenshot:
<img src="![error](Practical/tiktok-clone/404 error.png)">


# (screenshot name = Working login page.png)

<img src=![resolved login](<Practical/tiktok-clone/Working login page.png>)>

Overall, this project helped me gain practical experience with React and Next.js. I learned how to build a structured web application, implement navigation between pages, and create forms with validation. Despite facing some challenges during development, solving these issues helped me better understand how modern web frameworks work.
