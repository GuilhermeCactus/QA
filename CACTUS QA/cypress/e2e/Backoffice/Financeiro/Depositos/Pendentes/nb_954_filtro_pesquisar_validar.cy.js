import Pendentes from '../../../../../pages/Backoffice/Financeiro/Depositos/Pendentes';

describe('Teste Depositos pendentes',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);

        })
    })

    const opc_pesquisar = ['ID','Nome','E-mail'];

    opc_pesquisar.forEach((opc) => {

        it(`Filtro de "Pesquisar Por." : ${opc}`, () => {

            cy.Navegacao_Deposito();

            //Navegação Pendentes
            Pendentes.navegacaoPendentes()

            // Filtro pesquisa por 
            Pendentes.selecionaPesquisaPor(opc)

            //Validar Btn > validar filtro
            Pendentes.validarSelect(opc)

            // filtrar
            Pendentes.clickBtnFiltrar()

            // Verificando se o elemento existe
            //Pendentes.validandoTabela(opc)
        });
    })
})