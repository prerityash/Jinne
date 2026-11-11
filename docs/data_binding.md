# Two-Way Data Binding in React.js

## 1. What is Data Binding?

Data binding means connecting the data of a JavaScript application with the user interface (UI).

For example, suppose we have a name stored in a React state:

```js
const [name, setName] = useState("Soumya");
```

We want to display this name inside an input field and also display it on the screen.

There are two possible directions of data flow:

1. State to UI.
2. UI to State.

When both directions are connected, it is commonly called **Two-Way Data Binding**.

---

## 2. Understanding Two-Way Data Binding

Two-way data binding means changes in the UI can update the state, and changes in the state can update the UI.

### Direction 1: State → UI

Suppose React state contains:

```jsx
const [name, setName] = useState("Soumya");
```

We connect the state to an input:

```jsx
<input value={name} />
```

Now the input field displays `Soumya`.

If the state changes to:

```jsx
setName("Rahul");
```

The input field automatically displays `Rahul`.

This is called State-to-UI data flow.

### Direction 2: UI → State

Now suppose the user types `Prerit` into the input field.

We use an event handler:

```jsx
onChange={(e) => setName(e.target.value)}
```

Here:

- `onChange` detects changes in the input.
- `e.target.value` gets the current input value.
- `setName()` updates the React state.

Now the state contains `Prerit`.

This is called UI-to-State data flow.

---

## 3. Complete Two-Way Data Binding Example

```jsx
import React, { useState } from "react";

function App() {

    const [name, setName] = useState("");

    return (
        <div>

            <h2>Enter Your Name</h2>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <h3>Hello, {name}</h3>

        </div>
    );
}

export default App;
```

### Understanding the Important Lines

**1. useState**

```jsx
const [name, setName] = useState("");
```

Creates a state variable named `name`.

Initially, its value is an empty string.

**2. value={name}**

```jsx
value={name}
```

Connects the input field with the React state.

Whatever value is stored in `name` will be displayed inside the input.

**3. onChange**

```jsx
onChange={(e) => setName(e.target.value)}
```

Whenever the user types something, React updates the state.

**4. Displaying the state**

```jsx
<h3>Hello, {name}</h3>
```

Displays the current value of the state.

---

## 4. What Happens If We Remove value={name}?

Consider this code:

```jsx
import React, { useState } from "react";

function App() {

    const [name, setName] = useState("");

    return (
        <div>

            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
            />

            <h3>Hello, {name}</h3>

            <button onClick={() => setName("Rahul")}>
                Change Name
            </button>

        </div>
    );
}

export default App;
```

### What will happen?

1. You type `Soumya` into the input.
2. The state gets updated to `Soumya`.
3. The heading displays `Hello, Soumya`.
4. Now click the Change Name button.
5. The state changes to `Rahul`.
6. The heading displays `Hello, Rahul`.

But the input field still displays `Soumya`.

### Why?

Because we removed:

```jsx
value={name}
```

Now the input field manages its own displayed value.

React receives the input changes through `onChange`, but it does not control the input's displayed value.

This is called an **Uncontrolled Component**.

---

## 5. Controlled vs Uncontrolled Components

| Controlled Component | Uncontrolled Component |
|---|---|
| Uses `value` | Usually uses `defaultValue` or no value prop |
| React state controls input value | DOM manages input value |
| Uses state and event handlers | Can use refs to read the value |
| Easy to validate input | Validation can require additional handling |

### Controlled Component

```jsx
<input
    value={name}
    onChange={(e) => setName(e.target.value)}
/>
```

React controls the input value.

### Uncontrolled Component

```jsx
<input
    defaultValue="Soumya"
/>
```

The DOM manages the input value after initialization.

---

## 6. How Does React Actually Handle It?

React follows **One-Way Data Flow**.

This is an important concept.

React does not automatically implement two-way data binding like Angular.

Instead, we manually connect both directions:

```text
         React State
              |
              | value={name}
              ↓
          Input Field
              |
              | onChange
              ↓
         setName()
              |
              ↓
         React State
```

The process:

1. React state provides the input value.
2. User changes the input.
3. `onChange` captures the new value.
4. `setName()` updates the state.
5. React re-renders the component.
6. The updated state is reflected in the input.

Therefore, controlled components provide two-way data binding behavior using React's one-way data flow.

---

## 7. Where Do We Use Two-Way Data Binding?

It is particularly useful in React forms.

Examples:

- Login forms.
- Registration forms.
- Search boxes.
- Profile editing.
- Feedback forms.
- Form validation.

For example, in a login form, we can store the email and password in React state and use those values when the user submits the form.

---

## 8. Interview Question

**Q. What is Two-Way Data Binding in React?**

Answer:

"Two-way data binding means synchronizing data between the UI and the application state in both directions. React follows one-way data flow by default, but we can achieve two-way data binding behavior using controlled components. We use the value prop to connect the input with React state and the onChange event to update the state whenever the user changes the input."

---

## 9. Key Takeaways

1. `useState()` stores and manages component data.
2. `value={name}` connects the input field with React state.
3. `onChange` detects changes made by the user.
4. `setName()` updates the state.
5. Controlled components allow React to control input values.
6. React follows one-way data flow, but controlled components provide two-way binding behavior.

**Remember:**

- `value` = State → UI.
- `onChange` = UI → State.
- Both together = Two-way data binding behavior.
