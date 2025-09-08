import Perfil from "../../../../support/PageObject/Relatorios/";

describe('TEST 01 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const pesquisar_por = ['ID', 'email', 'CPF'];

    pesquisar_por.forEach(($opc) => {
        it(`Pesquisar por : ${$opc}`, () => {
            cy.Navegacao_Jogadores_Perfil();

            Perfil.validarURL()

            // Select 
            Perfil.selecionandoPesquisaPor($opc)

            Perfil.inserindoInput(opc)

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

        Perfil.validarURL()

        Perfil.selecionandoPesquisaPor('ID')

        Perfil.inserindoInput('4')

        Perfil.validandoIDTable()
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

        Perfil.validarURL()

        Perfil.selecionandoPesquisaPor('ID')

        // -> Selecionando ID 
        Perfil.inserindoInput('4')

        cy.wait(750)

        Perfil.validandoBuscarOutro()
    });
})