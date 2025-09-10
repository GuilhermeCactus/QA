import Analise from "../../../../support/PageObject/Jogadores/Analise";

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

        Analise.validandoURL()

        cy.Selecionando_1_ano_filtro(0)

        Analise.inserindoID()

        Analise.validandoRetornoID()
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

            Analise.validandoURL()

            cy.Selecionando_1_ano_filtro(0)

            // Input
            Analise.inserindoID()
            
            Analise.validandoRetornoID()

            cy.xpath(`//*[@id="kt_app_content_container"]//div[3]/div/div[1]/ul//a[text() = "${$opc}"]`)
                .should('be.visible')
                .click()

            cy.wait(750)
        });
    })
});