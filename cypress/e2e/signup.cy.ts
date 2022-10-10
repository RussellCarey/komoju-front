describe("Sign up", () => {
	it("can click sign up button and fill in the account information", () => {
		cy.visit("http://localhost:8080")
		cy.get("[data-cy=signup-button]").click()

		cy.location("pathname", { timeout: 60000 }).should("include", "signup")

		cy.get("[data-cy=email-input]").type("test12@test.com", { delay: 100 })
		cy.get("[data-cy=username-input]").type("test12", { delay: 100 })
		cy.get("[data-cy=first-name-input]").type("testing", { delay: 100 })
		cy.get("[data-cy=last-name-input]").type("testing", { delay: 100 })
		cy.get("[data-cy=password-input]").type("11111111", { delay: 100 })
		cy.get("[data-cy=password-confirm-input]").type("11111111", { delay: 100 })

		cy.get("[data-cy=signup-button]").click()

		cy.location("pathname", { timeout: 60000 }).should("eq", "/")
	})
})
