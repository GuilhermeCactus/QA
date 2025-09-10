import {elements as el} from "./elements";

class Jogadores {

    validandoURL(){
        cy.url().should('contain','reports/Players')

        cy.wait(750)
    }

    seleciona1Ano(){
        // Clicando no filtro de data para 1 ano
        cy.get(el.filtroData)
            .should('be.visible')
            .click()

        // Clicandk no painel na lateral para 1 ano
        cy.get(el.element1Ano)
            .click()

        cy.wait(750)
    }
}

export default new Jogadores();