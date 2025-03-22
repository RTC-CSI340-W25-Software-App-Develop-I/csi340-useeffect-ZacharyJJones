[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/CbVcogHk)
# useEffect

## Learning Goals

- [ ] Fetch data in a React application using useEffect
- [ ] Handle side effects in functional components
- [ ] Use the dependency array to control when useEffect runs
- [ ] Update state based on API responses

# Note: There's a lot of reading with example here, the actual lab does not begin until Lab Deliverables

# Fetch

**Frontend - Presentational**  
**Backend - Database**

## What is Fetch?

`fetch` is a function that allows us to make requests for data. We’ve already learned how to build an API with Express, and next quarter, we’ll cover how to store data. For this lesson, we’ll be working with an existing third-party API—**the SWAPI**—to retrieve starwars data.

## Review: What is the Request-Response Cycle?

Previously, we used **Postman** to retrieve data from our API. Now, we’ll implement a function that fetches data for us in the frontend.

## How does Fetch work?

The `fetch` function, much like Postman, it makes **HTTP requests**. Since the SWAPI is a **read-only API**, we’ll only be making **GET (Read) requests**.

## Fetch and Asynchronous JavaScript

In JavaScript, `fetch` works with the `async` and `await` keywords to handle asynchronous operations.

- A `fetch` request **returns a Promise**, meaning it waits for data to be retrieved.
- While waiting for a response, the rest of our program can continue executing.
- Once the response is received, the part of the program handling the data is **reintroduced into the execution flow**.
- Once we receive the response, it must be parsed. The .json() method is another asynchronous function that helps retrieve data from the response body.

```
async function getData() {

        const response = await fetch('https://example.com/resource');
        const data = await response.json();
        console.log(data);

}

getData();
```

# useEffect

`useEffect` is a **hook**, a special React function that manages **state** and the **lifecycle** of a component.

## React Component Lifecycle

React components go through three phases:

1. **Mounting Phase** – When the component is rendered for the first time.
2. **Updating Phase** – When the component re-renders due to state or prop changes.
3. **Unmounting Phase** – When the component is removed from the DOM.

The `useEffect` hook allows us to run code at specific points during this lifecycle.

```
import { useEffect } from "react";

function MyComponent() {
    useEffect(() => {
        console.log("Component has mounted!");

        return () => {
            console.log("Component is unmounting!");
        };
    }, []);

    return <div>Hello, React!</div>;
}
```

## Fetching Data on Component Mount

We will use `useEffect` to make a **fetch request when the component mounts**.

### How `useEffect` Works

`useEffect` takes **two arguments**:

1. A **callback function**, which runs when the component mounts and (optionally) when it unmounts.
2. A **dependency array**, which determines when the effect runs.

If the dependency array is **empty (`[]`)**, the effect runs **only once when the component mounts**.

### Example: Fetching Data with `useEffect`

```js
import { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://example.com/resource");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, [url]); // Runs again if the URL changes

  return <div>{data ? data : "Loading..."}</div>;
}
```

## ⚠️ Common Gotcha: The Dependency Array

In React, **updating state causes a component to re-render**.

- If you **omit the dependency array**, the effect **runs after every render**, which can lead to an **infinite loop**.
- Always include a **dependency array (`[]`)** when you want the effect to run **only once on mount**.

# Lab Deliverables

### 1. Fetch Data with useEffect

- Import `useEffect` and `useState` from React.
- Create a state variable `characters` using `useState([])`.
- Inside `useEffect`, call the fetch function when the component mounts.
- Fetch data from `https://swapi.dev/api/people/`.
- Update the state with the fetched data.
- Pass the `characters` state to `Cards`.
- Run the application with `npm run start`.

```

import { useEffect, useState } from "react";
import CardDetail from "./components/CardDetail";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (page) => {
    let res = await fetch(`https://swapi.dev/api/people`);
    let data = await res.json();
    setCharacters(data.results);
  };



  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container ">
        <div>
          <Cards
            characters={characters}
            onCharacterClick={fetchCharacterDetails}
          />
          <div>
        </div>
        {selectedCharacter && <CardDetail character={selectedCharacter} />}
      </div>
    </div>
  );
}

export default App;

```

### 2. Add Pagination

- **Create a `page` state variable** using `useState(1)` to track the current page number.

- **Modify `fetchCharacters`** to accept `page` as an argument and include it in the API request URL. Update `characters` state with the fetched results.

- .**Update `useEffect`** to call `fetchCharacters(page)` whenever `page` changes, ensuring new data is loaded dynamically.

- **Implement navigation buttons:**
  - A **Next** button increments `page`.
  - A **Back** button decrements `page` but is disabled when `page === 1`.

For additional improvements, consider checking API response pagination limits to disable the **Next** button when no further pages exist. 🚀

```
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (page) => {
    let res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    let data = await res.json();
    setCharacters(data.results);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    setSelectedCharacter(null);
  };

  const handleBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setSelectedCharacter(null);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container ">
        <div>
          <Cards
            characters={characters}
            onCharacterClick={fetchCharacterDetails}
          />
          <div>
            <button onClick={handleBack} disabled={page === 1}>
              Back
            </button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

```

## Extra credit

- Fetch a characters detail when clicking on a characters name and render it using the CardDetail component.

## Submission Instructions

1. Push your code to GitHub.
2. Submit the link to your GitHub repository URL.
