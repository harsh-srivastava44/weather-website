const request = require("postman-request");
const accessKey = "e1fb8609e26d301aa935098695a47c0a";
const getCurrentWeather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable tofind location ", undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};
module.exports = { getCurrentWeather };
