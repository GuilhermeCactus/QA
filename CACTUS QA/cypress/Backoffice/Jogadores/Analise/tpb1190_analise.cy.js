describe('TEST 01- Jogadores - Analise',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it(`Validar - Apostas > Analise`, () => {
        cy.Navegacao_Jogadores_Analise();

        cy.url().should('contain', '/polling/Player');

        cy.wait(750);

        cy.Selecionando_1_ano_filtro(0)

        // Input
        cy.xpath('//*[@id="kt_app_content_container"]/div[1]/div[1]//div[3]//input[@placeholder="Digite o valor"]')
            .should('be.visible')
            .type('4');

        cy.wait(750);

        cy.xpath('//*[@id="kt_app_content_container"]/div[1]/div[1]//div[4]/button[1]')
            .click()


        cy.wait(750)

        cy.get('[name="user_id"]')
        .invoke('val')
        .then((valor) => {
            expect(valor).to.contains(4);
        });
    });
});

describe('TEST 02- Jogadores - Analise',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios. usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const opc = ['Somas','Bilhetes','Cassino','Depósitos','Saques','Bônus Referido','Transações','Clube Vip'];

    opc.forEach(($opc,index) => {
        it(`Validar - Apostas > Analise > ${$opc}`, () => {
            cy.Navegacao_Jogadores_Analise();

            cy.url().should('contain', '/polling/Player');

            cy.wait(750);

            cy.Selecionando_1_ano_filtro(0)

            // Input
            cy.xpath('//*[@id="kt_app_content_container"]/div[1]/div[1]//div[3]//input[@placeholder="Digite o valor"]')
                .should('be.visible')
                .type('4');

            cy.wait(750);

            cy.xpath('//*[@id="kt_app_content_container"]/div[1]/div[1]//div[4]/button[1]')
                .click()


            cy.wait(750)

            cy.get('[name="user_id"]')
                .invoke('val')
                .then((valor) => {
                    expect(valor).to.contains(4);
                });

            cy.wait(750)

            cy.xpath(`//*[@id="kt_app_content_container"]//div[3]/div/div[1]/ul//a[text() = "${$opc}"]`)
                .should('be.visible')
                .click()

            cy.wait(750)
        });
    })
});