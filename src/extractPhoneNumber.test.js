const {
  extractPhoneNumber,
  findMatchingCountryCode
} = require('./extractPhoneNumber')

it('finds 7-long country codes', () => {
  const phone = '390669800000000'
  expect(findMatchingCountryCode(phone)).toEqual('3')
})

it('finds 4-long country codes', () => {
  const phone = '477900000000000'

  expect(findMatchingCountryCode(phone)).toEqual('4779')
})

it('finds 2-long country codes', () => {
  const phone = '440000000000000'

  expect(findMatchingCountryCode(phone)).toEqual('44')
})

it('can extract a full US phone numbers', () => {
  expect(extractPhoneNumber('+12018736551').phone).toBe('12018736551')
})

it('can extract some expect numbers', () => {
  expect(extractPhoneNumber('+12125690123').phone).toBe('12125690123')
  expect(extractPhoneNumber('+52 631 3118150').phone).toBe('526313118150')
  expect(extractPhoneNumber('34 915 872200').phone).toBe('34915872200')
})

it('can extract a number with a space after the area code', () => {
  expect(extractPhoneNumber('+1201 8736551').phone).toBe('12018736551')
})

it('can extract a number with a space after the country code', () => {
  expect(extractPhoneNumber('+1 2018736551').phone).toBe('12018736551')
})

it('can extract a number with space after both the area code and country code', () => {
  expect(extractPhoneNumber('+1  201   8736551').phone).toBe('12018736551')
})

it('throws an error if there is no valid country code', () => {
  expect(() => extractPhoneNumber('8736551')).toThrow('string does not have a valid country code.')
})

it('throws an error if there are too many spaces', () => {
  expect(() => extractPhoneNumber('+1 201 873 6551')).toThrow('string format is invalid')
})

it('throws an error if there are spaces in the wrong place', () => {
  expect(() => extractPhoneNumber('+12018736551    ')).toThrow('string format is invalid')
})

fit('throw an error if there is a space after the +', () => {
  expect(() => extractPhoneNumber('+ 12018736551')).toThrow('string format is invalid')
})
