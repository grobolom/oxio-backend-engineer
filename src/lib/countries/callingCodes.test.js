const callingCodes = require('./callingCodes');

it('has several known calling codes correctly mapped', () => {
  const codes = callingCodes()

  // countries like the US have a bunch of area codes
  expect(codes['+1201']).toEqual({ prefix: '+1', countryCode: 'US' })

  // Jersey (JE) is one of several countries that match +44
  expect(codes['+44']).toEqual({ prefix: '+44', countryCode: 'JE' })

  // another example of a country with multiple codes
  expect(codes['+76']).toEqual({ prefix: '+7', countryCode: 'KZ' })
})
