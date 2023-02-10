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
//   'US': '+1',
//   'GB': '+44',
//   ...
// }

const CCA2Codes = (codes = generatedCountryCodes) => {
  const countries = {}

  for (const country of codes) {
    const info = country.idd

    // some countries in the list might not have a prefix / root
    if (!info.root) {
      continue;
    }

    const prefix = info.suffixes.length > 1 ? info.root : "".concat(info.root, info.suffixes[0])

    countries[country.cca2] = prefix
  }

  return countries
}

module.exports = CCA2Codes
