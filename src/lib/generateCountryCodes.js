const fs = require('fs');
const callingCodes = require('./callingCodes');

const codes = callingCodes()

fs.writeFile('src/lib/countriesByCode.json', JSON.stringify(codes), (err) => {
  if (err) {
    throw err;
  }

  console.log('generated country codes file');
});

