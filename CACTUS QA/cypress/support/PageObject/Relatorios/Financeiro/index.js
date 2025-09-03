import {elements as el} from "./elements";

class Financeiro {

    navRelatorioDeposito(){
        cy.wait(500)

        cy.xpath(el.sideDeposito)
            .click()
    }

    navRelatorioSaque(){
        cy.wait(500)

        cy.xpath(el.sideBarSaque)
            .click()
    }

    validarURLDeposito(){
        cy.wait(500)

        cy.url().should('contain', 'reports/financial/Deposits');
    }

    validarURLSaque(){
        cy.wait(500)

        cy.url().should('contain', 'reports/financial/Withdraws');
    }

    selecionar1Ano(){
        cy.wait(500)

        cy.get('.el-date-editor')
            .should('be.visible')
            .click()

        cy.wait(500)

        cy.contains('1 ano').click()
    }

    selecionaStatus(opc){
        cy.wait(500)

        cy.get(el.selectStatus)
            .eq(0)
            .click()

        cy.wait(750)

        // Selecionando o status
        cy.contains(el.dropdownStatus, opc)
            .should('be.visible')
            .click();
    }

    selecionaFiltro(){
        cy.xpath(el.selectFiltro)
            .should('be.visible')
            .click()

        cy.wait(750);

        // Iterando sobre os itens do dropdown
        cy.xpath(el.dropdownFiltro)
        .should('exist') // Garante os itens
        .each(($item) => {
            cy.wrap($item)
                .invoke('text')
                .then((text) => {

                    cy.wait(500)

                    cy.wrap($item)
                        .click()

                    if(text === "Todos"){
                        // Btn buscar
                        cy.xpath(el.btnBuscarTodos)
                            .click()
                    } else {
                        cy.xpath(el.selectOperador)
                            .click()

                        cy.wait(750)

                        cy.xpath(el.operadorIgualdade)
                            .should('be.visible')
                            .click()
                        
                        cy.wait(750)

                        var pesquisa

                        if (text == 'Id do Jogador'){
                            pesquisa = '4'
                        } else if (text == 'E-mail'){ 
                            pesquisa = 'player@email.com'
                        } else if (text == 'Valor'){ 
                            pesquisa = '1'
                        } else {
                            pesquisa = '1'
                        }

                        // Input 
                        cy.get(el.inputFiltro)
                            .clear()
                            .type(`${pesquisa}`)

                        cy.wait(750)

                        // Btn filtrar
                        cy.get(el.btnBuscar)
                            .click()
                    }

                    cy.wait(750);
            })
        })
    }

    validarTabela(){
        // Verificando se o elemento existe antes de continuar
        cy.get('body').then(() => {
            // Verificando se a tabela possui registros antes de validar o link
            cy.xpath(el.retornoTabelaLinha)
                .find('td')
                .its('length')
                .then((len) => {
                    if (len > 1) {
                        if (text == 'Id do Jogador'){
                            cy.get('[href="/profile/Player?id=4"]')
                                .eq(0)
                                .invoke('attr', 'href')
                                .then((valor) => {
                                    expect(valor).to.contain('id=4');
                                });
                        } else if (text == 'E-mail'){ 
                            cy.get('[href="mailto:player@email.com"]')
                                .invoke('attr', 'href')
                                .then((valor) => {
                                    expect(valor).to.contain('player@email.com');
                                });
                        } else if (text == 'Valor'){ 
                            cy.get(':nth-child(6) > .px-2')
                                .invoke('text')
                                .then((valor) => {
                                    expect(valor).to.contain('1');
                                });
                        } else {
                            cy.get(':nth-child(5) > .px-2')
                                .invoke('text')
                                .then((valor) => {
                                    expect(valor).to.contain('1');
                                });
                        }

                    } else {
                    cy.log('Tabela está vazia — nenhum dado para validar.');
                    }
                });

            // Segundo select
            cy.xpath(el.selectFiltro)
                .should('be.visible')
                .click()

            cy.wait(750);

        });
    }
    
}

export default new Financeiro();