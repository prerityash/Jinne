# React Router

## 1. What is React Router?

**React Router** is a routing library for React applications that allows users to navigate between different pages or views without reloading the entire browser page.

In a normal website, navigating to another page may trigger a full-page reload. React Router enables client-side navigation, making React applications feel faster and smoother.

**Official Documentation:** [React Router](https://reactrouter.com/)

## 2. Why Do We Use React Router?

In a React application, we generally build multiple components representing different pages.

For example:
- Home Page
- About Page
- Login Page
- Register Page
- Dashboard
- Profile Page

React Router connects these components to different URLs.

Example:

| URL | Component |
|---|---|
| `/` | Home |
| `/about` | About |
| `/login` | Login |
| `/register` | Register |
| `/dashboard` | Dashboard |

Without a routing library, managing navigation between multiple views becomes more complicated.

## 3. Installation

Install React Router using npm.

```bash
npm install react-router
```

For projects using the React Router v7 library, the package is `react-router`. Existing projects using React Router v6 may use `react-router-dom`.

## 4. Important Concepts

### 4.1 BrowserRouter

`BrowserRouter` enables client-side routing using the browser's History API.

It allows the application to manage navigation without reloading the entire page.

### 4.2 Routes

`Routes` acts as a container for all the route definitions.

It checks the current URL and renders the matching route.

### 4.3 Route

`Route` defines the relationship between a URL path and the component that should be displayed.

Example:

```jsx
<Route path="/about" element={<About />} />
```

When the user visits `/about`, the About component is rendered.

### 4.4 Link

`Link` is used to navigate between routes without triggering a full-page reload.

Example:

```jsx
import { Link } from "react-router";

<Link to="/about">About</Link>
```

### 4.5 useNavigate

`useNavigate` is a React Router hook that allows navigation programmatically.

It is useful when navigation needs to happen after an event, such as successful login.

Example:

```jsx
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Login logic
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### 4.6 useParams

`useParams` retrieves dynamic values from the URL.

For example, consider this route:

```jsx
<Route path="/user/:id" element={<UserProfile />} />
```

If the URL is `/user/101`, the `id` parameter will be `101`.

Example:

```jsx
import { useParams } from "react-router";

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```

### 4.7 Nested Routes

Nested routes allow you to place multiple routes inside a parent route.

They are useful for dashboards containing multiple sections.

Example:

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

The parent component must render an `<Outlet />` where the nested component should appear.

```jsx
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
```

## 5. Complete Implementation Example

### Folder Structure

```text
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Login.jsx
├── App.jsx
└── main.jsx
```

### App.jsx

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Navbar.jsx

```jsx
import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
```

## 6. Advantages of React Router

1. **Client-side navigation:** Navigate without full-page reloads.
2. **Dynamic routing:** Handle URLs containing dynamic parameters.
3. **Nested routing:** Organize complex application layouts.
4. **Programmatic navigation:** Navigate after events such as login or form submission.
5. **Better organization:** Keep different application pages organized.

## 7. Important Hooks and Components

| Name | Purpose |
|---|---|
| `BrowserRouter` | Enables browser-based routing |
| `Routes` | Groups route definitions |
| `Route` | Defines URL-to-component mapping |
| `Link` | Provides navigation links |
| `NavLink` | Provides navigation links with active-state styling |
| `useNavigate()` | Navigates programmatically |
| `useParams()` | Reads dynamic URL parameters |
| `useLocation()` | Accesses the current location |
| `Outlet` | Renders nested routes |

## 8. Official References

- [React Router Documentation](https://reactrouter.com/)
- [Routing](https://reactrouter.com/start/declarative/routing)
- [BrowserRouter](https://reactrouter.com/api/declarative-routers/BrowserRouter)
- [Link](https://reactrouter.com/api/components/Link)
- [useNavigate](https://reactrouter.com/api/hooks/useNavigate)
- [useParams](https://reactrouter.com/api/hooks/useParams)

## 9. Summary

React Router is used to manage navigation and routing in React applications. It connects URLs to React components and provides features such as dynamic routes, nested routes, navigation links, and programmatic navigation.

It is particularly useful when developing multi-page applications such as dashboards, e-commerce platforms, job portals, and authentication-based applications.