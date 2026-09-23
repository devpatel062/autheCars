# Authe Cars

A used-car dealership website built with MongoDB, Express, React and Node.js.

## Run the project locally

### 1. Check the prerequisites

Install Node.js 20.19+ (tested with Node.js 22.16), npm, and either a local MongoDB server or access to a MongoDB Atlas database.

```sh
node --version
npm --version
```

### 2. Open the project folder

Run the commands below from the `emperic` folder, which contains the root `package.json`, `client`, and `server` directories. For this checkout:

```sh
cd /Users/devpatel062/Documents/clone/pre2/emperic
```

If you copied the project elsewhere, use that location instead.

### 3. Install dependencies

```sh
npm install
```

This installs both frontend and backend dependencies through npm workspaces. You do not need to install them separately.

### 4. Configure MongoDB

Copy the example configuration to a `.env` file in the project root:

```sh
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead. Skip this copy if you already have a configured `.env` file.

For a local MongoDB server, use:

```dotenv
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/authe-cars
```

Start your local MongoDB service before continuing. MongoDB must be running separately; `npm run dev` does not start it.

For Atlas, replace `MONGODB_URI` with your database connection string, including the database name, username, and password. Your database user and network access settings must allow the connection. Keep `.env` private; it is excluded from Git.

### 5. Add sample cars (optional)

```sh
npm run seed
```

This adds four sample vehicles to MongoDB without overwriting existing records. Run it once for an initial inventory; rerunning it does not duplicate the sample cars. Without seeding or adding your own vehicles, the inventory will be empty.

### 6. Start the application

```sh
npm run dev
```

This starts the frontend and backend together. Keep the terminal open while using the app.

- Frontend: http://127.0.0.1:5173/
- Backend health check: http://127.0.0.1:4000/api/health
- Inventory API: http://127.0.0.1:4000/api/vehicles

If port 5173 is occupied, Vite chooses another port, such as 5174. Open the exact **Local** URL printed in the terminal.

The health check should return `{"status":"ok"}`. Open the frontend to browse cars and submit forms. Press **Ctrl+C** in the terminal to stop both servers.

### Run frontend and backend separately

From the project root, open two terminals:

```sh
# Terminal 1: backend
npm run dev -w server
```

```sh
# Terminal 2: frontend
npm run dev -w client
```

The frontend can display its pages on its own, but inventory and form submissions require the backend and MongoDB.

The app uses MongoDB for vehicles, enquiries, part-exchange requests and newsletter subscriptions. There is no in-memory demo mode. Sample cars are marked as sample inventory. Forms save requests; they do not send email.

## Structure

```text
client/
  public/images/       Logo, car photo and exchange illustration
  src/
    components/        Reusable navigation, vehicle and form components
    pages/             Home, inventory, part exchange and warranty pages
    App.jsx            Navigation and application state
    main.jsx           React entry point
    api.js             Fetch helper
    helpers.js         Price formatting and vehicle filters
    styles.css         All styles, including mobile layouts
server/
  models/              Vehicle, Submission and Subscriber schemas
  routes/              Separate vehicle, enquiry, part-exchange and newsletter routes
  server.js            Express setup and MongoDB connection
  seed.js              Optional sample inventory setup
```

## Production

After installing dependencies and configuring MongoDB, stop the development servers and run these commands from the project root:

```sh
npm run build
npm start
```

Open http://127.0.0.1:4000/. The backend serves both the built React app and the API on port 4000 (or `PORT` from `.env`). Keep MongoDB running. Rebuild after changing the frontend. These commands run the production build locally; they do not publish the website to the internet.

## Troubleshooting

- **`Set MONGODB_URI in the root .env file.`** — create `.env` inside `emperic`, alongside the root `package.json`, and set the connection string.
- **MongoDB connection refused or timed out** — check that your local MongoDB service is running, or verify the Atlas connection string and network access settings.
- **Frontend displays an inventory error or forms fail** — check the backend terminal and open `/api/health` on port 4000. The frontend forwards `/api` requests to that port.
- **Backend port 4000 is already in use** — stop the previous backend process. If you change `PORT` in `.env`, also update the API proxy target in `client/vite.config.js` and restart both servers.
- **Frontend link does not open** — use the Local URL printed by Vite; the port may have changed.
- **Production page cannot be found** — run `npm run build` before `npm start`.

## API

- `GET /api/vehicles` — inventory, with optional make, model, min, max, fuel, gearbox, body, drive, lifestyle and requirement filters.
- `POST /api/enquiry` — save a name, email, phone, optional vehicleId and message.
- `POST /api/part-exchange` — save contact details, registration and mileage.
- `POST /api/newsletter` — save an email address.
- `GET /api/health` — server status.
