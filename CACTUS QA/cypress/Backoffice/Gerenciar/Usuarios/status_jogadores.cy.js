import usuarios from '../../../../pages/Backoffice/Gerenciar/Configuracao/Banner';

describe('Teste Usuarios', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validando filtrar por :', () => {
        cy.Navegacao_Usuarios();

        cy.wait(400);

        cy.xpath('//*[@id="users"]/div[2]/a/span[text() = "Jogadores"]')
            .should('be.visible')
            .click()

        cy.wait(500)

        // Selecionar filtro por
        cy.get('.el-select__wrapper')
        .should('be.visible')
        .click();

        cy.wait(500);

        cy.xpath('//*[@id="kt_app_body"]//div[@class="el-popper is-pure is-light el-tooltip el-select__popper"]//ul/li')
        .each(($opc) => {
            cy.wrap($opc)
            .invoke('text')
            .then((texto) => {

                if (texto.trim() === 'Status') {
                    cy.wrap($opc).click();

                    // -> Filtro Status
                    cy.get('.d-flex > .el-select > .el-select__wrapper')
                        .should('be.visible')
                        .click()

                    cy.wait(500)

                    cy.xpath('//div/div/div[2]/div/div/div[1]/ul/li')
                    .each(($subfiltro) => {
                        cy.wrap($subfiltro)
                        .should('be.visible')
                        .click()
                        .invoke('text')
                        .then((texto) => {

                            cy.wait(500)

                            // Click no filtro
                            cy.get('.position-relative > .btn')
                                .click()

                            cy.wait(1500)

                            // Verifica se a tabela está vazia ou não
                            cy.get('table tbody').then(($tbody) => {

                            cy.wait(500)
                            
                            if ($tbody.find('.dataTables_empty > .border-0').length > 0) {
                                // Caso tabela vazia
                                cy.get('.dataTables_empty > .border-0')
                                .should('be.visible')
                                .and('contain.text', 'Nenhum registro encontrado'); // ou o texto que aparece na sua tabela
                            } else {
                                // Caso tabela com dados
                                cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr[1]/td[5]/div/span')
                                .invoke('text')
                                .then((validador) => {
                                    expect(validador).to.equal(texto);
                                });
                            }
                            });

                                cy.wait(500)

                                // -> Filtro Status
                                cy.get('.d-flex > .el-select > .el-select__wrapper')
                                    .should('be.visible')
                                    .click()

                        })
                    })

                }
            });
        });


    });

});
