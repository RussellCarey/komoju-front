describe("Login to the store and use the functionality", () => {
	it("can login and search for game by input and by clicking on a category", () => {
		// Login to the main site
		cy.visit("http://localhost:8080")
		cy.get("[data-cy=login-input]").click()
		cy.get("[data-cy=login-input]").type("test@test.com", { delay: 100 })

		cy.get("[data-cy=password-input]").click()
		cy.get("[data-cy=password-input]").type("11111111", { delay: 100 })

		cy.get("[data-cy=signin-button]").click()

		cy.location("pathname", { timeout: 60000 }).should("include", "store")
		cy.wait(1000)

		// Add to cart and favourites
		cy.get("[data-cy=chat-bubble]").click()
		cy.wait(1000)
		cy.get("[data-cy=chat-input]").click()
		cy.get("[data-cy=chat-input]").type("Test chat message", { delay: 100 })
		cy.wait(1000)
		cy.get("[data-cy=chat-submit]").click()
		cy.contains("Test chat message", { timeout: 10000 }).should("be.visible", { timeout: 10000 })
	})
})
