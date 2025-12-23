import Perfil from "../../../../support/PageObject/Jogadores/Perfil";

describe('Teste relatorio > Jogadores', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
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

        // Validacao de URL
        Perfil.validarURL()

        // Filtro 
        Perfil.inputBuscaID()

        // Buscar
        Perfil.clickBtnBuscar()

        // Validando funcao observacao funciona -> Click + Modal
        Perfil.validarObservacaoUsuario()

        // Inserindo informacao na observacao
        Perfil.inserindoObservacao()

        // Btn confirmar
        Perfil.clickBtnConfirmar()

        Perfil.confirmandoClick()

        Perfil.validandoModalSucesso()

        Perfil.validandoObservacaoInserida()

    });
})