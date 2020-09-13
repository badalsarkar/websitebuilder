const express = require("express");
const {
    startServer,
    configureDependencies
} = require("./config/config.server");
let app = express();

//require all the routers
const usersRouter = require("./routes/routes.users");
const profileRouter = require("./routes/routes.profile");
const globalSettingRouter = require("./routes/routes.globalsetting");
const projectRouter = require('./routes/routes.project');
const reviewsRouter = require('./routes/routes.reviews');
const connectionRouter = require('./routes/routes.connect');

//configure the app
//this function adds all necessary middleware to the app
//for example: body-parser
app = configureDependencies(app);

//attach all routers
app.use("/api/users", usersRouter);
app.use("/api/globalsettings", globalSettingRouter);
app.use("/api/profilesettings", profileRouter);
app.use("/api/projects", projectRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/connections", connectionRouter);

//start the server
//the database connection is already established
startServer(app);

