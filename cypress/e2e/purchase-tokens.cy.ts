describe("Login to the store and use the functionality", () => {
	it("can login and get to store page using the testing account", () => {
		// Login to the main site
		cy.visit("http://localhost:8080")
		cy.get("[data-cy=login-input]").click()
		cy.get("[data-cy=login-input]").type("test@test.com", { delay: 100 })

		cy.get("[data-cy=password-input]").click()
		cy.get("[data-cy=password-input]").type("11111111", { delay: 100 })

		cy.get("[data-cy=signin-button]").click()

		cy.location("pathname", { timeout: 60000 }).should("include", "store")

		// Open and close favourites
		cy.get("[data-cy=nav-favourites]").click()
		cy.get("[data-cy=modal]").should("be.visible")
		cy.wait(1000)
		cy.get("[data-cy=nav-favourites]").click()

		// Open and close cart
		cy.get("[data-cy=nav-cart]").click()
		cy.get("[data-cy=modal]").should("be.visible")
		cy.wait(1000)
		cy.get("[data-cy=nav-cart]").click()

		// Open and close token modal
		cy.get("[data-cy=nav-tokens]").click()
		cy.get("[data-cy=payment-modal]").should("be.visible")
		cy.wait(1000)
		cy.get("[data-cy=token-modal-close]").click()

		// Open token modal
		cy.get("[data-cy=nav-tokens]").click()
		cy.get("[data-cy=payment-modal]").should("be.visible")

		// Add tokens to the input and click pay
		cy.get("[data-cy=token-modal-input]").click()
		cy.get("[data-cy=token-modal-input]").type("1000", { delay: 100 })
		cy.get("[data-cy=token-modal-submit]").click()

		// Should show success toast
		cy.get(".Vue-Toastification__toast", { timeout: 10000 }).contains("Payment processing", { timeout: 10000 })

		cy.wait(1000)
		cy.get("[data-cy=token-modal-close]").click()
	})
})
