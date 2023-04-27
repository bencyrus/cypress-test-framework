describe('Shopping Cart Test', () => {

    before(() => {
        // Clear cookies and local storage, and visit the website
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.log('Cookies and local storage cleared')
    })

    it('Should load the website', () => {
        cy.loadWebsite()
        cy.log('Website loaded')
    })

    it('Should navigate to the login page', () => {
        cy.visitLoginPage()

        // Verify that we are on the login page
        cy.url().should('include', '/login')
        cy.log('Navigated to the login page')
    })

    it('Should attempt to login with invalid credentials', () => {
        cy.login('invalidemail@test.test', 'invalid_password')

        // Error message should be visible
        cy.get('p').contains('Your email or password is incorrect!').should('be.visible')
        cy.log('Attempted to login with invalid credentials')
    })

    it('Should attempt to login with valid credentials', () => {
        cy.fixture('login_data').then(({ email, password }) => {
            cy.login(email, password)
        })

        // Verify that we are logged in
        cy.get('a').contains('Logout').should('be.visible')
        // Verify that we are redirected to the home page
        cy.get('h2').contains('Features Items').should('be.visible')
        cy.log('Logged in with valid credentials')
    })

    it('Should navigate to the products page', () => {
        cy.visitProductsPage()

        // Verify that we are on the products page
        cy.url().should('include', '/products')
        cy.get('h2').contains('All Products').should('be.visible')
        cy.log('Navigated to the products page')
    })

    it('Should search for tshirts', () => {
        cy.searchProduct('tshirt')

        // Verify that search results are displayed
        cy.get('h2').contains('Searched Products').should('be.visible')
        cy.log('Searched for tshirt')
    })

    it('Should add two products to the cart', () => {
        cy.addProductToCart(0)
        cy.addProductToCart(1)
        cy.log('Added two products to the cart')
    })

    it('Should navigate to the cart page', () => {
        cy.visitCartPage()

        // Verify that we are on the cart page
        cy.url().should('include', '/view_cart')
        cy.get('section#cart_items').contains('Shopping Cart').should('be.visible')
        cy.log('Navigated to the cart page')
    })

    it('Should ensure that the cart has two products', () => {
        // Verify that the cart has two products
        cy.get('tbody').children().should('have.length', 2)
        cy.log('Verified the cart has two products')
    })

    it('Should remove the first product from the cart', () => {
        cy.removeProductFromCart(0)
        cy.log('Removed the first product from the cart')
    })

    it('Should proceed to checkout', () => {
        cy.visitCheckoutPage()

        // Verify that we are on the checkout page
        cy.url().should('include', '/checkout')
        cy.get('section#cart_items').contains('Checkout').should('be.visible')
        cy.log('Proceeded to checkout')
    })

    it('Should navigate to the payment page', () => {
        cy.visitPaymentPage()

        // Verify that we are on the payment page
        cy.url().should('include', '/payment')
        cy.get('section#cart_items').contains('Payment').should('be.visible')
        cy.log('Navigated to the payment page')
    })

    it('Should complete the payment process', () => {
        cy.fixture('payment_data').then(({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear }) => {
            cy.makePayment(nameOnCard, cardNumber, cvc, expiryMonth, expiryYear)
        })
        cy.log('Submitted payment details')

        // Verify that the payment was successful
        cy.get('h2').contains('Order Placed!').should('be.visible')
        cy.log('Completed the payment process')
    })

    it('Should download the invoice', () => {
        cy.downloadInvoice()
        cy.log('Downloaded the invoice')
    })
})
