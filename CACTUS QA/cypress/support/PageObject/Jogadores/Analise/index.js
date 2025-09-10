import {elements as el} from "./elements";

class Analise {

    validandoURL(){
        cy.url().should('contain', '/polling/Player');
        cy.wait(750)
    }

    inserindoID(){
        // Input
        cy.xpath(el.inputValor)
            .should('be.visible')
            .type('4');

        cy.wait(750);

        cy.xpath(el.btnBuscar)
            .click()

        cy.wait(750)
    }

    validandoRetornoID(){
        //Validando retorno na tabela
        cy.get(el.retornoID)
        .invoke('val')
        .then((valor) => {
            expect(valor).to.contains(4);
        });
    }
}

export default new Analise