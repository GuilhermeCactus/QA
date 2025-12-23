Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('.data.map is not a function')) {
        return false; // Ignora o erro
    }
});

describe('Teste CPF INVALIDO ', () => {

    const opc_casas = ['betbuffalos.bet.br','betfalcons.bet.br','mcgames.bet.br','play.bet.br','b2x.bet.br','lider.bet.br','geralbet.bet.br','b1bet.bet.br'];

    opc_casas.forEach((opc) => {
        it(`Casa : ${opc}`,() => {

            cy.wait(500)

            cy.visit(opc)

            cy.wait(3000)

            cy.xpath("//button[text() = ' Sim']")
                .should('be.visible')
                .click()

            cy.wait(500)

            cy.contains('Registre-se')
                .should('be.visible')
                .click()

            cy.wait(1500)

            cy.get('[name="cpf"]')
                .should('be.visible')
                .type('442.524.368-42')

            cy.wait(4000)
        })
    })

});