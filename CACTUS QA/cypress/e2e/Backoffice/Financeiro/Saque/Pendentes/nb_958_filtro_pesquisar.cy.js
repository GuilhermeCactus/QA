import SaquePendentes from '../../../../../pages/Backoffice/Financeiro/Saque/Pendentes';

describe('Teste Saques',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);

        })
    })

    const opc_pesquisar = ['ID','Nome'];

    opc_pesquisar.forEach((opc) => {

        it(`Filtro de "Pesquisar Por." : ${opc}`, () => {

            cy.Navegacao_Saque();

            //Navegar até pendentes
            SaquePendentes.navegandoPendentes()

            // Filtro pesquisa por 
            SaquePendentes.selecionaFiltrarPor(opc)

            //Validando Select
            SaquePendentes.validandoSelect(opc)

            // Input 
            cy.xpath('//div[@class="el-input el-input--large"]//input')
                .type('Test')

            cy.wait(500)

            // Botão filtrar
            SaquePendentes.clickBtnFiltrar()
        })
    })
})