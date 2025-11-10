import { elements as el } from "./elements";

class Aparencia {

    navegarAparencia() {
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get(el.sideBarConfiguracao)
            .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBarAparencia)
            .scrollIntoView()
            .should('be.visible')
            .click()
    }
}

export default new Aparencia()