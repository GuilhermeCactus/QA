describe('Teste Configuração > Jogos',() => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios)  => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha)
        })
    })

    it('Criando jogos',() => {
        // Navegação para configuração
        cy.Navegacao_Configuracao();

        // Clicando em jogos 
        cy.xpath('//*[@id="settings"]//span[text() = "Jogos"]').click()

        // Esperando navegação
        cy.url().should('contain','/settings/GamesRegister')

        // Esperando conteudo tabela
        cy.get('td.dataTables_empty').should('not.exist');

        // clickando no btn adicionar
        cy.get('#kt_app_content_container')
            .contains('button','Adicionar')
            .click()

        // Esperando modal
        cy.get('.modal-content')
            .should('be.visible')

        cy.wait(500)

        // Selecionando img
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[1]/div[2]//div[1]/input')
            .attachFile('Teste-img.jpg');

        cy.wait(500)

        // Nome do jogo
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[2]/div/div[1]/div/input')
            .type('QA Teste - Jogo')

        cy.wait(500)

        // Nome da referencia
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[3]/div/div[1]/div/input')
            .type('QaTeste')
        
        cy.wait(500)

        // Categoria
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[4]//div[1]/div[1]/input')
            .click()

        // Selecionando todos
        cy.xpath('//div[4]//div[2]//div[1]/ul/li[1]')
            .should('be.visible')
            .click()

        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[4]//div[1]/div[1]/input')
            .click()

        cy.wait(500)
        
        // Provedor 
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[5]/div[1]/div/div')
            .click()

        // Selecionando o primeiro
        cy.xpath('//div[5]//div[2]//div[1]/ul/li[2]')
            .should('be.visible')
            .click()
        
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[5]/div[1]/div/div')
            .click()

        cy.wait(500)

        // Selecionando Tipo de jogo
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[6]/div[1]/div/div')
            .click()

        // Selecionando roleta
        cy.xpath('//div[6]//div[2]//div[1]/ul/li[2]')
            .should('be.visible')
            .click()

        cy.wait(500)

        // Selecionando Plataforma
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[7]/div[1]/div/div')
            .click()

        // Selecionando desktop
        cy.xpath('//div[7]//div[2]//div[1]/ul/li[3]')
            .should('be.visible')
            .click()

        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[7]/div[1]/div/div')
            .click()

        cy.wait(500)

        // Descrição
        cy.get('#description')
            .type('(QA Automação) - Descrição teste')
    
        cy.wait(500)

        // Tags 
        cy.get('#tags')
            .type('QA')

        cy.wait(500)

        // Clickando no Btn -> Adicionar
        cy.get('#kt_account_profile_details_submit')
            .click()

        cy.wait(500)

        cy.get('.swal2-popup').should('be.visible');

        cy.xpath('//*[@id="swal2-html-container"]')
            .invoke('text')
            .then((text_card) => {
                expect(text_card).to.include('Tem certeza que deseja enviar?');

                cy.get('.swal2-confirm').click()
            })

        cy.wait(5000)

        // Esperando conteudo tabela ------------------------------------Validação
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

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[2]//div[1]/table/tr').each(($linha) => {
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
        });
    })

    it('Criando jogos',() => {
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