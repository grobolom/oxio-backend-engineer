const fs = require('fs');

const callingCodes = require('./callingCodes');
const CCA2Codes = require('./CCA2Codes');

const codes = callingCodes()
const cca2Codes = CCA2Codes()

// this should probably not be hardcoded, and most likely this whole process
// might be better done as a bin script, or something similar
fs.writeFile('src/lib/countries/countriesByCallingCode.json', JSON.stringify(codes), (err) => {
  if (err) {
    throw err;
  }

  console.log('generated country codes file');
});

fs.writeFile('src/lib/countries/countriesByCCA2.json', JSON.stringify(cca2Codes), (err) => {
  if (err) {
    throw err;
  }

  console.log('generated cca2 codes file');
});

