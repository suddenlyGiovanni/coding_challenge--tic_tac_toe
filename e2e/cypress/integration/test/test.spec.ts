/* eslint-disable jest/expect-expect */
describe('google search', () => {
  it('should work', () => {
    cy.visit('http://www.google.com')
    cy.get('input[role="combobox"]').type('Hello world{enter}')
  })
})
