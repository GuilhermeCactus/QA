describe('TEST 01- Financeiro - Creditação',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const status = ['Todos','Entrada de crédito','Saída de crédito','Bônus update']

    status.forEach((opc) => {

        it(`Validar - Creditação -> Status ${opc}`, () => {

            cy.Navegacao_Financeiro();

            cy.wait(750);

            cy.xpath('//*[@id="reports"]/div[3]/a/span[2]')
                .click()

            cy.url().should('contain', 'reports/financial/Credits');

            cy.wait(750);

            // Selecionando 1 Ano
            cy.get('.el-date-editor')
                .should('be.visible')
                .click()

            cy.wait(500)

            cy.contains('1 ano').click()

            cy.wait(500)

            // Selects
            cy.get('.el-select > .select-trigger > .el-input')
                .eq(0)
                .click()

            cy.wait(750)

            // Selecionando o status
            cy.contains('.el-select-dropdown__item', opc)
                .should('be.visible')
                .click();

            cy.wait(750)

            // Btn filtrar
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]/button')
                .click()

            cy.wait(750)

            // Verificando se o elemento existe antes de continuar
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
            })
        });
    })
});


describe('TEST 02- Financeiro - Creditação',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const status = ['Entrada de crédito']

    status.forEach((opc) => {

        it(`Validar - Creditação -> Btn limpar`, () => {

            cy.Navegacao_Financeiro();

            cy.wait(750);

            cy.xpath('//*[@id="reports"]/div[3]/a/span[2]')
                .click()

            cy.url().should('contain', 'reports/financial/Credits');

            cy.wait(750);

            // Selecionando 1 Ano
            cy.get('.el-date-editor')
                .should('be.visible')
                .click()

            cy.wait(500)

            cy.contains('1 ano').click()

            cy.wait(500)

            // Selects
            cy.get('.el-select > .select-trigger > .el-input')
                .eq(0)
                .click()

            cy.wait(750)

            // Selecionando o status
            cy.contains('.el-select-dropdown__item', opc)
                .should('be.visible')
                .click();

            cy.wait(750)

            // Btn filtrar
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]/button')
                .click()

            cy.wait(750)

            // Verificando se o elemento existe antes de continuar
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
            })

            cy.wait(750)

            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[4]/button')
                .click()

            cy.wait(1000)

            // Validando que limpo 
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[4]/button')
                .should('not.exist')

            cy.wait(750)

            // Btn Download 
            cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div/button')
                .should('be.visible')
                .click()

            cy.wait(750)

            // Btn não
            cy.xpath('//*[@id="kt_app_body"]/div[4]/div/div[6]/button[1]')
                .click()

            cy.wait(750)

            // Btn Download 
            cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div/button')
                .should('be.visible')
                .click()

            cy.wait(750)

            // Btn Sim 
            cy.xpath('//*[@id="kt_app_body"]/div[4]/div/div[6]/button[3]')
                .click()

            cy.wait(750)

            cy.xpath('//*[@id="swal2-html-container"]')
                .invoke('text')
                .then((text_card) => {
                    expect(text_card).to.include('Não foi possível processar seu relatório, entre em contato com o suporte".');

                    cy.get('.swal2-confirm').click()
                })
        });
    })
});
