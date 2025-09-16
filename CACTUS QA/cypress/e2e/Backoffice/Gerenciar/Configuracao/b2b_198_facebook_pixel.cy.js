import Facebook from '../../../../support/PageObject/Gerenciar/Configuracao/Facebook';

describe('Teste Configuração > Facebook Pixel', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it('[Caso - 01] -> Validar navegação para pagina',() => {

        cy.Navegacao_Configuracao();
        
        Facebook.navFacebookLink()

        Facebook.validandoURL()

        Facebook.validandoColunasTabela()

    })

    it.only('[Caso - 02] -> Validar Criação',() => {

        cy.Navegacao_Configuracao();
        
        Facebook.navFacebookLink()

        Facebook.validandoURL()

        Facebook.validandoColunasTabela()

        Facebook.validandoBtnAdicionar()

        Facebook.validandoCadastro()

        Facebook.inserindoDadosCadastro()
    })
})