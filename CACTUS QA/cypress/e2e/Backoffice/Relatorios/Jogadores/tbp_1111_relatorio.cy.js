import Analise from "../../../../support/PageObject/Relatorios/Jogadores";

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

        Analise.validandoURL()

        Analise.seleciona1Ano()

        Analise.selecionaPrimeiroFiltro()

        Analise.selecionaSegundoFiltro()

        Analise.selecionaTerceiroFiltro()

        // Clicando no botao de aplicar filtros
        Analise.aplicarFiltros()
    });
})