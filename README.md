# Gymtime App

This proyect consist of a React application which consumes and API made previously.

## Do you want to use it or make changes?

If you want to run this project, you need to clone:

### Backend

```sh
git clone https://github.com/matiasvirgili/gymtime-backend
```

and create your environment variables in a `.env`. You can use the `.env.example` as a guide

### Frontend

```sh
git clone https://github.com/matiasvirgili/gymtime-frontend
```

and create your environment variables in a `.env`, and inside this the variable `REACT_APP_BACKEND_URL_PORT=http://localhost:XXXX` ("XXXX" needs to be a 4-digit number. The same number that is assigned to the "PORT" in the backend ".env")

### Start up

Now you are ready to run both proyects.

First you must run the projects through the terminal of `BACKEND`, with the following commands:

```sh
npm install
npm start
```

Second you must run the projects through the terminal of `FRONTEND`, with the same commands:

```sh
npm install
npm start
```
