# Trips Catalog application 

## Technologies used : Spring Boot, React and MongoDB

The project is composed from :
- Java service started at [localhost:8081](http://localhost:8081)
- React interface started at [localhost:3000](http://localhost:3000)
- MongoDb database at [mongodb://admin:*****@localhost:27017](mongodb://admin:*****@localhost:27017/?authSource=trips&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false)

## What is doing the project

1. Read the trips data from database and display them as a catalog
2. The user can filter in the catalog client side and also server side
3. The user can sort the results after trips the characteristics

![Ui print-screen Trips Catalog](trips_catalog.png)

4. Create, Update and delete trips

![Ui print-screen Manage Trip](manage_trip.png)

## How to run the Project
### UI
In the ui project directory, you can run:
### `npm install`
### `npm start`
This will install the dependencies and run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Server
Open the server project directory in IntelliJ IDEA.
Create a Run Configuration with these parameters:
- Main class: `abc.les.trips.TripsApplication`
- SDK: `java 17`
This will start the internet server at the url: [http://localhost:8081](http://localhost:8081)  

### Database
- Install MongoDB (5.0 for the app but should work any version)
- Create a new db named: `trips`
- Create an admin user using these commands in the mongo console:

```json
db.createUser({"user":"admin","pwd":"secret","roles":[{"role":"userAdminAnyDatabase","db":"admin"}]})
db.createUser({user: "admin",pwd: "secret",roles: [ { role: "readWrite", db: "trips" }]})
```
- Import the trips data from the json file [Data.json](./Data.json)


## Technical considerations

There are used these React external libraries: 

    - "axios": "^0.26.0",
    - "react-icons": "^4.3.1",
    - "react-redux": "^7.2.6",
    - "react-router-dom": "^6.2.2",
    - "react-toastify": "^8.2.0",
    - "redux-thunk": "^2.4.1",

The server is a Rest Web Service that expose the endpoint: `/api/trips` for GET, DELETE, POST and PUT

The GET request can use these optional parameters:
```java
@RequestParam(defaultValue = DEFAULT_PAGE_INDEX) int page,
@RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int size,
@RequestParam(defaultValue = DEFAULT_SORT) String sortBy,
@RequestParam(required = false) String filterBy,
@RequestParam(required = false) String filterFor)
``` 
where:
```java
    public final static String DEFAULT_PAGE_SIZE = "10";
    public final static String DEFAULT_PAGE_INDEX = "0";
    public final static String DEFAULT_SORT = "title";
```


