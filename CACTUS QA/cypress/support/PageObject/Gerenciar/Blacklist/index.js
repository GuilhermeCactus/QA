import { elements as el } from "./elements";

class Blacklist {

    navegarBlacklist() {

        // Clica no link pai do span "Performance"
        cy.contains('Blacklist')
            .should('be.visible')
            .click()
    }

    validandoFuncaoAdicionar() {
        cy.contains('Adicionar')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get(el.headerAdicionar)
            .should('be.visible')
            .and('contain.text', 'Adicionar CPF na Blacklist');

        cy.wait(500);
    }

    validandoInserirCPF() {
        cy.get(el.inputCPF)
            .should('be.visible')
            .type('12345678909');

        cy.wait(500);

        cy.get(el.btnAdicionar)
            .should('be.visible')
            .click();

        cy.wait(1000);
    }

    validandoCPFtabela() {
        cy.get(el.inputFiltroCPF)
            .should('be.visible')
            .type('12345678909');

        cy.wait(500);

        cy.contains('Filtrar')
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.get(el.retornoCPF)
            .should('be.visible')
            .and('contain.text', '123.456.789-09');
    }

    validandoAcoes(){
        cy.get(el.btnExcluir)
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text', 'Tem certeza que deseja excluir?')

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text', 'Alterado com sucesso..');
    }
    
}
export default new Blacklist(); 