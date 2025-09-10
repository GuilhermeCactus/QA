import Perfil from "../../../../support/PageObject/Jogadores/Perfil";

describe('TEST 01 - Jogadores - Perfil', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
      });
    });

    it('Validar - Whatsapp', () => {
      cy.Navegacao_Jogadores_Perfil();

      Perfil.validarURL()

      Perfil.selecionandoPesquisaPor('ID')

      Perfil.inserindoInput('ID')

      Perfil.validandoFuncWhatsApp()

    });
});


describe('TEST 02 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Analise', () => {
        cy.Navegacao_Jogadores_Perfil();

        Perfil.validarURL()

        Perfil.selecionandoPesquisaPor('ID')

        Perfil.inserindoInput('ID')

        Perfil.validarBtnAnalise()

    });
});

describe('TEST 03 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Editar usuario', () => {
        cy.Navegacao_Jogadores_Perfil();

        Perfil.validarURL()

        Perfil.selecionandoPesquisaPor('ID')

        Perfil.inserindoInput('ID')

        Perfil.validarBtnEditar()

        Perfil.editarDadosUsuarios()

        // Btn 'Editar'
        Perfil.clickBtnEdicao()

        Perfil.modalConfirmacao()

        // ----------------------------------------------------------------------
        cy.wait(4000)

        // Elemento 'Editar usuario'
        Perfil.validarBtnEditar()

        cy.wait(1000)

        Perfil.validarDadosEditado()

        // Btn 'Editar'
        Perfil.clickBtnEdicao()

        Perfil.modalConfirmacao()
    });
});

describe('TEST 04 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    // Erro
    Cypress.on('uncaught:exception', (err) => {
        if (err.message === 'undefined' || err.message.includes('An unknown error has occurred')) {Cl
            return false; // ignora esse erro específico
        }
    });

    it('Validar - Observações usuario', () => {
      cy.Navegacao_Jogadores_Perfil();

      Perfil.validarURL()

      Perfil.selecionandoPesquisaPor('ID')

      Perfil.inserindoInput('ID')

      Perfil.validarBtnObservacao()

      Perfil.editarObservacao()
      
      // -------------- Validando dados inseridos

      cy.get('[title="Observação do usuário"]')
          .should('be.visible')
          .click()

      cy.wait(750)

      Perfil.validandoObservacaoInserida()

    });
});

describe('TEST 05 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Bloquear', () => {
      cy.Navegacao_Jogadores_Perfil();

      Perfil.validarURL()

      Perfil.selecionandoPesquisaPor('ID')

      Perfil.inserindoInput('ID')

      Perfil.validarFuncBloqueio()

      // --------------- Validação
      Perfil.validarBloqueado()

    });
});

describe('TEST 06 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Bloquear Saque', () => {
      cy.Navegacao_Jogadores_Perfil();

      Perfil.validarURL()

      Perfil.selecionandoPesquisaPor('ID')

      Perfil.inserindoInput('ID')
 
      Perfil.validarFuncBloquearSaque()

      // -------------- Validacao
      Perfil.validarBloqueadoSaque()
    });
});


describe('TEST 07 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Auto exclusão', () => {
      cy.Navegacao_Jogadores_Perfil();

      Perfil.validarURL()

      Perfil.selecionandoPesquisaPor('ID')

      Perfil.inserindoInput('ID')

      cy.wait(750);

      // ------ Auto exclusao
      Perfil.validarFuncAutoExclusao()
      
      Perfil.validarAutoExclusao()

      Perfil.validarRetirarAutoExclusao()
    });
});