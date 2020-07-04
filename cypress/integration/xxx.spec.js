
const port = 4567;
const url = `http://127.0.0.1:${port}/`;

describe("", () => {
    beforeEach(() => {
        cy.visit(url);
    });

    // const operation = op => cy.get(".operator-pad").contains(op).click();
    // const toogleSign = () => cy.get("#signToggle").click();
    // const digit = d0 => cy.get(".pad").contains("" + d0).click();
    const clickCountIs = textToBeEqualWith =>
        cy.get(".clickCount").should(elem => expect(elem.text())
            .to.equal("" + textToBeEqualWith));
    // const dot = () => cy.get("#dot").click();
    // //prev was: screenIs(xxx);
    // const backSpace = () => cy.get("#backSpace").click();
    // cy.get('.calculator').then(calc => {
    //     const calculatorWidth = calc.width()
    //     cy.get(".screen").invoke('outerWidth').should('be.lt', calculatorWidth + 1);
    // })
    it("", () => {
        cy.get("img").click();
        //clickCountIs(1)
        cy.get(".clickCount").should("contain", 1);
    })


});