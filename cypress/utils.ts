import { TestIds } from "~/constants/test";

export const getById = (testId: TestIds) => {
  return cy.get(`[data-cy=${testId}]`);
};
