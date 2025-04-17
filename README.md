# Distance Calculator

This application calculates the distance between two address locations. 

This is a Sveltekit frontend, Node.js backend, Express.js framework application. Node version 22.14.0, 
Express version 5.1.0, Axios version 1.8.4, CORS version 2.8.5 and is supported by a MongoDB database.

To run the project,  clone the project from the following GitHub repository by running the following url 
in your terminal `https://github.com/CodeNameJacks/distancecalc.git`.  Cd into the project folder `distancecalc`. 
Then cd into the `frontend` folder. Copy the frontend env file that was emailed to you into the root folder. 
Rename it to .env. When renaming the .env file make sure that a .txt extension didn’t automatically attach to the document.

Now run `npm install` to ensure that all the dependencies have installed.

Now cd into the `backend` folder. Similarly, copy the back end .env file into the root folder. Rename it to .env and then run `npm install`.  

To run the project locally, on the backend folder run `npx tsc` in the terminal. Then run `node dist/index.js` 
You should see a message that the backend is running on `http://localhost:3000`.   Now go to the frontend folder and run `npm run dev`. 

You should see a message the frontend is running on `http://localhost:5173`. Enter that the full `http://localhost:5173` address into the web 
browser to view and interact with the application. 

