describe("API Testing in cypress", function () {
  it.only("Hit Get Request validate its response status code and body", () => {
    cy.request({
      method: "GET",
      url: "https://randomuser.me/api/",
      qs: "results=1",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("info");
    });
  });

  it("Checking another api login", function () {
    cy.intercept("POST", "/api/login").as("login");
    cy.get('input[name="username"]').type("john");
    cy.get('input[name="password"]').type("pass123");

    cy.get('button[type="submit"]').click();

    cy.wait("@login").then((interception) => {
      const responseBody = interception.response.body;
      const employeeDetails = responseBody.employee;
      const dob = employeeDetails.dob;

      // You can now assert or use these details
      expect(dob).to.equal("1990-01-01");
      cy.log(`DOB is ${dob}`);
    });
  });
});
