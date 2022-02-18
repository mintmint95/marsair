describe('[Mobile] Search (home) page', () => {
  it('[TC_Story#3_4] Be able to click the text “Book a ticket to the red planet now!” to redirect to the home page.', () => {
    cy.visit(Cypress.env('host'))
    cy.viewport(1170, 2532)
    cy.contains('Book a ticket to the red planet now!')
      .should('have.attr', 'href').should('contain', '/KhwankamolNakbanlang')
  })

  it('[TC_Story#3_5] Be able to click the MarsAir logo on the top left to redirect to the home page', () => {
    cy.visit(Cypress.env('host'))
    cy.viewport(1170, 2532)
    cy.get('h1 > a')
      .should('have.attr', 'href').should('contain', '/KhwankamolNakbanlang')
    cy.get('h1 > a').click()
    cy.url('https://marsair.thoughtworks-labs.net/KhwankamolNakbanlang')
  })
})