import { elements as el } from "./elements";

class Links {

    navegarLinks() {
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.xpath(el.sideBarConfiguracao)
            .scrollTo('bottom', { ensureScrollable: false, duration: 300 })
            .click();

        cy.wait(500);

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBarLinks)
            .scrollIntoView()
            .should('be.visible')
            .click()
    }

    validandoHeaderLinks() {
        cy.get('.page-heading').should('contain.text', 'Links');
    }

    validandoAdicionarLink() {
        cy.get('.cac-container-action > .btn')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('h2 > .fw-bold')
            .should('be.visible')
            .and('contain.text', 'Cadastro de links');

        cy.wait(500);
    }

    validandoInserirLink() {
        cy.get('.el-select__wrapper')
            .should('be.visible')
            .click();

        cy.wait(500);

        // Pega todos os itens e escolhe um aleatoriamente
        cy.xpath('//li[@class="el-select-dropdown__item"]')
            .should('be.visible')
            .then(($itens) => {
                //const total = $itens.length;
                //const indiceAleatorio = Math.floor(Math.random() * total);
                const indice = 0; // Escolhe o segundo item (índice 1)
                cy.wrap($itens[indice])
                .invoke('text')
                .then((texto) => {
                    cy.log(`Item selecionado: ${texto.trim()}`);
                });
                cy.wrap($itens[indice]).click();
            });

            cy.get('[name="link_value"]')
            .should('be.visible')
            .type('https://www.exemplo.com');

            cy.get('.modal-footer > .btn-primary')
            .should('be.visible')
            .click();

        cy.wait(500);
    }

}

export default new Links()