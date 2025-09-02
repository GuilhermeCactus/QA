import Pagamento from '../../../../pages/Backoffice/Financeiro/Pagamento';

describe('Teste Pagamentos ',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);
        })
    })

    const opc_status = ['Aprovado','Negado','Todos'];

    opc_status.forEach((opc) => {
        it(`Testando filtro para status: ${opc}`, () => {

            cy.Navegacao_Pagamentos();

            // Validando URL
            cy.url().should('contain','payments/History')

            cy.wait(1000)

            cy.Selecionando_1_ano_filtro()

            // Clicando no filtro primario
            Pagamento.selecionaStatus(opc_status[2])

            // Filtrando
            Pagamento.clickBtnFiltrar()

            cy.wait(1500)
            
            if (opc === "Todos") {
                Pagamento.clickBtnFiltrar()
            } else {

                // Clicando no operado
                Pagamento.clickOperador()

                cy.xpath('//div[4]/div/div/div[2]/div/div/div[1]/ul/li').each(($operador) => {
                    cy.wrap($operador).click();
                    
                    cy.wait(500);

                    cy.wrap($operador).invoke('text').then((operadorInserido) => {
                        let operadortext = operadorInserido.trim();
                        let dados_tabela = [];
                        let valorInput;

                        if (opc === 'CPF') {
                            valorInput = '091.419.029-63';
                        } else if (opc === 'Status') {
                            valorInput = 'True';
                        } else if(opc === 'Tipo de pix'){
                            
                        }

                        cy.wait(1000);

                        if (opc === 'Tipo de pix'){
                            cy.xpath('//div/div[5]//input')
                                .should('be.visible')
                                .click()

                            cy.xpath('//div/div[5]//input').contains('CPF').click()
                        } else {
                            cy.xpath('//div/div[5]//input')
                                .should('be.visible')
                                .click()
                                .clear()
                                .type(`${valorInput}`);
                        }

                        cy.xpath(`//*[@id="kt_app_content_container"]/div/div[2]/div[2]/div[1]/div/div/button`)
                            .first()
                            .should('be.visible')
                            .click();

                        cy.get('body').then(($body) => {
                            if ($body.find('.dataTables_empty > .border-0').length > 0) {
                                cy.log('A tabela está vazia');
                                cy.get('.dataTables_empty > .border-0')
                                    .should('contain', 'Nenhum dado encontrado');
                            } else {
                                cy.log('A tabela possui dados');

                                cy.xpath('//*[@id="kt_app_content_container"]//div[2]//div[2]//div[1]/table/tr/td/div')
                                    .each(($cell, index) => {
                                        const texto = $cell.text();
                                        dados_tabela.push(texto);
                                        cy.log(`Coluna ${index + 1}: ${texto}`);
                                    })
                                    .then(() => {
                                        if (opc === 'Todos') {
                                            expect(dados_tabela[5]).to.contain('Aprovado');
                                        }
                                    });
                            }
                        });
                    });
                    cy.xpath('//div[4]//div/input[@class="el-input__inner"]')
                        .should('be.visible')
                        .click();
                });
            }
        })  
    })
})