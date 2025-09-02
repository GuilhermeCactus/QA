import SaqueHistorico from '../../../../../pages/Backoffice/Financeiro/Saque/Historico';

describe('Teste Saque > Historico', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const opcoes_filtro = ['Todos', 'Id do Jogador', 'Valor', 'Nome do jogador'];

    opcoes_filtro.forEach((opc) => {
        it(`Testando filtro para: ${opc}`, () => {

            cy.Navegacao_Saque();

            // Clickando no historico
            SaqueHistorico.clickSecaoHistorico()

            // Selecionando todos os status
            SaqueHistorico.selecionaStatus('Todos')

            //Selecionando filtrar por
            SaqueHistorico.selecionaFiltrarPor(opc)

            if (opc === "Todos") {
                cy.xpath(`//div[1]/div[4]//button[@type="button"]`).click();
            } else {
            
                // Click no operador e selecionando 'igual'
                SaqueHistorico.clickOperadorAux()

                cy.xpath('//div[4]/div/div/div[2]/div/div/div[1]/ul/li').each(($operador) => {
                    cy.wrap($operador).click();
                    cy.wait(500);

                    cy.wrap($operador).invoke('text').then((operadorInserido) => {
                        let operadortext = operadorInserido.trim();
                        let valorInput;

                        if (opc === 'Id do Jogador') {
                            valorInput = 4;
                        } else if (opc === 'Nome do jogador') {
                            valorInput = 'Apostador da Silva';
                        } else {
                            valorInput = 1;
                        }

                        cy.wait(500);

                        cy.xpath('//div/div[5]//input')
                            .should('be.visible')
                            .click()
                            .clear()
                            .type(`${valorInput}`);

                        cy.xpath(`//div[1]/div[6]//button[@type="button"]`)
                            .first()
                            .should('be.visible')
                            .click();

                        cy.wait(1500)                        

                        cy.get('body').then(($body) => {
                            if ($body.find('.dataTables_empty > .border-0').length > 0) {
                                cy.log('A tabela está vazia');
                                cy.get('.dataTables_empty > .border-0').then(($el) => {
                                    const texto = $el.text().trim();
                                    expect(
                                        texto === 'Nenhum dado encontrado.' ||
                                        texto === "Por favor, clique em 'Filtrar' para carregar os dados."
                                    ).to.be.true;
                                });
                            } else {
                                cy.log('A tabela possui dados');
                                const dados_tabela = [];

                                cy.xpath('//*[@id="kt_app_content_container"]/div/div[2]/div/div[1]/table/tbody/tr[1]/td/div')
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
                    cy.xpath('//*[@id="kt_app_content_container"]//div/div[1]//div[4]/div/div/div[1]')
                        .should('be.visible')
                        .click();
                });
            }
        });
    });
});
