import Financeiro from "../../../../support/PageObject/Relatorios/Financeiro";

describe('TEST 01- Financeiro - Deposito',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const status = ['Todos','Aprovado','Pendente']

    status.forEach((opc) => {

        it(`Validar - Depositos -> Status ${opc}`, () => {

            cy.Navegacao_Financeiro();

            cy.wait(750);

            // Nav relatorio depositos
            Financeiro.navRelatorioDeposito()

            // Validando URL
            Financeiro.validarURLDeposito()

            // Selecionando 1 Ano
            Financeiro.selecionar1Ano()

            // Selects
            Financeiro.selecionaStatus(opc)

            // Segundo Select -> Valida a tabela
            Financeiro.selecionaFiltro(opc)

        });
    });
});

describe('TEST 02- Financeiro - Saque',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const status = ['Todos','Aprovado','Pendente']

    status.forEach((opc) => {

        it(`Validar - Saque -> Status ${opc}`, () => {

            cy.Navegacao_Financeiro();

            cy.wait(750);

            Financeiro.navRelatorioSaque()

            Financeiro.validarURLSaque()

            // Selecionando 1 Ano
            Financeiro.selecionar1Ano()

            // Selects status
            Financeiro.selecionaStatus(opc)

            // Segundo Select -> Valida a tabela 
            Financeiro.selecionaFiltro(opc)

        });
    })
});