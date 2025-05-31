describe("API Testing with Cypress", function () {
  beforeEach(() => {
    cy.visit("/angularAppdemo/");
  });

  it("Verify response with stubbed response", function () {
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },

      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "RSU",
            aisle: "2301",
          },
        ],
      }
    ).as("bookretrievals");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@bookretrievals");
    cy.get("p").should("have.text", "Oops only 1 Book available");
  });

  it("Verify BE response and UI response", function () {
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },

      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "RSU",
            aisle: "2301",
          },
        ],
      }
    ).as("bookretrievals");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@bookretrievals").then(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
    });
    cy.get("p").should("have.text", "Oops only 1 Book available");

    //length of the response array = rows of the table
  });

  it("Verify correct user can access data - stubbing request with test data", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";

        req.continue((res) => {
          expect(res.statusCode).to.equal(403);
        });
      }
    ).as("dummyUrl");

    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@dummyUrl");
  });
});
