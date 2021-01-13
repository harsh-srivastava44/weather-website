const request = require("postman-request");
const mapBoxToken =
  "access_token=pk.eyJ1IjoiaGFyc2g0NCIsImEiOiJja2o0NWpjZG8waGdhMnFudmQwMWE2eG96In0.nW96YlT-cTEsltAj6V0oTA";
const getGeoCoordinates = (placeAddress, callback) => {
  const data = {
    latitude: 0,
    longitude: 0,
  };
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeAddress}.json?${mapBoxToken}`;
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to get coordinates for specified location", undefined);
    } else if (response.body.features.length === 0) {
      callback("Location not found please enter a valid location", undefined);
    } else {
      data.address = response.body.features[0].place_name;
      data.longitude = response.body.features[0].center[0];
      data.latitude = response.body.features[0].center[1];
      callback(undefined, data);
    }
  });
}; 
module.exports = { getGeoCoordinates };
