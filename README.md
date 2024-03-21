## Cats and Love

### Server Side

The server is implemented using Node.js, Express, and MongoDB.

The server code is located in the [server directory](./server).

To install dependencies and start the server, navigate to the server directory and run:

```bash
npm install
```

- To Run the server, use the following command:

```bash
node index.js
```

- This command installs the following dependencies:
  - Expressjs
  - mongodb
  - cors

#### Code Execution Mechanism

1.  GET /cats: This route fetches all cats from the "cats" collection in the database.
2.  GET /cats/:id: This route retrieves a specific cat by its ID. If the ID is invalid, an error is returned.
3.  POST /cats: This route creates a new cat in the "cats" collection. It expects a JSON body containing the cat's data.
4.  DELETE /cats/:id: This route deletes a specific cat by its ID. If the ID is invalid, an error is returned.
5.  PATCH /cats/:id: This route updates a specific cat by its ID. It expects a JSON body containing the updates to be made.

- The server also utilizes the express.json() middleware to parse incoming JSON data and the cors middleware to enable Cross-Origin Resource Sharing (CORS).
- The database connection is managed by the connectToDb and getDb functions in the db.js file.

### Client Side

The client code resides in the [client directory](./client).
Install all necessary dependencies by running:

```bash
npm install
```

- This command installs the following dependencies:
  - vite
    - react with tailwindcss

##### code work processing

1. **Importing Dependencies**: The code imports the necessary dependencies, including `useState` and `useEffect` hooks from React, `axios` for making HTTP requests, and a custom component `Head`.

2. **State Management**: The component uses the `useState` hook to manage three different state variables:

   - `cats`: An array to store the fetched cat data.
   - `isLoading`: A boolean to track if the data is being loaded.
   - `currentIndex`: An integer to keep track of the current index of the cat image being displayed.

3. **Data Fetching**: The `fastFetch` async function is defined to fetch the cat data from the server using `axios.get`. It updates the `isLoading` state before and after the fetch operation, and sets the fetched data to the `cats` state.

4. **useEffect Hook**: The `useEffect` hook is used to call the `fastFetch` function when the component mounts, ensuring that the cat data is fetched on the initial render.

5. **Like and Dislike Handlers**: The component defines two functions, `handleLike` and `handleDislike`, which are called when the respective buttons are clicked.

   - `handleLike` increments the like count for the current cat by making a `PATCH` request to the server using `axios.patch`. It then updates the local `cats` state with the new like count.
   - `handleDislike` works similarly, but it increments the dislike count instead.

6. **Back Button Handler**: The `handleBack` function is used to navigate back to the previous cat image by decrementing the `currentIndex`.

7. **Rendering**: The component renders different elements based on the `isLoading` state and the availability of cat data.

   - If `isLoading` is true, it displays a "Loading..." message.
   - If there are no cats in the `cats` array, it displays a "No cats sedlife" message.
   - Otherwise, it renders the current cat image along with like, dislike, and back buttons.

8. **Styling**: The code uses Tailwind CSS utility classes for styling the buttons and layout.

Overall, this code demonstrates the use of React hooks (`useState` and `useEffect`) for state management and side effects, as well as the integration of an external API using `axios`. It also showcases conditional rendering and event handling in React components.
