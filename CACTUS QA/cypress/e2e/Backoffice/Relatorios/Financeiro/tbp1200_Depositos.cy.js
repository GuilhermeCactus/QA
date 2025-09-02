describe('TEST 01- Financeiro - Deposito',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const status = ['Todos','Aprovado','Pendente']

    status.forEach((opc) => {

        it(`Validar - Depositos -> Status ${opc}`, () => {

            cy.Navegacao_Financeiro();

            cy.wait(750);

            cy.xpath('//*[@id="reports"]/div[1]/a/span[2]')
                .click()

            cy.url().should('contain', 'reports/financial/Deposits');

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
            

            // Segundo select
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]/div/div/div[1]/div/div')
                .should('be.visible')
                .click()

            cy.wait(750);

            // Iterando sobre os itens do dropdown
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]//div[1]/ul/li')
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
                            cy.xpath('//*[@id="kt_app_content_container"]/div[1]/div[1]//div[4]/button[1]')
                                .click()
                        } else {
                            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[4]/div/div/div[1]/div')
                                .click()

                            cy.wait(750)

                            cy.xpath('//div[@class="el-scrollbar"]//ul[@class="el-scrollbar__view el-select-dropdown__list"]/li/span[text() = "igual"]')
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
                            cy.get('.d-flex > .el-input > .el-input__wrapper')
                                .clear()
                                .type(`${pesquisa}`)

                            cy.wait(750)

                            // Btn filtrar
                            cy.get(':nth-child(6) > .btn')
                                .click()
                        }

                        cy.wait(750);
                
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

                        // Segundo select
                        cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]/div/div/div[1]/div/div')
                            .should('be.visible')
                            .click()

                        cy.wait(750);

                    });
                });
            });
        });
    })
});

describe('TEST 02- Financeiro - Saque',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const status = ['Todos','Aprovado','Pendente']

    status.forEach((opc) => {

        it(`Validar - Depositos -> Status ${opc}`, () => {

            cy.Navegacao_Financeiro();

            cy.wait(750);

            cy.xpath('//*[@id="reports"]/div[2]/a/span[2]')
                .click()

            cy.url().should('contain', 'reports/financial/Withdraws');

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
            

            // Segundo select
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]/div/div/div[1]/div/div')
                .should('be.visible')
                .click()

            cy.wait(750);

            // Iterando sobre os itens do dropdown
            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]//div[1]/ul/li')
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
                            cy.xpath('//*[@id="kt_app_content_container"]/div[1]/div[1]//div[4]/button[1]')
                                .click()
                        } else {
                            cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[4]/div/div/div[1]/div')
                                .click()

                            cy.wait(750)

                            cy.xpath('//div[@class="el-scrollbar"]//ul[@class="el-scrollbar__view el-select-dropdown__list"]/li/span[text() = "igual"]')
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
                            cy.get('.d-flex > .el-input > .el-input__wrapper')
                                .clear()
                                .type(`${pesquisa}`)

                            cy.wait(750)

                            // Btn filtrar
                            cy.get(':nth-child(6) > .btn')
                                .click()
                        }

                        cy.wait(750);
                
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

                        // Segundo select
                        cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[3]/div/div/div[1]/div/div')
                            .should('be.visible')
                            .click()

                        cy.wait(750);

                    });
                });
            });
        });
    })
});