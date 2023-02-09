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

const extractPhoneNumber = (str) => {
  const phoneWithoutSpaces = str.replace(/\s/g, '');

  const doesMatch = baseE164Regex.exec(phoneWithoutSpaces);

  if (!doesMatch) {

    console.info(phoneWithoutSpaces)
    throw new Error('string is not a valid phone number.');
  }

  const phoneNumber = doesMatch[2];
  const countryCode = findMatchingCountryCode(phoneNumber);

  if (!countryCode) {
    throw new Error('string does not have a valid country code.');
  }

  // this is a runtime matcher, since we now can check if we have
  // too many spaces because we know what the country code is.
  const complexSpaceMatch = new RegExp(`^(\\+)?${countryCode}\\s*\\d+\\s*\\d+$`);

  const validLongPhone = complexSpaceMatch.exec(str);

  if (!validLongPhone) {
    console.info(complexSpaceMatch);
    throw new Error('string has too many spaces');
  }

  return {
    countryCode,
    phone: doesMatch[2]
  }
}

const validatePhoneAndCountry = (country, phone) => {
  
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
  validatePhoneAndCountry,
  findMatchingCountryCode,
};
