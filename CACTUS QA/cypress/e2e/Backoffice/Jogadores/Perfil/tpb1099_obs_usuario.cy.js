describe('Teste relatorio > Jogadores', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    // Erro
    Cypress.on('uncaught:exception', (err) => {
        if (err.message === 'undefined' || err.message.includes('An unknown error has occurred')) {
            return false; // ignora esse erro específico
        }
    });

    it('Fluxo certo', () => {
        cy.Navegacao_Jogadores_Perfil();

        cy.url().should('contain','profile/Player')

        cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
            .should('be.visible')
            .type('4')

        cy.wait(750)

        cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.get('[title="Observação do usuário"]')
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath('//div[@class="modal-content"]/div[@class="modal-header flex"]')
            .should('be.visible')

        cy.wait(750)

        cy.xpath('//div/div/div[2]/form/div/textarea')
            .clear()
            .type("[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.")

        cy.wait(750)

        cy.get('.modal-content > .modal-footer > .btn-primary')
            .click()

        cy.wait(1000)

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath('//*[@id="swal2-html-container"]')
        .invoke('text')
        .then((text_card) => {
            expect(text_card).to.include('Observações do usuário salvas com sucesso!');
        })

        cy.wait(1000)

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click()

        cy.wait(1000) 

        cy.get('[title="Observação do usuário"]')
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath('//div[@class="modal-content"]/div[@class="modal-header flex"]')
            .should('be.visible')

        cy.wait(750)

        cy.get('textarea[name="operator_observation"]')
            .invoke('val')
            .then((text) => {
                cy.log('Texto do textarea:', text);

                // Você pode fazer asserções aqui, por exemplo:
                expect(text).to.equal('[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.');
            });

    });
})