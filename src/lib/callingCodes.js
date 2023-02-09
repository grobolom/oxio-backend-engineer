/**
 * This file exports an object representing countries and their area codes.
 * This is used to more easily determine what the area code and country
 * code of a provided phone # is.
 */

// The below file was generated using https://github.com/mledoze/countries, and
// contains the country code and area codes of all currently recognized
// countries (and some things that are not countries but count as them
// for ISO-3166-1).
// It was generated with the following command:
// php countries.php convert -i cca2 -i idd
//
// This was done to simplify phone number calculation - since we don't
// know directly from the E.164 phone # format what counts as an area code
// and what does not, this list allows us to determine that.
const generatedCountryCodes = require('./countries.json')

// The format of the above list is in an awkward format:
// 
// [
//   { cca2: 'US', callingCodes: ["+1201", "+1202", ...], idd: { root: '+1', ... } },
//   { cca2: 'AL', ... },
//   ...
// ]
//
// for our purposes, we need to check if a phone number matches
// some number in this list, so we convert this list to an object with
// the following format:
//
// {
//   '+1201': { countryCode: 'US', prefix: '1' },
//   '+1202': { countryCode: 'US', prefix: '1' },
//   ...
// }
//
// This allows us to easily check if a given phone number starts with
// one of these calling codes, and what that calling code would be.

const countries = {}

for (const country of generatedCountryCodes) {
  for (const callingCode of country.callingCodes) {
    countries[callingCode] = {
      countryCode: country.cca2,
      prefix: country.idd.root,
    }
  }
}

module.exports = countries
