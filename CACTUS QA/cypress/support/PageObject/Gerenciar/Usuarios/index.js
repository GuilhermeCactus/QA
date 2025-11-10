import { elements as el } from "./elements";

class Usuarios {

    navegacaoJogadores() {
        cy.Navegacao_Usuarios();

        cy.wait(400);

        cy.xpath(el.navJogadores)
            .should('be.visible')
            .click()

        cy.wait(500);
    }

    navegacaoAdministradores() {
        cy.Navegacao_Usuarios();

        cy.wait(400);

        cy.xpath(el.navAdministrador)
            .should('be.visible')
            .click()

        cy.wait(500);
    }

    inserindoInput(texto) {
        cy.get(el.inputFiltro)
            .should('be.visible')
            .clear()
            .type(texto);
    }

    clickFiltroBuscar(){
        cy.get(el.btnBuscar)
        .should('be.visible')
        .click();
    }

    validarTabela(opcao, texto) {
        // Verifica se a tabela está vazia ou não
        cy.wait(500)

        cy.get('table').then(($tbody) => {

            cy.wait(500)

            if ($tbody.find('.dataTables_empty').length > 0) {
                // Caso tabela vazia
                cy.get('.dataTables_empty')
                    .should('be.visible')
                    .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
            } else {

                if(opcao=='ID'){
                    cy.xpath(el.divID)
                    .should('be.visible')
                    .invoke('text')
                    .then((validador) => {
                        expect(validador).to.equal(texto);
                    });

                    cy.wait(500)
                
                }
                if (opcao === 'Status') {
                    // Caso tabela com dados
                    cy.xpath(el.divStatus)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.equal(texto);
                        });
                }

                if (opcao === 'Nome') {
                    // Caso tabela com dados
                    cy.xpath(el.divNome)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.contain(texto);
                        });
                }

                if (opcao === 'Email') {
                    // Caso tabela com dados
                    cy.xpath(el.divEmail)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.contain(texto);
                        });
                }

                if (opcao === 'Pais') {
                    // Caso tabela com dados
                    cy.xpath(el.divPais)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.contain(texto);
                        });
                }
            }
        });

    }

    validarTabelaAdmin(opcao, texto) {
        // Verifica se a tabela está vazia ou não
        cy.wait(500)

        cy.get('table').then(($tbody) => {

            cy.wait(500)

            if ($tbody.find('.dataTables_empty').length > 0) {
                // Caso tabela vazia
                cy.get('.dataTables_empty')
                    .should('be.visible')
                    .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
            } else {

                if(opcao=='ID'){
                    cy.xpath(el.divID)
                    .should('be.visible')
                    .invoke('text')
                    .then((validador) => {
                        expect(validador).to.equal(texto);
                    });

                    cy.wait(500)
                
                }
                if (opcao === 'Status') {
                    // Caso tabela com dados
                    cy.xpath(el.divStatus)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.equal(texto);
                        });
                }

                if (opcao === 'Nome') {
                    // Caso tabela com dados
                    cy.xpath(el.divNome)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.contain(texto);
                        });
                }

                if (opcao === 'Email') {
                    // Caso tabela com dados
                    cy.xpath(el.divEmail)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.contain(texto);
                        });
                }

                if (opcao === 'Pais') {
                    // Caso tabela com dados
                    cy.xpath(el.divPais)
                        .should('be.visible')
                        .invoke('text')
                        .then((validador) => {
                            expect(validador).to.contain(texto);
                        });
                }
            }
        });

    }
}
export default new Usuarios(); 