import Financeiro from "../../../../support/PageObject/Relatorios/Financeiro";

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

            Financeiro.navRelatorioCreditacoes()

            Financeiro.validarURLCreditacoes()

            // Selecionando 1 Ano
            Financeiro.selecionar1Ano()

            // Selects
            Financeiro.selecionaStatus(opc)

            // Btn filtrar
            Financeiro.clickBtnFiltrarCreditacao()

            // Verificando se o elemento existe antes de continuar
            Financeiro.validarTabelaCreditacoes()
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

            Financeiro.navRelatorioCreditacoes()

            Financeiro.validarURLCreditacoes()

            // Selecionando 1 Ano
            Financeiro.selecionar1Ano()

            // Selects
            Financeiro.selecionaStatus(opc)

            // Btn filtrar
            Financeiro.clickBtnFiltrarCreditacao()

            // Verificando se o elemento existe antes de continuar
            Financeiro.validarTabelaCreditacoes()

            // Botão limpar
            Financeiro.clickBtnLimpa()

            // Validando que limpo 
            Financeiro.validarFuncaoLimpar()

            // Validar Função Download
            Financeiro.validarFuncaoDownload()

        });
    })
});
