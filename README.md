
# Task Management Application

## Project Description
This is a Task Management Application developed as part of the practical assessment for the Associate Software Engineer position at CelaTa Tech (Pvt) Ltd. The application allows users to manage their tasks effectively by providing CRUD (Create, Read, Update, Delete) functionality. Additionally, the application supports task categorization, user authentication, and real-time updates.

## Objectives
- Develop a full-stack web application using Laravel and Vue.js.
- Implement RESTful API principles.
- Utilize MySQL or MongoDB for database management.
- Integrate Git for version control.
### ER Diagram
![image](https://github.com/user-attachments/assets/b15a4788-7fa4-40aa-912d-d6d92c68396c)


## Features
### Backend (Laravel)
- **API Endpoints**:
- **Data Validation**:
  - Server-side validation for all input fields to ensure data integrity.
- **Database**:
  - MySQL database with schema design for Users, Tasks, and Categories.
  - Relationships:
    - A user can have many tasks.
    - A task can belong to a category.

### Frontend (Vue.js)
- **User Interface**:
  - Responsive and intuitive UI designed with Vue.js.
  - Views include:
    - Dashboard displaying tasks.
    - Forms for creating and editing tasks and categories.
- **State Management**:
  - Application state managed using Vuex.
- **API Integration**:
  - Asynchronous API requests integrated with the backend.
  - Loading states managed effectively.
- **Real-time Updates**:
  - Real-time task updates implemented using WebSockets/Laravel Echo.

### Database
- **Choice of Database**:
  - MySQL
- **Data Seeding**:
  - Database populated with sample data for testing purposes.

### Version Control (GitHub/GitLab)
- **Repository**:
  - Code hosted on a GitHub repository.


## Technologies Used
- Backend: Laravel (PHP Framework)
- Frontend: Vue.js (JavaScript Framework)
- Database: MySQL
- Version Control: Git, GitHub

## Directory Structure
```
|-- backend/        # Laravel application
|   |-- app/        # Application files
|   |-- config/     # Configuration files
|   |-- database/   # Migrations and seeders
|-- frontend/       # Vue.js application
|   |-- src/        # Source files
|   |-- public/     # Public assets
|-- README.md       # Project documentation
```



# Frontend install

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
