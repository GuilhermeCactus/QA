import Usuarios from '../../../../support/PageObject/Gerenciar/Usuarios';

describe('Teste Usuários - Filtros de ID e Status', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const filtros = ['Nome', 'ID', 'E-mail', 'País'];

    filtros.forEach((filtro) => {
        it(`Validar filtro por: ${filtro}`, () => {

            Usuarios.navegacaoJogadores();

            // Selecionar filtro principal
            cy.get('.el-select__wrapper')
                .should('be.visible')
                .click();

            // Escolher opção (ID ou Status)
            cy.xpath('//ul/li/span')
                .contains(filtro)
                .click();

            if (filtro === 'ID') {
                // Digitar ID e aplicar filtro
                Usuarios.inserindoInput('2');

                Usuarios.clickFiltroBuscar()

                // Validação da tabela
                Usuarios.validarTabela('ID', '2');
            }

            if (filtro === 'Status') {
                // Abrir select de status
                cy.get('.d-flex > .el-select > .el-select__wrapper')
                    .should('be.visible')
                    .click();

                // Somente validar "Ativo" por enquanto
                cy.xpath('//ul/li/span')
                    .contains('Ativo')
                    .should('be.visible')
                    .click();

                // Aplicar filtro
                cy.get('.position-relative > .btn')
                    .should('be.visible')
                    .click();

                // Validação da tabela
                Usuarios.validarTabela('Status', 'Ativo');
            }

            if (filtro === 'Nome') {
                // Digitar Nome e aplicar filtro
                Usuarios.inserindoInput('Apostador');

                Usuarios.clickFiltroBuscar()

                // Validação da tabela
                Usuarios.validarTabela('Nome', 'Apostador');
            }

            if (filtro === 'E-mail') {
                // Digitar Email e aplicar filtro
                Usuarios.inserindoInput('player@email.com');

                Usuarios.clickFiltroBuscar()

                // Validação da tabela
                Usuarios.validarTabela('Email', 'player@email.com');
            }

            if (filtro === 'País') {
                // Abrir select de país
                Usuarios.inserindoInput('Brasil');
            }
        });
    });

    it.only('[TEST] 02 - Adicionando usuario'), () => {
        Usuarios.navegacaoJogadores();

            // Selecionar filtro principal
            cy.get('.el-select__wrapper')
                .should('be.visible')
                .click();

    }
});


