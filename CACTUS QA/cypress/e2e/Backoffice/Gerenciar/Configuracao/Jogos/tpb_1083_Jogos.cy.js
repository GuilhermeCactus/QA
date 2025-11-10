import Jogos from '../../../../../support/PageObject/Gerenciar/Configuracao/Jogos';

describe('Teste Configuração > Jogos',() => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios)  => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha)
        })
    })

    it('[Caso - 01] Criar novo jogo',() => {
        // Navegação para configuração > Jogos
        cy.Navegacao_Configuracao();

        // clickando no btn adicionar
        Jogos.clickBtnAdicinar()

        // Selecionando Imagens
        Jogos.validandoSelectImagens()

        // Nome do jogo
        Jogos.inserindoJogo()

        // Nome da referencia
        Jogos.inserindoReferencia()

        // Categoria
        Jogos.inserindoCategoria()
        
        // Provedor
        Jogos.inserindoProvedor()

        // Selecionando Tipo de jogo
        Jogos.inserindoTipoJogo()

        // Selecionando Plataforma
        Jogos.inserindoPlataforma()

        // Descrição
        Jogos.inserindoDescricao()

        Jogos.inserindoTags()

        Jogos.validandoCriacao()

        // Esperando conteudo tabela ------------------------------------Validação
        Jogos.validacaoTabela()
    })

    it('[Caso - 02] Validar pesquisa de jogo criado',() => {
        // Navegação para configuração
        cy.Navegacao_Configuracao();

        // Clicando em jogos 
        cy.xpath('//*[@id="settings"]//span[text() = "Jogos"]').click()

        // Esperando navegação
        cy.url().should('contain','/settings/GamesRegister')

        // Esperando conteudo tabela
        cy.get('td.dataTables_empty').should('not.exist');

        cy.wait(500)

        const nome_jogo = 'QA Teste - Jogo'

        // Nome do jogo
        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[1]/div/div[3]/div/div/div')
            .type(nome_jogo)

        cy.get('#kt_app_content_container')
            .contains('button','Filtrar')
            .click()

        cy.wait(1500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[2]//div[1]/table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).find('td').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);
            }).then(() => {
                dados_tabela.push(linha_dados);
            });
        }).then(() => {
            dados_tabela.forEach((dado_linha) => {

                cy.log(dados_tabela)

                if (dado_linha[3] === nome_jogo) {
                        cy.log(`Processo criado com sucesso! -> ${dado_linha[1]}`);
                    }
            });
            cy.wait(100000000);
        });

    })
})