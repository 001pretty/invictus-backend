import '@testing-library/cypress/add-commands'

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    cy.visit('localhost:3000')  
    cy.findByRole('img', { name: /pikachu shirt \- white2/i }).click()
    cy.findByText(/invictus x pokemon collaboration./i).should('exist')
    cy.findByText(/add to cart/i).click()  

    cy.findByRole('textbox').type('joe@doe.com') 
    cy.findByPlaceholderText(/password/i).type('123456789')
    cy.findByRole('button', { name: /login/i }).click()

    cy.wait(6000).then(() =>
      cy.findByRole('button', { name: /add to cart/i }).click()
    ) 
    cy.wait(2000).then(() =>
      cy.get('[alt=cart-icon]').click() 
    ) 
    cy.findByText(/product/i).should('exist') 
    cy.findByText(/pikachu shirt - white/i).should('exist')
    cy.findByRole('img', { name: /headerlogo/i }).click()
    cy.findByRole('img', { name: /breeze shorts \- light green2/i }).click() 
    cy.findByRole('button', { name: /add to cart/i }).click() 
    cy.wait(2000).then(() =>
      cy.get('[alt=cart-icon]').click() 
    ) 
    cy.findByText(/breeze shorts - light green/i).should('exist') 
    cy.findByText(/proceed to checkout/i).click() 

    cy.findByPlaceholderText(/first name/i).type('Joe')
    cy.findByPlaceholderText(/last name/i).type('Doe')
    cy.findByPlaceholderText(/address/i).type('JD 123')
    cy.findByPlaceholderText(/postal code/i).type('12345')
    cy.findByPlaceholderText(/city/i).type('Doe City') 
    cy.findByRole('button', { name: /order now/i }).click()
    cy.findByText(/no orders have been made yet./i).should('not.exist')
    cy.get('[alt=cart-icon]').click() 
    cy.findByText(/cart is empty./i)
    cy.get('[alt=sd-opener]').click() 
    cy.findByRole('link', { name: /profile/i }).click()
    cy.findByText(/logout/i).click()

    cy.wait(2000).then(() =>
      cy.get('[alt=cart-icon-unauth]').click() 
    ) 
    cy.findByText(/please enter your e-mail and password:/i).should('exist')

    cy.findByRole('textbox').type('SUCCESS ✅') 
  })
})
