const express = require('express');
const router = express.Router();

const { extractPhoneNumber } = require('./extractPhoneNumber');

router.get('/phone-numbers', (req, res, next) => {
  let response = {}
  const phoneNumber = req.query.phoneNumber
  const countryCode = req.query.countryCode

  try {
    const extract = extractPhoneNumber(phoneNumber, countryCode)

    response = {
      phoneNumber: extract.phone,
      countryCode: extract.countryCode,
      localPhoneNumber: extract.local,
      areaCode: extract.area,
    }

    res.status(200)
  } catch (err) {
    // This handling should be improved - we can add specific Error objects
    // that we check on above. For brevity, I am just checking the message
    // itself right now
    response.phoneNumber = phoneNumber;

    if (err.message == 'string does not have a valid country code.') {
      response.error = {
        countryCode: 'required value is missing'
      }
    } else {
      response.error = {
        phoneNumber: 'value is invalid'
      }
    }

    res.status(422)
  }

  res.send(response)
});

module.exports = router
