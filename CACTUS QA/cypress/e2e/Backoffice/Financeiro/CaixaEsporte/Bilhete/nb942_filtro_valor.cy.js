import Bilhete from '../../../../../pages/Backoffice/Financeiro/CaixaEsporte/Bilhete';


describe('Teste filtro coluna (Dashboard)',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then(usuarios => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha)
        })
    })

    // Lista de filtro
    const filtro_campo = ['Código','Nome Jogador','País'];

    filtro_campo.forEach(opc => {
        it(`Filtro especifico : ${opc}`, () => {

            cy.Navegacao_Caixa_Esporte()

            // Esperando div elementos estar disponivel
            Bilhete.clickBtnBilhetes()
    
            // Clicando no filtro de data para 1 ano
            cy.Selecionando_1_ano_filtro()
    
            // Clickando no filtro opcional
            Bilhete.clickBtnBilhetes();

            // Selecionando opc 
            Bilhete.selecionandoSelect(opc)

            //Validando select
            Bilhete.validarSelect(opc)

            // Selecionando valores (Codigo,Nome e Pais)
            Bilhete.selecionandoInput(opc);
            
            // Click btn filtro
            Bilhete.clickBtnFiltrar();
        });
    })


})