import { elements as el } from "./elements";

class ProvedorPagamento {

    // Teste perdido -> Vamos fazer no melhor momento.
    navegaProvedorPagamento() {

        cy.wait(500)

        cy.contains('Configurações')
            .should('be.visible')
            .click();

        cy.wait(500)

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBar)
            .scrollIntoView()
            .should('exist')
            .click({ force: true });


        // Verifica a URL
        cy.url().should('include', el.urlValidacao);
    }

    clickaSecaoSaque() {
        cy.xpath('//*[@id="kt_app_content_container"]/div/div[2]/div/div/div[1]/ul/li[2]/div')
            .should('be.visible')
            .click();

            cy.wait(500);
    }

    validaCheckStatus() {
        cy.xpath(el.checkStatus)
        .should('be.visible')
        .click()

        cy.wait(2500);

        cy.xpath(el.checkStatus)
        .should('not.be.checked')

        cy.wait(500);

        cy.xpath(el.checkStatus)
        .should('be.visible')
        .click()

        cy.wait(500);
    }

    clickaSecaoDeposito() {
        cy.xpath('//*[@id="kt_app_content_container"]/div/div[2]/div/div/div[1]/ul/li[1y]/div')
            .should('be.visible')
            .click();

        cy.wait(500);
    }

}

export default new ProvedorPagamento()