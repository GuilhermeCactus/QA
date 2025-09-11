import {elements as el} from "./elements";

class Financeiro {

    navRelatorioDeposito(){
        cy.wait(500)

        cy.xpath(el.sideBarDeposito)
            .click()
    }

    navRelatorioSaque(){
        cy.wait(500)

        cy.xpath(el.sideBarSaque)
            .click()

        cy.wait(500)
    }

    navRelatorioCreditacoes(){
        cy.wait(500)

        cy.xpath(el.sideBarCreditacao)
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

    validarURLCreditacoes(){
        cy.url().should('contain', 'reports/financial/Credits');
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

        cy.xpath(el.selectStatus)
            .eq(0)
            .click()

        cy.wait(750)

        // Selecionando o status
        cy.contains(el.dropdownStatus, opc)
            .should('be.visible')
            .click();

        cy.wait(750)


    }

    validandoStatus(opc){
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[4]/div')
            .should('be.visible')
            .invoke('text')
            .then((retornoStatus) => {
                if(opc != 'Todos'){
                    expect(retornoStatus).to.include(opc)
                }
            })
    }

    selecionaFiltro(opc){
        cy.xpath(el.selectFiltro)
            .eq(1)
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
                            pesquisa = '28000003'
                        } else if (text == 'E-mail'){ 
                            pesquisa = 'testeRegina@cartovale.com.br'
                        } else if (text == 'Valor'){ 
                            pesquisa = '25'
                        } else {
                            pesquisa = '2'
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

                    cy.wait(2000);

                    // Validando tabela
                    this.validarTabela(opc,text)
            })
        })
    }

    validarTabela(opc,validador){
        // Verificando se o elemento existe antes de continuar
        cy.get('body').then(() => {
            // Verificando se a tabela possui registros antes de validar o link
            cy.xpath(el.retornoTabelaLinha)
                .find('td')
                .its('length')
                .then((len) => {
                    if (len > 1) {

                        // -> Validando status antes de
                        this.validandoStatus(opc)

                        if (validador == 'Id do Jogador'){
                            cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[1]/div')
                                .invoke('text')
                                .then((valor) => {
                                    expect(valor).to.contain('28000003');
                                });
                        } else if (validador == 'E-mail'){ 
                            cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[2]/div/a[2]')
                                .invoke('text')
                                .then((valor) => {
                                    expect(valor).to.contain('testeRegina@cartovale.com.br');
                                });
                        } else if (validador == 'Valor'){ 
                            cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[6]/div')
                                .invoke('text')
                                .then((valor) => {
                                    expect(valor).to.contain('25');
                                });
                        } else {
                            cy.get(':nth-child(5) > .px-2')
                                .invoke('text')
                                .then((valor) => {
                                    expect(valor).to.contain('2');
                                });
                        }

                    } else {
                    cy.log('Tabela está vazia — nenhum dado para validar.');
                    }
                });

            // Segundo select
            cy.xpath(el.selectFiltro)
                .eq(1)
                .should('be.visible')
                .click()

            cy.wait(750);

        });
    }
    
    clickBtnFiltrarCreditacao(){
        cy.wait(500)

        cy.xpath(el.btnbuscarCreditacoes)
            .should('be.visible')
            .click()

        cy.wait(1000)
    }

    clickBtnLimpa(){
        cy.wait(500)

        cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[4]/button')
            .should('be.visible')
            .click()

        cy.wait(1000)
    }

    validarFuncaoLimpar(){
        cy.wait(500)

        cy.xpath(el.btnLimpar)
            .should('not.exist')

        cy.wait(500)
    }

    validarFuncaoDownload(){
        // Btn Download
        cy.xpath(el.btnDownload)
            .should('be.visible')
            .click()

        cy.wait(750)

        // Btn não -----> Validando botão não
        cy.xpath(el.btnNao)
            .should('be.visible')
            .click()

        cy.wait(750)

        // Btn Download 
        cy.xpath(el.btnDownload)
            .should('be.visible')
            .click()

        cy.wait(750)

        // Btn Sim 
        cy.xpath(el.btnSim)
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath(el.modalDownload)
            .invoke('text')
            .then((text_card) => {
                expect(text_card).to.include('Não foi possível processar seu relatório, entre em contato com o suporte".');

                cy.get('.swal2-confirm').click()
            })
    }

    validarTabelaCreditacoes(){
        cy.get('body').then(() => {

            // Verificando se a tabela possui registros antes de validar o link
            cy.xpath('//*[@id="kt_app_content_container"]//table//tr')
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
                                expect(valor).to.contain('25');
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
        })

        cy.wait(750)
    }

}

export default new Financeiro();