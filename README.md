## Hello 

Welcome to the repo of my task tracker application. A separate, private repo is configured with GitHub Actions workflows to dockerize and deploy the frontend and backend applications to Azure. This repo contains no sensitive data, and is not used in the forementioned CI/CD process. 

I designed this application as a comprehensive task management tool designed to simplify how users organize and track their tasks. I built it using Angular on the frontend for an intuitive user interface and Spring Boot on the backend to handle logic and data operations. Task data is stored in a Google Cloud MySQL database, ensuring secure and scalable storage.

Users can easily create new tasks by specifying details like the task name and description. Existing tasks can be modified to reflect updates or changes in status, and tasks can be deleted once completed or no longer needed. The application also supports task sorting, allowing users to organize their tasks by name or status and toggle between ascending and descending order for better task management.

Security and authentication are handled by Auth0, which ensures that users' data is protected and private. Only authenticated users can access the task features, providing an additional layer of security.

The entire application is dockerized (frontend and backend, separately), which makes deployment simple and consistent across different environments. By leveraging Azure's cloud infrastructure, the application is hosted in a secure and scalable environment, ensuring smooth performance for users. 

Just a quick heads up—my app is currently hosted on Azure as a free tier web app, which means it might be a bit slower to load and respond compared to apps hosted on a paid tier. The same can be said for the Gcloud MySQL server. The free tier provides limited resources, so if you notice any delays, that's the reason! 

Since this is a hobby/showcase project, I have set the task limit per user to 5. Thanks for your understanding!

<img width="700" alt="Screenshot 2024-10-25 at 11 16 50 AM" src="https://github.com/user-attachments/assets/3373afcd-15c2-4056-afce-2fc8fd3dd814">
<img width="700" alt="Screenshot 2024-10-25 at 11 25 20 AM" src="https://github.com/user-attachments/assets/592d68d7-28a0-4417-8775-dba32ee8938d">
<img width="700" alt="Screenshot 2024-10-25 at 11 25 28 AM" src="https://github.com/user-attachments/assets/461c2a73-6966-48be-ab69-f1918b1bcfd9">
<img width="700" alt="Screenshot 2024-10-25 at 11 25 40 AM" src="https://github.com/user-attachments/assets/dd3301c2-886d-4b08-8bfa-ec150365ae34">
