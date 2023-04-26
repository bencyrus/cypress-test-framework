declare namespace Cypress {
    interface Chainable {
        /**
         * Load the website
         * */
        loadWebsite(): Chainable<Element>

        /**
         * Navigate to the home page
         */
        visitHomePage(): Chainable<Element>
        
        /**
         * Navigate to the login page
         */
        visitLoginPage(): Chainable<Element>

        /**
         * Navigate to the products page
         */
        visitProductsPage(): Chainable<Element>

        /**
         * Navigate to the cart page
         */
        visitCartPage(): Chainable<Element>

        /**
         * Navigate to the checkout page
         */
        visitCheckoutPage(): Chainable<Element>

        /**
         * Navigate to the payment page
         */
        visitPaymentPage(): Chainable<Element>
    }
}

Cypress.Commands.add('loadWebsite', () => {
    cy.visit(Cypress.config('baseUrl'))
})

Cypress.Commands.add('visitHomePage', () => {
    cy.get('a').contains('Home').click()
})

Cypress.Commands.add('visitLoginPage', () => {
    cy.get('a').contains('Login').click()
})

Cypress.Commands.add('visitProductsPage', () => {
    cy.get('a').contains('Products').click()
})

Cypress.Commands.add('visitCartPage', () => {
    cy.get('.shop-menu').within(() => {
        cy.get('a').contains('Cart').click()
    })
})

Cypress.Commands.add('visitCheckoutPage', () => {
    cy.get('a').contains('Proceed To Checkout').click()
})

Cypress.Commands.add('visitPaymentPage', () => {
    cy.get('a').contains('Place Order').click()
})
