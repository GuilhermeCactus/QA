import { elements as el } from "./elements";

class Cupon {

    navegarCupon() {
        cy.wait(1000);

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBarCupon)
            .should('be.visible')
            .click()
    }

    inserindoCodigo(texto) {
        cy.get(el.inputFiltro)
            .should('be.visible')
            .clear()
            .type(texto);
    }

    clickFiltrar(){
        cy.get(el.btnBuscar)
        .should('be.visible')
        .click();
    }

    selectTipo(opc) {
        cy.xpath(el.selcPais)
            .should('be.visible')
            .click();

        cy.xpath(`//li/span[text() = "${opc}"]`)
            .eq(0)
            .should('be.visible')
            .click();
    }

    selectCampanha(){
        cy.xpath(el.selcCampanha)
            .should('be.visible')
            .click();

        cy.wait(500)

        cy.xpath(`//li/span[text() = "Cupons"]`)
            .eq(0)
            .should('be.visible')
            .click();
    }

    selectCarteira(opc){
        cy.xpath(el.selcCarteira)
            .should('be.visible')
            .click();

        cy.wait(500)

        cy.xpath(`//li/span[text() = "${opc}"]`)
            .eq(2)
            .should('be.visible')
            .click();
    }  

    validarRetornoCodigo(texto) {
        // Verifica se a tabela está vazia ou não
        cy.wait(1500)

        cy.get('table').then(($tbody) => {

            cy.wait(500)

            if ($tbody.find('.dataTables_empty').length > 0) {
                // Caso tabela vazia
                cy.get('.dataTables_empty')
                    .should('be.visible')
                    .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
            } else {

                    cy.xpath(el.divCodigo)
                    .should('be.visible')
                    .invoke('text')
                    .then((validador) => {
                        expect(validador.toLowerCase()).to.contains(texto.toLowerCase());
                    });

                    cy.wait(500)

            }
        });

    }

    validarRetornoTipo(opc) {
        // Verifica se a tabela está vazia ou não
        cy.wait(1500)

        cy.get('table').then(($tbody) => {

            cy.wait(1500)

            if ($tbody.find('.dataTables_empty').length > 0) {
                // Caso tabela vazia
                cy.get('.dataTables_empty')
                    .should('be.visible')
                    .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
            } else {

                // Implementar validação do Tipo na tabela

                    cy.wait(500)

                    cy.xpath(el.retornotipo)
                    .should('be.visible')
                    .invoke('text')
                    .then((validador) => {
                        if (opc === 'Todos') {
                            expect(['Fixo', 'Variável']).to.include(validador);
                        } else {
                            expect(validador).to.equal(opc);
                        }
                    });

                    cy.wait(500)
            }
        });

    }

    validarRetornoCampanha(texto) {
        // Verifica se a tabela está vazia ou não
        cy.wait(1500)

        cy.get('table').then(($tbody) => {

            cy.wait(500)

            if ($tbody.find('.dataTables_empty').length > 0) {
                // Caso tabela vazia
                cy.get('.dataTables_empty')
                    .should('be.visible')
                    .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
            } else {

                    cy.xpath(el.retornoCampanha)
                    .should('be.visible')
                    .invoke('text')
                    .then((validador) => {
                        expect(validador.toLowerCase()).to.contains(texto.toLowerCase());
                    });

                    cy.wait(500)

            }
        });

    }

    validarRetornoCarteira(texto) {
        // Verifica se a tabela está vazia ou não
        cy.wait(1500)

        cy.get('table').then(($tbody) => {

            cy.wait(500)

            if ($tbody.find('.dataTables_empty').length > 0) {
                // Caso tabela vazia
                cy.get('.dataTables_empty')
                    .should('be.visible')
                    .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
            } else {

                    cy.xpath(el.retornoCarteira)
                    .should('be.visible')
                    .invoke('text')
                    .then((validador) => {
                        if (opc === 'Todos') {
                            expect(['real', 'bônus']).to.include(validador);
                        } else {
                            expect(validador).to.equal(opc);
                        }
                    });

                    cy.wait(500)

            }
        });
    }

    selectFiltro(opc) {
        cy.xpath(el.selecfiltroPor)
            .should('be.visible')
            .click();

         cy.wait(500)

        cy.xpath(`//li/span[text() = "${opc}"]`)
            .eq(5)
            .should('be.visible')
            .click();
    }

    selectOperadorIgualdade(){
        cy.xpath(el.selecOperadorIgualdade)
            .should('be.visible')
            .click();

         cy.wait(500)

        cy.xpath(`//li/span[text() = "igual"]`)
            .eq(0)
            .should('be.visible')
            .click();
    }
}
export default new Cupon(); 