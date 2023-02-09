const fs = require('fs');
const callingCodes = require('./callingCodes');

const codes = callingCodes()

// this should probably not be hardcoded, and most likely this whole process
// might be better done as a bin script, or something similar
fs.writeFile('src/lib/countries/countriesByCode.json', JSON.stringify(codes), (err) => {
  if (err) {
    throw err;
  }

  console.log('generated country codes file');
});

