import { getById } from "cypress/utils";
import { TestIds } from "~/constants/test";

describe("Full app test", () => {
  it("should work", () => {
    // eslint-disable-next-line
    cy.visit(Cypress.env("TEST_URL"));

    // Assert info modal
    cy.contains("The Funros");

    cy.contains(
      "Munro bagging is great, but sometimes big mountains are really boring."
    );

    cy.contains(
      "This map shows the 210 best rated mountains in Scotland, as decided by users on walkhighlands.co.uk"
    );

    // Close info modal
    getById(TestIds.INFO_MODAL_EXPLORE_BUTTON).click();

    // Assert info modal gone
    cy.contains("Munro bagging").should("not.exist");

    // Refresh page
    cy.reload();

    // Assert no info modal
    cy.contains("Munro bagging").should("not.exist");

    // Assert cookie popup
    cy.contains(
      "We use cookies to understand how many people visit the site. No weird stuff. Privacy Policy"
    ).should("exist");

    // Reject cookies
    getById(TestIds.REJECT_COOKIE_POPUP).click();

    // Assert no cookie popup
    cy.contains(
      "We use cookies to understand how many people visit the site. No weird stuff. Privacy Policy"
    ).should("not.exist");

    // Refresh page
    cy.reload();

    // Assert no cookie popup
    cy.contains(
      "We use cookies to understand how many people visit the site. No weird stuff. Privacy Policy"
    ).should("not.exist");

    // Assert page title
    cy.contains("Funro Map").should("be.visible");

    // Assert page subtitle
    cy.contains("Because size isn't everything...").should("be.visible");

    // Assert hamburger menu works
    getById(TestIds.HAMBURGER_MENU).click();

    // Assert privacy link works
    cy.get("a")
      .contains("Privacy Policy")
      .should("be.visible")
      .invoke("removeAttr", "target")
      .click();
    cy.get("h1").contains("Privacy Policy").should("be.visible");
    cy.go("back");

    // Assert terms link works
    getById(TestIds.HAMBURGER_MENU).click();
    cy.get("a")
      .contains("Terms & Conditions")
      .should("be.visible")
      .invoke("removeAttr", "target")
      .click();
    cy.get("h1").contains("Terms & Conditions").should("be.visible");
    cy.go("back");

    // Assert map exists
    cy.get("canvas").should("have.class", "mapboxgl-canvas");
  });
});
