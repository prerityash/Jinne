# Axios

## 1. What is Axios?

**Axios** is a JavaScript HTTP client library used to send HTTP requests from a frontend application to a backend server or external API.

It allows applications to communicate with servers, exchange data, and perform operations such as fetching users, submitting forms, updating records, and deleting data.

Axios is Promise-based and works in both browser and Node.js environments.



**Official Documentation:** [Axios](https://axios-http.com/docs/intro)

## 2. Why Do We Use Axios?

In a React application, we often need to communicate with backend APIs to retrieve or send data.

For example:
- Fetch user information.
- Submit login and registration forms.
- Retrieve products from a database through an API.
- Update user profiles.
- Delete records.
- Upload files to a server.

Axios simplifies these operations by providing an easy-to-use interface for making HTTP requests.

## 2.1 Axios vs Fetch API

Before Axios became popular, developers commonly used native JavaScript `Fetch API` to communicate with backend servers.

The Fetch API is built into modern browsers, so it does not require installing any external package. Axios, on the other hand, is an external JavaScript library that simplifies HTTP communication.

Both can perform HTTP operations such as GET, POST, PUT, PATCH, and DELETE.

### What is Fetch API?

Fetch API is a built-in JavaScript functionality used to send HTTP requests and receive responses from servers.

Example of a GET request using Fetch:

```javascript
async function getUsers() {
    try {
        const response = await fetch("/api/users");

    if (!response.ok) {                         //we have to check for the ok response 
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
      console.error(error.message);
  }
}
```

### Comparison Between Axios and Fetch

|         Feature      |                Axios                    |        Fetch API               |
|----------------------|-----------------------------------------|--------------------------------|
| Installation         |      Requires package installation      |      Built into browsers       |
| JSON response        | Automatically transforms JSON responses |         Requires `.json()`     |
| Error handling       | Rejects on non-2xx HTTP responses       | Does not reject on HTTP errors |
| Interceptors         |               Built-in support          | Requires custom implementation |
| Request cancellation |            Supports AbortController     |      Supports AbortController  |


### Why Did We Choose Axios Over Fetch?

Although Fetch API can perform all the basic HTTP operations required by our application, we chose Axios because it provides additional features that make API communication easier to manage.

**Main benefits of Axios:**

1. **Automatic JSON Transformation:** Axios automatically transforms JSON response data, so we do not need to call `.json()` manually.

2. **Simpler Syntax:** HTTP requests can be written with less boilerplate code.

3. **Better Error Handling:** Axios automatically rejects requests when the server responds with unsuccessful HTTP status codes, making centralized error handling easier.

4. **Interceptors:** We can attach authentication tokens to outgoing requests and handle common response errors in one place.

5. **Reusable Instances:** We can configure a common backend URL, headers, and timeout settings using `axios.create()`.

6. **Centralized API Management:** We can keep API configurations and request logic in separate service files, improving project maintainability.

### Example: POST Request Comparison

**Using Fetch API:**

```javascript
async function createUser() {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John",
        email: "john@example.com"
      })
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Using Axios:**

```javascript
async function createUser() {
  try {
    const response = await axios.post("/api/users", {
      name: "John",
      email: "john@example.com"
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

## 4. HTTP Methods in Axios

Axios supports different HTTP methods to perform operations on backend resources.

### 4.1 GET Request

A GET request is used to retrieve data from a server.

Example:

```jsx
import axios from "axios";

async function getUsers() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

### 4.2 POST Request

A POST request is used to send new data to the server.

Example:

```jsx
async function createUser() {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      {
        name: "John",
        email: "john@example.com"
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

### 4.3 PUT Request

A PUT request is generally used to replace an existing resource.

Example:

```jsx
async function updateUser() {
  try {
    const response = await axios.put(
      "https://api.example.com/users/1",
      {
        name: "John Updated",
        email: "updated@example.com"
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

### 4.4 PATCH Request

A PATCH request is used to partially update an existing resource.

Example:

```jsx
async function updateUserEmail() {
  try {
    const response = await axios.patch(
      "https://api.example.com/users/1",
      {
        email: "newemail@example.com"
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

### 4.5 DELETE Request

A DELETE request is used to delete an existing resource.

Example:

```jsx
async function deleteUser() {
  try {
    const response = await axios.delete(
      "https://api.example.com/users/1"
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

## 5. Understanding Axios Response

When Axios successfully receives a response, it provides an object containing information about the server response.

Important response properties:

| Property | Description |
|---|---|
| `response.data` | Actual data returned by the server |
| `response.status` | HTTP status code |
| `response.statusText` | HTTP status message |
| `response.headers` | Response headers |
| `response.config` | Request configuration |

Example:

```jsx
const response = await axios.get("/api/users");

console.log(response.data);
console.log(response.status);
```

Usually, `response.data` is the property you will use to access backend data.

## 6. Using Axios with React useEffect

When building React applications, we frequently need to fetch data when a component loads.

We can use `useEffect` with Axios to achieve this.

Example:

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>User List</h1>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Users;
```

**Explanation:**

1. `useState` stores the users and loading status.
2. `useEffect` runs the fetching logic when the component mounts.
3. `axios.get()` sends a GET request.
4. `setUsers()` updates the React state with the response data.
5. `finally` ensures the loading state is updated whether the request succeeds or fails.

## 7. Axios Instance

An Axios instance allows us to create a reusable HTTP client with common configuration.

Instead of repeatedly writing the backend URL in every request, we can configure a base URL once.

Example:

Create `src/services/api.js`:

```jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
```

Now use this instance anywhere in the application:

```jsx
import api from "../services/api";

const response = await api.get("/users");
```

The complete request URL becomes:

`http://localhost:5000/api/users`

**Benefits:**
- Avoids repeating the backend URL.
- Centralizes request configuration.
- Makes API management easier.
- Allows common headers and timeout settings.

## 8. Axios Interceptors

Interceptors allow us to execute custom logic before a request is sent or after a response is received.

There are two main types:

### 8.1 Request Interceptor

Runs before a request is sent to the server.

It is commonly used to attach authentication tokens to requests.

Example:

```jsx
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### 8.2 Response Interceptor

Runs when a response is received or when a request fails.

It can be used for centralized error handling.

Example:

```jsx
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access");
    }

    return Promise.reject(error);
  }
);
```

## 9. Error Handling in Axios

Axios provides useful information about failed requests through its error object.

Three common cases:

| Error type | Meaning |
|---|---|
| `error.response` | Server responded with an unsuccessful HTTP status |
| `error.request` | Request was sent but no response was received |
| Other errors | Problem occurred while setting up the request |

Example:

```jsx
try {
  const response = await axios.get("/api/users");
  console.log(response.data);
} catch (error) {
  if (error.response) {
    console.log("Server Error:", error.response.status);
  } else if (error.request) {
    console.log("No response received from server");
  } else {
    console.log("Error:", error.message);
  }
}
```

## 10. Recommended Folder Structure

For a React application, it is good practice to separate API-related logic from UI components.

```text
src/
│
├── components/
│
├── pages/
│   ├── Home.jsx
│   └── Users.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── userService.js
│
├── App.jsx
└── main.jsx
```

For example, `userService.js`:

```jsx
import api from "./api";

export const getUsers = () => {
  return api.get("/users");
};

export const createUser = (userData) => {
  return api.post("/users", userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};
```

This approach keeps API logic separate from React components and makes the application easier to maintain.

## 11. Best Practices

1. Create a reusable Axios instance instead of repeating configuration.
2. Keep API calls in separate service files for larger applications.
3. Always handle request errors.
4. Use loading states while fetching data.
5. Set appropriate request timeouts.
6. Avoid exposing sensitive API keys or secrets in frontend code.
7. Use environment variables for backend URLs.
8. Use interceptors for common authentication and error-handling logic.
9. Cancel unnecessary requests when components unmount or requests become outdated.
10. Do not store sensitive authentication tokens in localStorage without considering the security implications.

## 12. Official References

- [Axios Official Documentation](https://axios-http.com/docs/intro)
- [Installation](https://axios-http.com/docs/intro)
- [GET Requests](https://axios-http.com/docs/api_intro)
- [POST Requests](https://axios-http.com/docs/post_example)
- [Request Configuration](https://axios-http.com/docs/req_config)
- [Response Schema](https://axios-http.com/docs/res_schema)
- [Error Handling](https://axios-http.com/docs/handling_errors)
- [Interceptors](https://axios-http.com/docs/interceptors)
- [Instance Creation](https://axios-http.com/docs/instance)
- [Cancellation](https://axios-http.com/docs/cancellation)

## 13. Summary

Axios is a Promise-based HTTP client used to communicate between frontend applications and backend APIs.

It simplifies HTTP operations such as GET, POST, PUT, PATCH, and DELETE. In React applications, it is commonly used with `useEffect` and `useState` to fetch and manage server data.

Features such as Axios instances, interceptors, and centralized error handling make it easier to build scalable and maintainable applications.