describe('Teste Relatorio Jogadores',() => {
        beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it('Teste sucesso', () => {

        cy.Navegacao_Relatorio_jogadores()
       
        cy.url().should('contain','reports/Players')

        cy.wait(750)

        // Clicando no filtro de data para 1 ano
        cy.get('.el-date-editor')
            .should('be.visible')
            .click()

        // Clicandk no painel na lateral para 1 ano
        cy.get('.el-picker-panel__sidebar > :nth-child(7)')
            .click()

        cy.wait(750)

        // Primeiro filtro
        cy.xpath('//*[@id="kt_app_content_container"]/div//div[2]/div[2]/div/div/div[1]/div')
            .click()

        cy.xpath('//div/div/div[1]/ul/li[1]/span')
            .first()
            .click()

        cy.wait(1000)

        // Segundo filtro
        cy.xpath('//*[@id="kt_app_content_container"]/div//div[2]/div[3]/div/div/div[1]/div')
            .click()

        cy.xpath('//div/div/div[1]/ul/li[1]/span')
            .eq(1)
            .click()

        cy.wait(1000)

        // Terceiro filtro
        cy.xpath('//*[@id="kt_app_content_container"]/div//div[2]/div[4]/div/div/div[1]/div')
            .click()

        cy.xpath('//div/div/div[1]/ul/li[1]/span')
            .eq(2)
            .click()

        cy.wait(1000)

        cy.xpath('//*[@id="kt_app_content_container"]//div[2]/div[5]/button')
            .click()

        cy.wait(750)
    });
})