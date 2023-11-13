const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
require('dotenv').config();
const request = require('request');
const key = process.env.GOOGLE_MAPS_API_KEY;

const getInitMap = () => {
  return new Promise((resolve, reject) => {
    client
      .elevation({
        params: {
          locations: [{ lat: 45, lng: -110 }],
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        resolve(r.data);
      })
      .catch((e) => {
        reject(e.response.data);
      });
  })
}

// get place by keyword default at bang sue location
const getPlaces = (keyword) => {
  const location = { lat: 13.8067543, lng: 100.5309618 } // bang sue location
  const radius = keyword ? 5000000 : 500; //check keyword 
  const type = "restaurant";
  const language = 'th';
  return new Promise((resolve, reject) => {
    client
      .placesNearby({
        params: {
          location, radius, type, keyword, key, language
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        resolve(r.data.results);
      })
      .catch((e) => {
        reject(e.response.data);
      });
  })
}

//get places detail from place Id
const getPlacesDetail = (placeId) => {
  return new Promise((resolve, reject) => {
    client
      .placeDetails({
        params: { place_id: placeId },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        resolve(r.data.results);
      })
      .catch((e) => {
        reject(e.response.data);
      });
  })
}

//get places photo by photo reference
const getPlacesPhoto = (photoReference) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${key}`;
  return new Promise((resolve, reject) => {
    request.get(url).on('response', function (response, error) {
      if (error) {
        reject('');
      } else {
        resolve(response?.request?.uri?.href)
      }
    })
  })
}

module.exports = {
  getInitMap,
  getPlaces,
  getPlacesDetail,
  getPlacesPhoto,
};