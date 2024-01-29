require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const dbConn = require("./config/dbConn");
const mongoose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = process.env.PORT || 3500;

dbConn();
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data(form data)
app.use(express.urlencoded({ extended: false }));

// middelware to handle static files like css
app.use(express.static(path.join(__dirname, "/public")));

// middleware to handle json
app.use(express.json());

//middleware to handle cookies
app.use(cookieParser());

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/drug", require("./routes/api/drugs"));
app.use("/customer", require("./routes/api/customers"));
app.use("/pres", require("./routes/api/prescreptions"));

// if connected to DB listen otherwise dont
mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB")
  app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
    
  });
});
