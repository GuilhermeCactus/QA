import {elements as el} from "./elements";

class Jogadores {

    validandoURL(){
        cy.url().should('contain',el.validandoURL)

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

    selecionaPrimeiroFiltro(){
        // Primeiro filtro
        cy.xpath(el.primeiroFiltro)
            .click()

        cy.xpath('//div/div/div[1]/ul/li[1]/span')
            .first()
            .click()

        cy.wait(1000)
    }

    selecionaSegundoFiltro(){
        // Segundo filtro
        cy.xpath(el.segundoFiltro)
            .click()

        cy.xpath('//div/div/div[1]/ul/li[1]/span')
            .eq(1)
            .click()

        cy.wait(1000)
    }

    selecionaTerceiroFiltro(){
        // Terceiro filtro
        cy.xpath(el.terceiroFiltro)
        .click()

        cy.xpath('//div/div/div[1]/ul/li[1]/span')
            .eq(2)
            .click()

        cy.wait(1000)
    }

    aplicarFiltros(){
        // Clicando no botao de aplicar filtros
        cy.xpath(el.btnFiltro)
            .click()

        cy.wait(2000)
    }   
}
export default new Jogadores();