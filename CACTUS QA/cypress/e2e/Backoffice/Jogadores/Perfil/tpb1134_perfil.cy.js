describe('TEST 01 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const pesquisar_por = ['ID', 'mail', 'CPF'];

    pesquisar_por.forEach(($opc) => {
        it(`Pesquisar por : ${$opc}`, () => {
            cy.Navegacao_Jogadores_Perfil();
            cy.url().should('contain', 'profile/Player');

            // Abrir o dropdown
            cy.get('.select-trigger > .el-input > .el-input__wrapper')
                .should('be.visible')
                .click();

            cy.wait(500);

            // Garantir que a lista apareceu e clicar na opção correta dentro do dropdown
            cy.xpath('//div[contains(@class, "el-select-dropdown__wrap")]//ul/li/span')
                .contains($opc)
                .should('be.visible')
                .click();

            cy.wait(500);

            let $var 

            if ($opc == 'ID'){
                $var = 4
            } else if ($opc == 'mail') {
                $var = 'player@email.com'
            } else {
                $var = '035.285.570-36'
            }

            cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
                .should('be.visible')
                .type(`${$var}`)

            cy.wait(500);

            cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
                .should('be.visible')
                .click()

            cy.wait(500);

        });
    });
})

describe('TEST 02 - Jogadores - Perfil',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Valor', () => {

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

        cy.get('.card-body > .d-flex > .fs-5')
            .should('be.visible')
            .should('contain.text', '4')
    });
})

describe('TEST 03 - Jogadores - Perfil',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Botão Buscar outro', () => {
        
        cy.Navegacao_Jogadores_Perfil();

        cy.url().should('contain','profile/Player')

        // -> Selecionando ID 
        cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
            .should('be.visible')
            .type('4')

        cy.wait(750)

        cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.contains('Buscar outro')
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
            .should('be.visible')
    });
})