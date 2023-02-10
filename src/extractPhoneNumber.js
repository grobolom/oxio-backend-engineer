/**
 * E164 is a simple format with a lot of complexity. In the strictest sense,
 * a valid E164 phone # will contain exactly 15 digits, and it
 * must start with a country code. However, determining what portion of the
 * number is country code, area code, and subscriber number, is much more
 * complex. For more details, please see Twilio's description here:
 * https://www.twilio.com/docs/glossary/what-e164
 */

// for our formatter, we have a slightly more specific structure - we
// allow spaces in our phone numbers, but only between the country code,
// area code, and local phone number. However, since we can't determine
// what the country code is without doing some further processing, and
// since area codes are highly variable by country (some countries have 2-, 3-,
// or even 5-digit area codes, and some have a variable number of digits),
// we leave the space-checking until later.
const baseE164Regex = /^(\+)?([0-9]\d{1,14})$/;

// this is the country code mapping object, where we can check if
// a given country calling code exists.
const countries = require('./lib/countries/countriesByCode.json');

// this lets us check if have a valid country code provided
const countriesByCCA2 = require('./lib/countries/countriesByCCA2.json');

const extractPhoneNumber = (str, cca2 = null) => {
  const phoneWithoutSpaces = str.replace(/\s/g, '');

  const doesMatch = baseE164Regex.exec(phoneWithoutSpaces);

  if (!doesMatch) {
    throw new Error('string is not a valid phone number.');
  }

  const phoneNumber = doesMatch[2];
  let countryCode = findMatchingCountryCode(phoneNumber);

  if (!countryCode && !cca2) {
    throw new Error('string does not have a valid country code.');
  }

  // if we were provided a country code, let's grab the country prefix
  // for that country and see if it exists
  if (!countryCode) {
    countryCode = countriesByCCA2[cca2]

    if (!countryCode) {
      throw new Error('string does not have a valid country code.');
    }
  }

  // this is a runtime matcher, since we now can check if we have
  // too many spaces because we know what the country code is.
  const complexSpaceMatch = new RegExp(`^(\\+)?${countryCode}\\s*\\d+\\s*\\d+$`);

  // we use this to get the area code and local portions of the number. Since we
  // don't actually have a list of how long an area code in a country
  // can be, we just make an assumption here.
  const extractMatcher = new RegExp(`^\\+?${countryCode}(?<area>\\d{3})(?<local>.*)$`)

  const validLongPhone = complexSpaceMatch.exec(str);

  if (!validLongPhone) {
    throw new Error('string format is invalid.');
  }

  const extract = extractMatcher.exec(phoneWithoutSpaces)

  return {
    countryCode,
    phone: "+".concat(doesMatch[2]),
    area: extract.groups.area,
    local: extract.groups.local,
  }
}

/**
 * str must be a 15-digit number without spaces
 */
const findMatchingCountryCode = (str) => {
  // the longest calling code at the moment known is of length 7 - it is
  // possible that this will change in the future
  for (let i = 7; i > 0; i--) {
    const codeToTest = "+".concat(str.slice(0, i));

    if (countries[codeToTest]) {
      return countries[codeToTest].prefix.slice(1);
    }
  }

  return null;
}

module.exports = {
  extractPhoneNumber,
  findMatchingCountryCode,
};
