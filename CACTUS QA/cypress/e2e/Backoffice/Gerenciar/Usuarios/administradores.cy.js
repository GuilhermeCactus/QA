import Usuarios from '../../../../support/PageObject/Gerenciar/Usuarios';

describe('Teste Usuários - Filtros de ID e Status', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const filtros = ['ID','Nome','E-mail'];

    filtros.forEach((filtro) => {
        it(`Validar filtro por: ${filtro}`, () => {

            Usuarios.navegacaoAdministradores();

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
                Usuarios.inserindoInput('28000012');

                Usuarios.clickFiltroBuscar()

                // Validação da tabela
                Usuarios.validarTabelaAdmin('ID', '28000012');
            }

            if (filtro === 'Nome') {
                // Digitar Nome e aplicar filtro
                Usuarios.inserindoInput('QA');
                
                Usuarios.clickFiltroBuscar()  
                
                // Validação da tabela
                Usuarios.validarTabelaAdmin('Nome', 'QA');
            }

            if(filtro === 'E-mail'){
                // Digitar Email e aplicar filtro
                Usuarios.inserindoInput('qaautomacao@gmail.com');
                
                Usuarios.clickFiltroBuscar()

                // Validação da tabela
                Usuarios.validarTabelaAdmin('Email', 'qaautomacao@gmail.com');
            }
        });
    });
});
