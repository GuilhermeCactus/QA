import Cupon from '../../../../support/PageObject/Gerenciar/Cupon';

describe('Teste Gerenciar > Cupon', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        Cupon.navegarCupon()

        cy.wait(2000);
    });

    it(`Teste Filtro : Codigo`, () => {

        // Inserindo filtro Codigo
        Cupon.inserindoCodigo('Teste')

        Cupon.clickFiltrar()

        Cupon.validarRetornoCodigo('Teste')

    });

    const opc_tipo = ['Todos','Fixo','Variável'];

    opc_tipo.forEach((opc) => {
        it(`Teste Filtro : Tipo - ${opc}`, () => {

            // Inserindo filtro Codigo
            Cupon.inserindoCodigo('Teste')

            // Inserindo filtro tipo
            Cupon.selectTipo(opc);

            Cupon.clickFiltrar();

            Cupon.validarRetornoTipo(opc)

            Cupon.validarRetornoCodigo('Teste')

        });
    });

    it(`Teste Filtro : Campanha - Cupon`, () => {

        Cupon.navegarCupon();

        // Inserindo filtro Codigo
        Cupon.inserindoCodigo('Teste')

        // Inserindo filtro tipo
        Cupon.selectTipo('Todos');

        Cupon.selectCampanha()

        Cupon.clickFiltrar();

        Cupon.validarRetornoCodigo('Teste')

        Cupon.validarRetornoTipo('Todos')

        Cupon.validarRetornoCampanha('Cupons')

    });

    
    const opc_carteira = ['Todos','Real','Bônus'];

    opc_carteira.forEach((opc) => {
        it(`Teste Filtro : Carteira - ${opc}`, () => {

            // Inserindo filtro Codigo
            Cupon.inserindoCodigo('Teste')

            // Inserindo filtro tipo
            Cupon.selectTipo('Todos');

            Cupon.selectCampanha()

            Cupon.selectCarteira(opc)

            Cupon.clickFiltrar();

            Cupon.validarRetornoCodigo('Teste')

            Cupon.validarRetornoTipo('Todos')

            Cupon.validarRetornoCarteira(opc)

        });
    })

    const opc_filtro = ['Todos','Valor Mínimo','Valor','Limite Uso','Estoque','Criado por'];

    opc_filtro.forEach((opc) => {
        it.only(`Teste Filtro : Filtra por -> ${opc}`, () => {

            // Inserindo filtro Codigo
            Cupon.inserindoCodigo('Teste')

            // Inserindo filtro tipo
            Cupon.selectTipo('Todos');

            Cupon.selectCampanha()

            Cupon.selectCarteira('Todos')

            Cupon.selectFiltro(opc)

            Cupon.selectOperadorIgualdade()

            Cupon.clickFiltrar();

            Cupon.validarRetornoCodigo('Teste')

            Cupon.validarRetornoTipo('Todos')

            Cupon.validarRetornoCarteira('Todos')
        });
    })
});