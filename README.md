# Todo App

## Features

- Login with DummyJson Accounts
- See user info and can log out
- Add todos with title, description, due date, and priority
- Edit todos inline
- Automatic priority-based sorting (High → Medium → Low)
- Mark todos as complete/incomplete
- Delete todos

## Getting Started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the app in your browser at `http://localhost:5173`

## Usage

1. **View Mode**: See your todos sorted by priority
2. **Edit Mode**: Click "Edit Todos" to add, edit, and delete todos
3. **Add Todos**: Fill out the form with title, description, due date, and priority
4. **Edit Todos**: Click the Edit button on any todo to modify it
5. **Complete Todos**: Click the checkbox to mark todos as done
6. **Data Persistence**: Your todos are automatically saved to localStorage
7. **Login / Logout Functionality** : Log in using DummyJson accounts and see account information in the navbar.

## Building

To create a production version of the app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.
