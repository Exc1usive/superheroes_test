# Getting Started

After download/clone use npm install to install all dependencies (for server and client)

## Available Scripts

In the project directory, you can run:

### `npm start`

Build client-side and run the app.
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

### `npm test`

Launches the test runner in the watch mode.

### `npm install-server`

For install only server-side dependencies

### `npm install-client`

For install only client-side dependencies

## Test requirements

CRUD for superheroes ✔️

List all superheros, seeing only one image for each and it’s nickname, with pagination, showing 5 items at once ✔️

See the details of one particular superhero with all it’s information and images ✔️

Use Node.js ✔️

Write down unit tests, at least for the main logic ✔️

A README with the steps to run the solution, and a list of all the assumptions that
you made (if any) ✔️


## My solution step

For the first - create react app and init node server, then:
- Work with server side:
    - init server
    - connect to mongoDB
    - describe GET, POST, PUT and DELETE request
    - use multer to save images on server
    - use fs to delete images from server
    - use server-side-rendering
- Work with client side:
    - realize routing
    - create some component
    - use axios to manage request to server
    - use pagination to realize pagination
    - implement some bootstrap and css for beautiful appearance 
