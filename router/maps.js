const express = require('express')
const router = express.Router()
const models = require('../models');

//check service health
router.get('/health', (req, res, next) => {
  res.status(200).json({
    service: 'running',
    status: 'healthy',
  });
});

router.get('/', (req, res, next) => {
  models.maps.getInitMap()
    .then((result) => {
      res.status(200).json({
        status: 'success',
        data: result,
      });
    }).catch((e) => {
      res.status(400).json({
        status: 'error',
        message: e,
      });
    });

})

//get Places Nearby
router.get('/getPlacesNearby', (req, res, next) => {
  const { keyword } = req.query;
  models.maps.getPlaces(keyword)
    .then(async (result) => {
      res.status(200).json({
        status: 'success',
        data: result,
      });
    }).catch((e) => {
      res.status(400).json({
        status: 'error',
        message: e,
      });
    });
})

router.get('/getPlacesPhoto', (req, res, next) => {
  const { ref } = req.query;
  models.maps.getPlacesPhoto(ref)
    .then((result) => {
      res.status(200).json(result);
    }).catch((e) => {
      res.status(400).json({
        status: 'error',
        message: e,
      });
    });
})
module.exports = router