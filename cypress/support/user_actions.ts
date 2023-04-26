declare namespace Cypress {
    interface Chainable {
        /**
         * @param {string} email - takes email as string
         * @param {string} password - takes password as string
         * */
        login(email: string, password: string): Chainable<Element>

        /**
         * @param {string} productName - takes product name as string
         * */
        searchProduct(productName: string): Chainable<Element>

        /**
         * @param {number} productIndex - takes product index as number
         * */
        addProductToCart(productIndex: number): Chainable<Element>

        /**
         * @param {number} productIndex - takes product index as number
         * */
        removeProductFromCart(productIndex: number): Chainable<Element>

        /**
         * @param {string} nameOnCard - takes name on card as string
         * @param {string} cardNumber - takes card number as string
         * @param {string} cvc - takes cvc as string
         * @param {string} expiry_month - takes expiry month as string
         * @param {string} expiry_year - takes expiry year as string
         */
        makePayment(nameOnCard: string, cardNumber: string, cvc: string, expiry_month: string, expiry_year: string): Chainable<Element>

        /**
         * Downloads the invoice
         */
        downloadInvoice(): Chainable<Element>
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('form[action="/login"]').within(() => {
        cy.get('input[name="email"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(password)
        cy.get('button').contains('Login').click()
    })
})

Cypress.Commands.add('searchProduct', (productName: string) => {
    cy.get('input[name="search"]').clear()
    cy.get('input[name="search"]').type(productName)
    cy.get('#submit_search').click()
})

Cypress.Commands.add('addProductToCart', (productIndex: number) => {
    cy.get('.productinfo').eq(productIndex).within(() => {
        cy.get('a').contains('Add to cart').click()
    })
    cy.get('button').contains('Continue Shopping').click()
})

Cypress.Commands.add('removeProductFromCart', (productIndex: number) => {
    cy.get('tbody tr').eq(productIndex).within(() => {
        cy.get('.cart_quantity_delete').click()
    })
})

Cypress.Commands.add('makePayment', (nameOnCard: string, cardNumber: string, cvc: string, expiry_month: string, expiry_year: string) => {
    cy.get('form[action="/payment"]').within(() => {
        cy.get('input[name="name_on_card"]').clear()
        cy.get('input[name="card_number"]').clear()
        cy.get('input[name="cvc"]').clear()
        cy.get('input[name="expiry_month"]').clear()
        cy.get('input[name="expiry_year"]').clear()

        cy.get('input[name="name_on_card"]').type(nameOnCard)
        cy.get('input[name="card_number"]').type(cardNumber)
        cy.get('input[name="cvc"]').type(cvc)
        cy.get('input[name="expiry_month"]').type(expiry_month)
        cy.get('input[name="expiry_year"]').type(expiry_year)

        cy.get('button').contains('Pay and Confirm Order').click()
    })
})

Cypress.Commands.add('downloadInvoice', () => {
    cy.window().then((win) => {
        const downloadButton = cy.get('a').contains('Download Invoice')
        win.document.addEventListener('click', function clickListener() {
            win.document.removeEventListener('click', clickListener)
            setTimeout(() => win.location.reload(), 5000)
        })
        downloadButton.click({force: true})
    })
})