# Task Tracker version 1
Hello, welcome to the repo of my task tracker application. A separate, private repo is configured with GitHub Actions workflows to dockerize and deploy the frontend and backend applications to Azure. This repo contains no sensitive data, and is not used in the forementioned CI/CD process. 

I designed this application as a comprehensive task management tool designed to simplify how users organize and track their tasks. I built it using Angular on the frontend for an intuitive user interface and Spring Boot on the backend to handle logic and data operations. Task data is stored in a Google Cloud MySQL database, ensuring secure and scalable storage.

Users can easily create new tasks by specifying details like the task name and description. Existing tasks can be modified to reflect updates or changes in status, and tasks can be deleted once completed or no longer needed. The application also supports task sorting, allowing users to organize their tasks by name or status and toggle between ascending and descending order for better task management.

Security and authentication are handled by Auth0, which ensures that users' data is protected and private. Only authenticated users can access the task features, providing an additional layer of security.

The entire application is dockerized (frontend and backend, separately), which makes deployment simple and consistent across different environments. By leveraging Azure's cloud infrastructure, the application is hosted in a secure and scalable environment, ensuring smooth performance for users. 

Just a quick heads up—my app is currently hosted on Azure as a free tier web app, which means it might be a bit slower to load and respond compared to apps hosted on a paid tier. The free tier provides limited resources, so if you notice any delays, that's the reason!

<img width="700" alt="Screenshot 2024-10-02 at 6 22 00 PM" src="https://github.com/user-attachments/assets/ca19fb0c-e818-476b-bde8-75494f2a99f4">
<img width="700" alt="Screenshot 2024-10-02 at 6 20 31 PM" src="https://github.com/user-attachments/assets/fe74bf9e-43e5-4656-b96f-93d10d9ee734">
<img width="700" alt="Screenshot 2024-10-02 at 6 21 39 PM" src="https://github.com/user-attachments/assets/2d243626-b97b-4b1d-ac99-c73c8d707b76">
<img width="700" alt="Screenshot 2024-10-02 at 6 20 41 PM" src="https://github.com/user-attachments/assets/e7a6e0bb-0aa3-4e02-9a40-9a083d169fc5">

Somedayday I might write a comprehensive guide on how do create and deploy this app. For the time being, the repository implicitly contains most of the information needed to duplicate my project if anyone desires to. 

