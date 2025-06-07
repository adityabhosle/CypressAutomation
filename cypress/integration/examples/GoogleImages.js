describe("Google Sidebar Image Test", () => {
  it('should search "Cypress" and check images in sidebar', () => {
    cy.visit("https://www.google.com");

    // Handle cookie popup if shown
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("I agree")').length) {
        cy.contains("I agree").click();
      }
    });

    // Type in search box
    cy.get('input[name="q"]').type("Cypress{enter}");

    // Wait for results to load
    cy.wait(2000); // you can fine-tune this if needed

    // Find image inside the knowledge panel/sidebar
    cy.get("#rhs img") // #rhs = right-hand sidebar
      .should("have.length.greaterThan", 0) // at least one image exists
      .each(($img) => {
        cy.wrap($img).should("be.visible");
      });
  });
});
