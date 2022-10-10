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

		// Search by using input
		cy.get("[data-cy=search-input]").click()
		cy.get("[data-cy=search-input]").type("pokemon silver", { delay: 100 })

		cy.contains("SoulSilver", { timeout: 10000 }).should("be.visible", { timeout: 10000 })

		cy.get("[data-cy=search-input]").type(
			"{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace} "
		)

		cy.get("[data-cy=category-item-Action]").click()
		cy.contains("The Legend of Zelda", { timeout: 10000 }).should("be.visible", { timeout: 10000 })

		cy.get("[data-cy=category-item-PC]").click()
		cy.contains("Red Dead", { timeout: 10000 }).should("be.visible", { timeout: 10000 })
	})
})
