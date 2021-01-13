const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoUtils = require("../utils/geocode.js");
const weatherUtils = require("../utils/weather.js");
const app = express();

//PORT provided by heroku.
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Harsh Srivastava",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Harsh Srivastava",
  });
});
app.get("/products", (req, res) => {
  console.log("---->", req.query);
  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Harsh Srivastava",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Pass in address feild",
    });
  }
  geoUtils.getGeoCoordinates(
    req.query.address,
    (error, { latitude, longitude, address } = {}) => {
      if (error) {
        return res.send({
          error: "Error in fetching data for place",
        });
      }
      weatherUtils.getCurrentWeather(
        latitude,
        longitude,
        (error, currentWeather) => {
          if (error) {
            return res.json({ error: "Error in getting current weather" });
          }
          res.send({
            forecast: `its currently ${currentWeather.weather_descriptions}. The current temprature is ${currentWeather.temperature}°C`,
            location: req.query.address,
            address,
          });
        }
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harsh Srivastava",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harsh Srivastava",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
