const CCA2Codes = require('./CCA2Codes');

it('has several known calling codes correctly mapped', () => {
  const codes = CCA2Codes()

  expect(codes['US']).toEqual('+1')
  expect(codes['GB']).toEqual('+44')
  expect(codes['AQ']).toEqual(undefined)
})
